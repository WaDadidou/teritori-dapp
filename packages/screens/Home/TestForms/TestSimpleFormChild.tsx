import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";

import { SpacerColumn } from "@/components/spacer";
import { TestTextInputCustom } from "@/screens/Home/TestForms/Inputs/TestTextInputCustom";
import { FormObject } from "@/screens/Home/TestForms/utils/testFormTypes";

export const TestSimpleFormChild: FC = () => {
  const form = useFormContext<FormObject>();

  return (
    <View>
      {/*---- Controlled text input example */}
      {/*The data royalties is a number in Zod. But we use a text input. */}
      {/*For this case, either we use a string in Zod, either we keep number but use a number input*/}
      <TestTextInputCustom<FormObject>
        control={form.control}
        name="royalties"
        label="Royalties"
      />
      <SpacerColumn size={2} />
    </View>
  );
};
