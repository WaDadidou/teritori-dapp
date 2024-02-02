/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  SquadStakingV3,
  SquadStakingV3Interface,
} from "./SquadStakingV3";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftMetadataRegistry",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_minSquadSize",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxSquadSize",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxSquadCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_cooldownPeriod",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "_bonusMultipliers",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "Unstake",
    type: "event",
  },
  {
    inputs: [],
    name: "BONUS_MULTIPLIER_BASE_POINT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAMINA",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "bonusMultipliers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cooldownPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nft",
        type: "address",
      },
    ],
    name: "isSupportedCollection",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSquadCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSquadSize",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minSquadSize",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nftMetadataRegistry",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_size",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_bonusMultipliers",
        type: "uint256[]",
      },
    ],
    name: "setBonusMultiplier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_cooldownPeriod",
        type: "uint256",
      },
    ],
    name: "setCooldownPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxSquadCount",
        type: "uint256",
      },
    ],
    name: "setMaxSquadCount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_minSquadSize",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxSquadSize",
        type: "uint256",
      },
    ],
    name: "setSquadSize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        internalType: "bool",
        name: "supported",
        type: "bool",
      },
    ],
    name: "setSupportedCollection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "collection",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct SquadStakingV3.NftInfo[]",
        name: "nfts",
        type: "tuple[]",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "size",
        type: "uint256",
      },
    ],
    name: "stakeDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "supportedCollectionAt",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "supportedCollectionLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "supportedCollections",
    outputs: [
      {
        internalType: "address[]",
        name: "collections",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "userSquadCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "userSquadInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "address",
                name: "collection",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            internalType: "struct SquadStakingV3.NftInfo[]",
            name: "nfts",
            type: "tuple[]",
          },
        ],
        internalType: "struct SquadStakingV3.SquadInfoWithIndex[]",
        name: "squads",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620023af380380620023af833981016040819052620000349162000133565b6200003f33620000e3565b6000805460ff60a01b19168155600180546001600160a01b0319166001600160a01b03891617905560028690556003859055600484905560058390555b8151811015620000d657818181518110620000a757634e487b7160e01b600052603260045260246000fd5b60209081029190910181015160008381526006909252604090912055620000ce8162000248565b90506200007c565b5050505050505062000286565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60008060008060008060c087890312156200014c578182fd5b86516001600160a01b038116811462000163578283fd5b60208881015160408a015160608b015160808c015160a08d0151959b5092995090975095509350906001600160401b0380821115620001a0578384fd5b818a0191508a601f830112620001b4578384fd5b815181811115620001c957620001c962000270565b8060051b604051601f19603f83011681018181108582111715620001f157620001f162000270565b604052828152858101935084860182860187018f101562000210578788fd5b8795505b838610156200023457805185526001959095019493860193860162000214565b508096505050505050509295509295509295565b60006000198214156200026957634e487b7160e01b81526011600452602481fd5b5060010190565b634e487b7160e01b600052604160045260246000fd5b61211980620002966000396000f3fe608060405234801561001057600080fd5b50600436106101cf5760003560e01c806362b2c8fe116101045780638994929e116100a2578063a18d50b411610071578063a18d50b414610414578063ae7521a414610427578063ca7779331461043a578063f2fde38b1461045a57600080fd5b80638994929e146103d45780638da5cb5b146103dd5780639427144c146103ee578063a16e36071461040157600080fd5b80638044ef8f116100de5780638044ef8f1461039057806380ea3de1146103995780638178c4df146103ac5780638456cb59146103cc57600080fd5b806362b2c8fe14610366578063715018a614610375578063801c52361461037d57600080fd5b8063251f2e8a116101715780633f4ba83a1161014b5780633f4ba83a1461031c578063442e6420146103245780634b8544f21461034b5780635c975abb1461035457600080fd5b8063251f2e8a146102d35780632c87572b146102f65780632e17de781461030957600080fd5b80630bf242d8116101ad5780630bf242d81461020d578063150b7a021461022d5780631e1a3d35146102955780631f1a31d6146102c057600080fd5b8063014b5c10146101d457806304646a49146101ef5780630bed494c146101f8575b600080fd5b6101dc61046d565b6040519081526020015b60405180910390f35b6101dc60055481565b61020b610206366004611cc7565b61047e565b005b6101dc61021b366004611e4f565b60066020526000908152604090205481565b61026461023b366004611c0f565b7f150b7a0200000000000000000000000000000000000000000000000000000000949350505050565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016101e6565b6102a86102a3366004611e4f565b6104fe565b6040516001600160a01b0390911681526020016101e6565b61020b6102ce366004611dee565b610511565b6102e66102e1366004611bf5565b61063f565b60405190151581526020016101e6565b6001546102a8906001600160a01b031681565b61020b610317366004611e4f565b61064c565b61020b610a3a565b6101dc7fd5a7979ffc063a968e739c62c537ad288115ff53fe26bed1217a11adff77b48381565b6101dc60025481565b600054600160a01b900460ff166102e6565b6101dc670de0b6b3a764000081565b61020b610af7565b61020b61038b366004611d33565b610b5b565b6101dc60045481565b61020b6103a7366004611e4f565b610f57565b6103bf6103ba366004611e4f565b610fb6565b6040516101e69190611ea0565b61020b61107e565b6101dc60035481565b6000546001600160a01b03166102a8565b61020b6103fc366004611e4f565b61112d565b6101dc61040f366004611d01565b61118c565b6101dc610422366004611bf5565b6112ee565b61020b610435366004611e7f565b61131c565b61044d610448366004611bf5565b611381565b6040516101e69190611eed565b61020b610468366004611bf5565b61161b565b600061047960076116fd565b905090565b6000546001600160a01b031633146104dd5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b80156104f3576104ee600783611707565b505050565b6104ee600783611723565b600061050b600783611738565b92915050565b6000546001600160a01b0316331461056b5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104d4565b80518251146105bc5760405162461bcd60e51b815260206004820152600f60248201527f6c656e677468206d69736d61746368000000000000000000000000000000000060448201526064016104d4565b60005b81518110156104ee578181815181106105e857634e487b7160e01b600052603260045260246000fd5b60200260200101516006600085848151811061061457634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002081905550806106389061209c565b90506105bf565b600061050b600783611744565b600054600160a01b900460ff16156106995760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016104d4565b3360009081526009602090815260408083208484528252808320815160608101835281548152600182015481850152600282018054845181870281018701865281815292959394860193879084015b82821015610730576000848152602090819020604080518082019091526002850290910180546001600160a01b031682526001908101548284015290835290920191016106e8565b5050505081525050905060008160400151511161078f5760405162461bcd60e51b815260206004820152600d60248201527f696e76616c696420696e6465780000000000000000000000000000000000000060448201526064016104d4565b42816020015111156107e35760405162461bcd60e51b815260206004820152601560248201527f647572696e67207374616b696e6720706572696f64000000000000000000000060448201526064016104d4565b600554815142916107f39161202e565b11156108415760405162461bcd60e51b815260206004820152601660248201527f647572696e6720636f6f6c646f776e20706572696f640000000000000000000060448201526064016104d4565b60005b816040015151811015610953578160400151818151811061087557634e487b7160e01b600052603260045260246000fd5b6020026020010151600001516001600160a01b03166342842e0e3033856040015185815181106108b557634e487b7160e01b600052603260045260246000fd5b60209081029190910181015101516040517fffffffff0000000000000000000000000000000000000000000000000000000060e086901b1681526001600160a01b0393841660048201529290911660248301526044820152606401600060405180830381600087803b15801561092a57600080fd5b505af115801561093e573d6000803e3d6000fd5b505050508061094c9061209c565b9050610844565b50336000908152600a602052604081205461096f90600161202e565b3360009081526009602090815260408083208484529091528082208683529120815481556001808301549082015560028083018054949550929391926109b89291840191611a95565b505033600090815260096020908152604080832085845290915281208181556001810182905591506109ed6002830182611b1a565b5050336000818152600a602090815260409182902084905590519182527fe5d648ba8f514a64a4104bf6922acc6e04ecab6464b46d696cf123c27079ddd7910160405180910390a1505050565b6000546001600160a01b03163314610a945760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104d4565b600054600160a01b900460ff16610aed5760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f742070617573656400000000000000000000000060448201526064016104d4565b610af5611766565b565b6000546001600160a01b03163314610b515760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104d4565b610af5600061180c565b600054600160a01b900460ff1615610ba85760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016104d4565b600254815110158015610bbe5750600354815111155b610c0a5760405162461bcd60e51b815260206004820152601660248201527f696e76616c6964206e756d626572206f66206e6674730000000000000000000060448201526064016104d4565b60005b8151811015610d9057610c4a828281518110610c3957634e487b7160e01b600052603260045260246000fd5b60200260200101516000015161063f565b610c965760405162461bcd60e51b815260206004820152601860248201527f6e6f7420737570706f7274656420636f6c6c656374696f6e000000000000000060448201526064016104d4565b818181518110610cb657634e487b7160e01b600052603260045260246000fd5b6020026020010151600001516001600160a01b03166342842e0e3330858581518110610cf257634e487b7160e01b600052603260045260246000fd5b60209081029190910181015101516040517fffffffff0000000000000000000000000000000000000000000000000000000060e086901b1681526001600160a01b0393841660048201529290911660248301526044820152606401600060405180830381600087803b158015610d6757600080fd5b505af1158015610d7b573d6000803e3d6000fd5b5050505080610d899061209c565b9050610c0d565b506000610df782600081518110610db757634e487b7160e01b600052603260045260246000fd5b60200260200101516000015183600081518110610de457634e487b7160e01b600052603260045260246000fd5b602002602001015160200151845161118c565b9050426000610e06838361202e565b336000908152600b602052604081205491925090610e2590600161202e565b33600090815260096020908152604080832084845290915281208581556001018490559091505b8551811015610efd5733600090815260096020908152604080832085845290915290208651600290910190879083908110610e9757634e487b7160e01b600052603260045260246000fd5b6020908102919091018101518254600180820185556000948552938390208251600290920201805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03909216919091178155910151910155610ef68161209c565b9050610e4c565b50336000818152600b60209081526040918290208490558151928352820185905281018390527f5af417134f72a9d41143ace85b0a26dce6f550f894f2cbc1eeee8810603d91b69060600160405180910390a15050505050565b6000546001600160a01b03163314610fb15760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104d4565b600555565b60606000610fc460076116fd565b90508067ffffffffffffffff811115610fed57634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015611016578160200160208202803683370190505b50915060005b818110156110775761102f600785611738565b83828151811061104f57634e487b7160e01b600052603260045260246000fd5b6001600160a01b03909216602092830291909101909101526110708161209c565b905061101c565b5050919050565b6000546001600160a01b031633146110d85760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104d4565b600054600160a01b900460ff16156111255760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016104d4565b610af5611869565b6000546001600160a01b031633146111875760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104d4565b600455565b600081815260066020526040812054806111e85760405162461bcd60e51b815260206004820152601860248201527f696e76616c696420626f6e7573206d756c7469706c696572000000000000000060448201526064016104d4565b6001546040517febf0465d0000000000000000000000000000000000000000000000000000000081527fd5a7979ffc063a968e739c62c537ad288115ff53fe26bed1217a11adff77b48360048201526001600160a01b03878116602483015260448201879052600092169063ebf0465d9060640160206040518083038186803b15801561127457600080fd5b505afa158015611288573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112ac9190611e67565b9050670de0b6b3a76400006008836112c684610e10612066565b6112d09190612066565b6112da9190612046565b6112e49190612046565b9695505050505050565b6001600160a01b0381166000908152600a6020908152604080832054600b90925282205461050b9190612085565b6000546001600160a01b031633146113765760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104d4565b600291909155600355565b6001600160a01b0381166000908152600a6020908152604080832054600b909252822054606092916113b291612085565b90508067ffffffffffffffff8111156113db57634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561143757816020015b6114246040518060800160405280600081526020016000815260200160008152602001606081525090565b8152602001906001900390816113f95790505b50915060005b81811015611077576001600160a01b0384166000908152600a6020526040812054611468908361202e565b61147390600161202e565b90508084838151811061149657634e487b7160e01b600052603260045260246000fd5b602090810291909101810151919091526001600160a01b0386166000908152600982526040808220848352909252205484518590849081106114e857634e487b7160e01b600052603260045260246000fd5b6020908102919091018101518101919091526001600160a01b03861660009081526009825260408082208483529092522060010154845185908490811061153f57634e487b7160e01b600052603260045260246000fd5b6020908102919091018101516040908101929092526001600160a01b03871660009081526009825282812084825282528281206002018054845181850281018501909552808552909290919084015b828210156115d6576000848152602090819020604080518082019091526002850290910180546001600160a01b0316825260019081015482840152908352909201910161158e565b505050508483815181106115fa57634e487b7160e01b600052603260045260246000fd5b60200260200101516060018190525050806116149061209c565b905061143d565b6000546001600160a01b031633146116755760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104d4565b6001600160a01b0381166116f15760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016104d4565b6116fa8161180c565b50565b600061050b825490565b600061171c836001600160a01b0384166118f1565b9392505050565b600061171c836001600160a01b038416611940565b600061171c8383611a5d565b6001600160a01b0381166000908152600183016020526040812054151561171c565b600054600160a01b900460ff166117bf5760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f742070617573656400000000000000000000000060448201526064016104d4565b6000805460ff60a01b191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600054600160a01b900460ff16156118b65760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016104d4565b6000805460ff60a01b1916600160a01b1790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586117ef3390565b60008181526001830160205260408120546119385750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561050b565b50600061050b565b60008181526001830160205260408120548015611a53576000611964600183612085565b855490915060009061197890600190612085565b90508181146119f95760008660000182815481106119a657634e487b7160e01b600052603260045260246000fd5b90600052602060002001549050808760000184815481106119d757634e487b7160e01b600052603260045260246000fd5b6000918252602080832090910192909255918252600188019052604090208390555b8554869080611a1857634e487b7160e01b600052603160045260246000fd5b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061050b565b600091505061050b565b6000826000018281548110611a8257634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905092915050565b828054828255906000526020600020906002028101928215611b0a5760005260206000209160020282015b82811115611b0a578254825473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b039091161782556001808401549083015560029283019290910190611ac0565b50611b16929150611b37565b5090565b50805460008255600202906000526020600020908101906116fa91905b5b80821115611b1657805473ffffffffffffffffffffffffffffffffffffffff1916815560006001820155600201611b38565b80356001600160a01b0381168114611b8157600080fd5b919050565b600082601f830112611b96578081fd5b81356020611bab611ba68361200a565b611fd9565b80838252828201915082860187848660051b8901011115611bca578586fd5b855b85811015611be857813584529284019290840190600101611bcc565b5090979650505050505050565b600060208284031215611c06578081fd5b61171c82611b6a565b60008060008060808587031215611c24578283fd5b611c2d85611b6a565b93506020611c3c818701611b6a565b935060408601359250606086013567ffffffffffffffff80821115611c5f578384fd5b818801915088601f830112611c72578384fd5b813581811115611c8457611c846120cd565b611c96601f8201601f19168501611fd9565b91508082528984828501011115611cab578485fd5b8084840185840137810190920192909252939692955090935050565b60008060408385031215611cd9578182fd5b611ce283611b6a565b915060208301358015158114611cf6578182fd5b809150509250929050565b600080600060608486031215611d15578283fd5b611d1e84611b6a565b95602085013595506040909401359392505050565b60006020808385031215611d45578182fd5b823567ffffffffffffffff811115611d5b578283fd5b8301601f81018513611d6b578283fd5b8035611d79611ba68261200a565b80828252848201915084840188868560061b8701011115611d98578687fd5b8694505b83851015611de257604080828b031215611db4578788fd5b611dbc611fb0565b611dc583611b6a565b815282880135888201528452600195909501949286019201611d9c565b50979650505050505050565b60008060408385031215611e00578182fd5b823567ffffffffffffffff80821115611e17578384fd5b611e2386838701611b86565b93506020850135915080821115611e38578283fd5b50611e4585828601611b86565b9150509250929050565b600060208284031215611e60578081fd5b5035919050565b600060208284031215611e78578081fd5b5051919050565b60008060408385031215611e91578182fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b81811015611ee15783516001600160a01b031683529284019291840191600101611ebc565b50909695505050505050565b60006020808301818452808551808352604092508286019150828160051b870101848801865b83811015611fa257888303603f19018552815180518452878101518885015286810151878501526060908101516080918501829052805191850182905288019060a08501908a905b80821015611f8d57835180516001600160a01b031684528b01518b840152928a01929189019160019190910190611f5b565b50509588019593505090860190600101611f13565b509098975050505050505050565b6040805190810167ffffffffffffffff81118282101715611fd357611fd36120cd565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715612002576120026120cd565b604052919050565b600067ffffffffffffffff821115612024576120246120cd565b5060051b60200190565b60008219821115612041576120416120b7565b500190565b60008261206157634e487b7160e01b81526012600452602481fd5b500490565b6000816000190483118215151615612080576120806120b7565b500290565b600082821015612097576120976120b7565b500390565b60006000198214156120b0576120b06120b7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220ff140690d1744f7911a84812f02e117f6c9c1a765caf3430b537b567ae27045c64736f6c63430008040033";

export class SquadStakingV3__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _nftMetadataRegistry: string,
    _minSquadSize: BigNumberish,
    _maxSquadSize: BigNumberish,
    _maxSquadCount: BigNumberish,
    _cooldownPeriod: BigNumberish,
    _bonusMultipliers: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SquadStakingV3> {
    return super.deploy(
      _nftMetadataRegistry,
      _minSquadSize,
      _maxSquadSize,
      _maxSquadCount,
      _cooldownPeriod,
      _bonusMultipliers,
      overrides || {}
    ) as Promise<SquadStakingV3>;
  }
  getDeployTransaction(
    _nftMetadataRegistry: string,
    _minSquadSize: BigNumberish,
    _maxSquadSize: BigNumberish,
    _maxSquadCount: BigNumberish,
    _cooldownPeriod: BigNumberish,
    _bonusMultipliers: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _nftMetadataRegistry,
      _minSquadSize,
      _maxSquadSize,
      _maxSquadCount,
      _cooldownPeriod,
      _bonusMultipliers,
      overrides || {}
    );
  }
  attach(address: string): SquadStakingV3 {
    return super.attach(address) as SquadStakingV3;
  }
  connect(signer: Signer): SquadStakingV3__factory {
    return super.connect(signer) as SquadStakingV3__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SquadStakingV3Interface {
    return new utils.Interface(_abi) as SquadStakingV3Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SquadStakingV3 {
    return new Contract(address, _abi, signerOrProvider) as SquadStakingV3;
  }
}