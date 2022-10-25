import { useQuery } from "@tanstack/react-query";
import { Decimal } from "cosmwasm";

import { useFeedbacks } from "../context/FeedbacksProvider";
import { ValidatorInfo } from "../screens/Stake/types";
import { teritoriRestProvider, toriCurrency } from "../utils/teritori";

interface StakingParams {
  unbonding_time: string;
  max_validators: number;
  max_entries: number;
  historical_entries: number;
  bond_denom: string;
}

const initialData = {
  allValidators: [],
  activeValidators: [],
  inactiveValidators: [],
};

export const useValidators = () => {
  const { setToastError } = useFeedbacks();
  const { data } = useQuery(
    [`teritoriValidators`],
    async () => {
      try {
        const httpResponse = await fetch(
          `${teritoriRestProvider}/cosmos/staking/v1beta1/params`
        );
        const response = await httpResponse.json();
        const params: StakingParams = response.params;
        let key: string | null = "";
        let validators: ValidatorInfo[] = [];
        while (key !== null) {
          const response = await fetch(
            teritoriRestProvider +
              "/cosmos/staking/v1beta1/validators?pagination.limit=1000&pagination.key=" +
              encodeURIComponent(key)
          );
          const payload = await response.json();
          validators.push(
            ...payload.validators.map((v: any, i: number) => {
              const info: ValidatorInfo = {
                rank: `${i + 1}`,
                moniker: v.description.moniker,
                imageURL: v.imageURL,
                status: v.status,
                address: v.operator_address,
                votingPower: Decimal.fromAtomics(
                  v.tokens,
                  toriCurrency.coinDecimals
                )
                  .toFloatApproximation()
                  .toFixed()
                  .toString(),
                commission: prettyPercent(v.commission.commission_rates.rate),
                description: v.description.details,
                website: v.description.website,
                identity: v.description.identity,
                jailed: !!v.jailed,
              };
              return info;
            })
          );
          key = payload.pagination.next_key as string | null;
        }
        validators = validators.filter((v) => !v.jailed);
        validators.sort(
          (a, b) => parseFloat(b.votingPower) - parseFloat(a.votingPower)
        );
        let i = 0;
        for (const v of validators) {
          v.votingPower += " TORI";
          v.rank = (i + 1).toString();
          i++;
        }
        return {
          allValidators: validators,
          activeValidators: validators.slice(0, params.max_validators),
          inactiveValidators: validators.slice(params.max_validators),
        };
      } catch (err) {
        console.error(err);
        if (err instanceof Error) {
          setToastError({
            title: "Failed to fetch validators list",
            message: err.message,
          });
        }
      }
      return initialData;
    },
    {
      initialData,
    }
  );
  return data;
};

const prettyPercent = (val: number) => {
  return (val * 100).toFixed(2) + "%"; // FIXME: cut useless zeros
};