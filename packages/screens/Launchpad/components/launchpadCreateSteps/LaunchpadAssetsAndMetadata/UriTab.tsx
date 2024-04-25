import React from "react";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";

import { CollectionFormValues } from "../../../../../utils/types/launchpad";

import { BrandText } from "@/components/BrandText";
import { SpacerColumn } from "@/components/spacer";
import { TextInputLaunchpad } from "@/screens/Launchpad/components/inputs/TextInputLaunchpad";
import { neutral77 } from "@/utils/style/colors";
import { fontSemibold14 } from "@/utils/style/fonts";
import { layout } from "@/utils/style/layout";

export const UriTab: React.FC = () => {
  const collectionForm = useFormContext<CollectionFormValues>();

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 416,
            margin: layout.spacing_x2,
          }}
        >
          <BrandText
            style={[fontSemibold14, { color: neutral77, textAlign: "center" }]}
          >
            Though Teritori's tr721 contract allows for off-chain metadata
            storage, it is recommended to use a decentralized storage solution,
            such as IPFS. You may head over to NFT.Storage and upload your
            assets & metadata manually to get a base URI for your collection.
          </BrandText>
          <SpacerColumn size={2} />

          <TextInputLaunchpad<CollectionFormValues>
            label="Base Token URI"
            placeHolder="ipfs://"
            name="baseTokenUri"
            form={collectionForm}
            required={false}
          />

          <TextInputLaunchpad<CollectionFormValues>
            name="coverImageUri"
            label="Cover Image URI"
            placeHolder="ipfs://"
            form={collectionForm}
            required={false}
          />
        </View>
      </View>
    </View>
  );
};