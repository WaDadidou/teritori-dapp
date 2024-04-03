/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.35.7.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export interface InstantiateMsg {
  config: Config;
  [k: string]: unknown;
}
export interface Config {
  deployer?: string | null;
  name: string;
  nft_code_id?: number | null;
  supported_networks: string[];
}
export type ExecuteMsg = {
  update_config: {
    changes: Config;
    [k: string]: unknown;
  };
} | {
  submit_collection: {
    collection: Collection;
    [k: string]: unknown;
  };
} | {
  update_merkle_root: {
    collection_id: number;
    merkle_root: string;
    [k: string]: unknown;
  };
} | {
  deploy_collection: {
    collection_id: number;
    [k: string]: unknown;
  };
};
export type Addr = string;
export type Uint128 = string;
export interface Collection {
  artwork_desc: string;
  base_token_uri?: string | null;
  contact_discord_name: string;
  contact_email: string;
  cover_img_uri: string;
  dao_whitelist_count: number;
  denom: string;
  deployed_address?: string | null;
  desc: string;
  escrow_mint_proceeds_period: number;
  expected_mint_date: number;
  expected_public_mint_price: number;
  expected_supply: number;
  external_link?: string | null;
  investment_desc: string;
  investment_link: string;
  is_applied_previously: boolean;
  is_dox: boolean;
  is_project_derivative: boolean;
  is_ready_for_mint: boolean;
  limit_per_address: number;
  merkle_root?: string | null;
  name: string;
  partners: string;
  project_desc: string;
  project_type: string;
  reveal_time: number;
  roadmap_link: string;
  royalty_address?: Addr | null;
  royalty_percentage?: number | null;
  start_time: number;
  symbol: string;
  target_network: string;
  team_desc: string;
  team_link: string;
  tokens_count: number;
  twitter_followers_count: number;
  twitter_profile: string;
  unit_price: Uint128;
  website_link?: string | null;
  whitelist_mint_infos: WhitelistMintInfo[];
  whitepaper_link: string;
}
export interface WhitelistMintInfo {
  addresses_count: number;
  addresses_ipfs: string;
  denom: string;
  end_time: number;
  limit_per_address: number;
  merkle_root: string;
  start_time: number;
  unit_price: Uint128;
}
export type QueryMsg = {
  get_collection_by_id: {
    collection_id: number;
    [k: string]: unknown;
  };
} | {
  get_collection_by_addr: {
    collection_addr: string;
    [k: string]: unknown;
  };
} | {
  get_config: {
    [k: string]: unknown;
  };
};