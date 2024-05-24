import keccak256 from "keccak256"; // Tested and this lib is compatible with merkle tree libs from Rust and Go
import { MerkleTree } from "merkletreejs";
import { useCallback } from "react";
import { useSelector } from "react-redux";

import { Metadata } from "@/api/launchpad/v1/launchpad";
import { useFeedbacks } from "@/context/FeedbacksProvider";
import {
  Collection,
  MintPeriod,
  NftLaunchpadClient,
  WhitelistInfo,
} from "@/contracts-clients/nft-launchpad";
import { PinataFileProps, useIpfs } from "@/hooks/useIpfs";
import { useSelectedNetworkId } from "@/hooks/useSelectedNetwork";
import useSelectedWallet from "@/hooks/useSelectedWallet";
import { getNetworkFeature, NetworkFeature } from "@/networks";
import { getKeplrSigningCosmWasmClient } from "@/networks/signer";
import { selectNFTStorageAPI } from "@/store/slices/settings";
import { mustGetLaunchpadClient } from "@/utils/backend";
import { generateIpfsKey } from "@/utils/ipfs";
import { LocalFileData } from "@/utils/types/files";
import {
  CollectionFormValues,
  CollectionMintPeriodFormValues,
} from "@/utils/types/launchpad";

export const useCreateCollection = () => {
  // Since the Collection network is the selected network, we use useSelectedNetworkId (See LaunchpadBasic.tsx)
  const selectedNetworkId = useSelectedNetworkId();
  const selectedWallet = useSelectedWallet();
  const { setToast } = useFeedbacks();
  const userIPFSKey = useSelector(selectNFTStorageAPI);
  const { pinataPinFileToIPFS, uploadFilesToPinata } = useIpfs();

  const createCollection = useCallback(
    async (collectionFormValues: CollectionFormValues) => {
      if (!selectedWallet) return;
      const userId = selectedWallet.userId;
      const walletAddress = selectedWallet.address;
      const networkId = selectedWallet.networkId;

      const signingComswasmClient =
        await getKeplrSigningCosmWasmClient(selectedNetworkId);
      const cosmwasmLaunchpadFeature = getNetworkFeature(
        selectedNetworkId,
        NetworkFeature.NFTLaunchpad,
      );
      if (!cosmwasmLaunchpadFeature) return;
      // const defaultMintDenom = cosmwasmLaunchpadFeature.defaultMintDenom;

      const launchpadBackendClient = mustGetLaunchpadClient(networkId);

      const nftLaunchpadContractClient = new NftLaunchpadClient(
        signingComswasmClient,
        walletAddress,
        cosmwasmLaunchpadFeature.launchpadContractAddress,
      );
      const pinataJWTKey =
        userIPFSKey || (await generateIpfsKey(selectedNetworkId, userId));
      if (!pinataJWTKey) {
        console.error("upload file err : No Pinata JWT");
        setToast({
          mode: "normal",
          type: "error",
          title: "Files upload failed",
        });
        return;
      }

      try {
        // ========== Cover image
        const coverImageIpfsHash = await pinataPinFileToIPFS({
          pinataJWTKey,
          file: collectionFormValues.coverImage,
        } as PinataFileProps);

        // ========== Whitelists
        const whitelistAddressesFilesToUpload: LocalFileData[] = [];
        collectionFormValues.mintPeriods.forEach((mintPeriod) => {
          if (mintPeriod.whitelistAddressesFile)
            whitelistAddressesFilesToUpload.push(
              mintPeriod.whitelistAddressesFile,
            );
        });
        const remoteWhitelistAddressesFiles = await uploadFilesToPinata({
          pinataJWTKey,
          files: whitelistAddressesFilesToUpload,
        });
        const mint_periods: MintPeriod[] = collectionFormValues.mintPeriods.map(
          (mintPeriod: CollectionMintPeriodFormValues, index) => {
            let whitelist_info: WhitelistInfo | null = null;
            if (
              mintPeriod.whitelistAddresses?.length &&
              remoteWhitelistAddressesFiles[index].url
            ) {
              const addresses: string[] = mintPeriod.whitelistAddresses;
              const leaves = addresses.map(keccak256);
              const tree = new MerkleTree(leaves, keccak256);
              const merkleRoot = tree.getRoot().toString("hex");
              whitelist_info = {
                addresses_count: addresses.length,
                addresses_ipfs: remoteWhitelistAddressesFiles[index].url,
                addresses_merkle_root: merkleRoot,
              };
            }
            return {
              price: mintPeriod.price,
              end_time: mintPeriod.endTime,
              max_tokens: mintPeriod.maxTokens
                ? parseInt(mintPeriod.maxTokens, 10)
                : 0,
              limit_per_address: mintPeriod.perAddressLimit
                ? parseInt(mintPeriod.perAddressLimit, 10)
                : 0,
              start_time: mintPeriod.startTime,
              whitelist_info,
            };
          },
        );

        // ========== Final collection
        const collection: Collection = {
          name: collectionFormValues.name || "",
          desc: collectionFormValues.description || "",
          symbol: collectionFormValues.symbol || "",
          external_link: collectionFormValues.externalLink || "",
          website_link: collectionFormValues.websiteLink || "",
          twitter_profile: collectionFormValues.twitterProfileUrl || "",
          twitter_followers_count: collectionFormValues.nbTwitterFollowers
            ? parseInt(collectionFormValues.nbTwitterFollowers, 10)
            : 0,
          contact_discord_name: collectionFormValues.discordName || "",
          contact_email: collectionFormValues.email || "",
          project_type: collectionFormValues.projectTypes?.join() || "",
          project_desc: collectionFormValues.projectDescription || "",
          tokens_count: collectionFormValues.tokensCount
            ? parseInt(collectionFormValues.tokensCount, 10)
            : 0,
          reveal_time: collectionFormValues.revealTime,
          team_desc: collectionFormValues.teamDescription || "",
          team_link: collectionFormValues.teamLink || "",
          partners: collectionFormValues.partnersDescription || "",
          investment_desc: collectionFormValues.investDescription || "",
          investment_link: collectionFormValues.investLink || "",
          roadmap_link: collectionFormValues.roadmapLink || "",
          artwork_desc: collectionFormValues.artworkDescription || "",
          expected_supply: collectionFormValues.expectedSupply
            ? parseInt(collectionFormValues.expectedSupply, 10)
            : 0,
          expected_public_mint_price:
            collectionFormValues.expectedPublicMintPrice
              ? parseInt(collectionFormValues.expectedPublicMintPrice, 10)
              : 0,
          expected_mint_date: collectionFormValues.expectedMintDate,

          cover_img_uri: coverImageIpfsHash || "",
          is_applied_previously:
            collectionFormValues.isPreviouslyApplied || false,
          is_project_derivative:
            collectionFormValues.isDerivativeProject || false,
          is_ready_for_mint: collectionFormValues.isReadyForMint || false,
          is_dox: collectionFormValues.isDox || false,
          escrow_mint_proceeds_period:
            collectionFormValues.escrowMintProceedsPeriod
              ? parseInt(collectionFormValues.escrowMintProceedsPeriod, 10)
              : 0,
          dao_whitelist_count: collectionFormValues.daoWhitelistCount
            ? parseInt(collectionFormValues.daoWhitelistCount, 10)
            : 0,

          mint_periods,

          royalty_address: collectionFormValues.royaltyAddress || "",
          royalty_percentage: collectionFormValues.royaltyPercentage
            ? parseInt(collectionFormValues.royaltyPercentage, 10)
            : 0,

          target_network: selectedNetworkId,
          deployed_address: "None",
          whitepaper_link: "None",
          base_token_uri: "None",
        };

        console.log("========= collection", collection);

        // ========== Submit the collection through the contract
        const submitCollectionResult =
          await nftLaunchpadContractClient.submitCollection({
            collection,
          });
        console.log("======== submitCollection result", submitCollectionResult);

        // Collection status: SUBMITTED

        // ========== Retrieve de submitted collection from the backend
        const { collections } =
          await launchpadBackendClient.CollectionsByCreator({
            creator: userId,
          }); // TODO: ==> So we get projectID

        // ========== Send Metadata of this collection to the backend
        const metadatas: Metadata[] = [];
        if (collectionFormValues.assetsMetadatas?.length) {
          collectionFormValues.assetsMetadatas.forEach((metadata) => {
            metadatas.push({
              // image: "", //TODO: Why string ?
              // imageData: "", //TODO: What is this ?
              externalUrl: metadata.externalUrl,
              description: metadata.description,
              name: metadata.name,
              youtubeUrl: metadata.youtubeUrl,
              attributes: [],
              backgroundColor: "",
              animationUrl: "",
              royaltyPercentage: 5,
              royaltyPaymentAddress: "",
            });
          });
        }
        const { merkleRoot } = await launchpadBackendClient.UploadMetadatas({
          sender: walletAddress,
          projectId: "TODO", // TODO: ==> Put here projectID from CollectionsByCreator
          pinataJwt: userIPFSKey,
          networkId: selectedNetworkId,
          metadatas,
        });

        // ========== Provide the merkle root through the contract
        const updateMerkleRootResult =
          await nftLaunchpadContractClient.updateMerkleRoot({
            collectionId: "TODO", // TODO: ==> Put here projectID from CollectionsByCreator
            merkleRoot,
          });
        console.log(
          "======== updateMerkleRootResult result",
          updateMerkleRootResult,
        );

        // Collection status: READY TO DEPLOY

        return { submitCollectionResult, updateMerkleRootResult };
      } catch (e) {
        console.error("Error creating a NFT Collection in the Launchpad ", e);
        setToast({
          mode: "normal",
          type: "error",
          title: "Error creating a NFT Collection in the Launchpad",
        });
      }
    },
    [
      pinataPinFileToIPFS,
      selectedWallet,
      userIPFSKey,
      uploadFilesToPinata,
      selectedNetworkId,
      setToast,
    ],
  );

  return {
    createCollection,
  };
};
