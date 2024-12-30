import { FieldValues, Path } from "react-hook-form";
import { Control } from "react-hook-form/dist/types/form";

import { TextInputCustom } from "@/components/inputs/TextInputCustom";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

export const TestTextInputCustom = <T extends FieldValues>({
  name,
  control,
  label,
  ...restProps
}: Props<T>) => {
  return (
    <TextInputCustom<T>
      name={name}
      control={control}
      label={label}
      noBrokenCorners
      {...restProps}
    />
  );
};
