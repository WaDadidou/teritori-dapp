/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.13.4.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export type Uint128 = string;
export interface ConfigResponse {
  is_mintable: boolean;
  mint_max?: Uint128 | null;
  mint_start_time: number;
  minted_amount: Uint128;
  nft_addr: string;
  nft_base_uri: string;
  nft_max_supply: Uint128;
  nft_price_amount: Uint128;
  nft_symbol: string;
  owner: string;
  price_denom: string;
  whitelist_mint_max?: Uint128 | null;
  whitelist_mint_period: number;
  whitelisted_size: Uint128;
  [k: string]: unknown;
}
export type Addr = string;
export interface Config {
  is_mintable: boolean;
  mint_max?: Uint128 | null;
  mint_start_time: number;
  nft_addr: Addr;
  nft_base_uri: string;
  nft_max_supply: Uint128;
  nft_price_amount: Uint128;
  nft_symbol: string;
  owner: Addr;
  price_denom: string;
  whitelist_mint_max?: Uint128 | null;
  whitelist_mint_period: number;
  [k: string]: unknown;
}
export type ExecuteMsg = {
  update_config: {
    nft_base_uri?: string | null;
    nft_max_supply?: Uint128 | null;
    nft_price_amount?: Uint128 | null;
    owner?: string | null;
    [k: string]: unknown;
  };
} | {
  whitelist: {
    addrs: string[];
    [k: string]: unknown;
  };
} | {
  start_mint: {
    [k: string]: unknown;
  };
} | {
  mint: {
    [k: string]: unknown;
  };
} | {
  pause: {
    [k: string]: unknown;
  };
} | {
  unpause: {
    [k: string]: unknown;
  };
} | {
  withdraw_fund: {
    [k: string]: unknown;
  };
};
export interface InstantiateMsg {
  mint_max?: Uint128 | null;
  nft_base_uri: string;
  nft_ci: number;
  nft_max_supply: Uint128;
  nft_name: string;
  nft_price_amount: Uint128;
  nft_symbol: string;
  price_denom: string;
  whitelist_mint_max?: Uint128 | null;
  whitelist_mint_period: number;
  [k: string]: unknown;
}
export type QueryMsg = {
  config: {
    [k: string]: unknown;
  };
};