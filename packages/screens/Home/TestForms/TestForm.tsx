import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SelectInput, SelectInputItem } from "@/components/inputs/SelectInput";
import { SpacerColumn } from "@/components/spacer";
import { TestTextInput } from "@/screens/Home/TestForms/Inputs/TestTextInput";
import { TestTextInputCustom } from "@/screens/Home/TestForms/Inputs/TestTextInputCustom";
import { TestFormFieldArray } from "@/screens/Home/TestForms/TestFormFieldArray";
import { TestSimpleFormChild } from "@/screens/Home/TestForms/TestSimpleFormChild";
import { useGetDataFromAPI } from "@/screens/Home/TestForms/hooks/useGetDataFromAPI";
import { useSendDataToAPI } from "@/screens/Home/TestForms/hooks/useSendDataToAPI";
import {
  FormObject,
  ZodFakeDataFromAPI,
  ZodFormObject,
} from "@/screens/Home/TestForms/utils/testFormTypes";
import { zodTryParseJSON } from "@/utils/sanitize";
import { withAlpha } from "@/utils/style/colors";

export const memberRandomName = () =>
  Math.random().toString(36).slice(2).slice(0, 6);

const availableCategories: SelectInputItem[] = [
  {
    label: "Category 1",
    value: "1",
  },
  {
    label: "Category 2",
    value: "2",
  },
  {
    label: "Category 3",
    value: "3",
  },
];

export const TestForm: FC = () => {
  const { sendData, isLoading } = useSendDataToAPI();

  const { data } = useGetDataFromAPI();
  console.log("---- data from API", data);

  const parsedData = zodTryParseJSON(ZodFakeDataFromAPI, data);
  console.log("---- parsedData", parsedData);

  const form = useForm<FormObject>({
    // Validation mode
    mode: "all",
    // Default values
    defaultValues: {
      description: "Default description",
      category: 1,
      members: [
        {
          name: memberRandomName(),
          isBlacklisted: false,
        },
      ],
    },
    // Plugs zod to react-hook-form
    resolver: zodResolver(ZodFormObject),
  });

  // Callback function invoked after form pass validation (handleSubmit)
  const onValid = () => {
    sendData(form.getValues());
    //...toast success, feedbacks etc
  };
  // Callback function invoked when form failed validation (handleSubmit)
  const onInvalid = () => {
    //...toast error, feedbacks, console error, etc
  };
  // handleSubmit validates the entire form
  const onPressSubmit = () => form.handleSubmit(onValid, onInvalid)();

  return (
    <View
      style={{
        minHeight: 900,
        borderColor: withAlpha("#555500", 0.6),
        padding: 20,
        borderWidth: 5,
      }}
    >
      {/*---- Text input custom example */}
      <TestTextInputCustom<FormObject>
        control={form.control}
        name="title"
        label="Title"
      />
      <SpacerColumn size={2} />

      {/*---- Text input example */}
      <TestTextInput<FormObject>
        form={form}
        name="description"
        label="Description"
        placeHolder="Enter descriptionn here"
      />
      <SpacerColumn size={2} />

      {/*---- Controlled select input example */}
      <Controller<FormObject>
        control={form.control}
        name="category"
        render={({ field: { value, onChange } }) => (
          <SelectInput
            data={availableCategories}
            selectedItem={{
              label: `Category ${value}`,
              value: value?.toString() || "",
            }}
            selectItem={(item) => onChange(item.value)}
          />
        )}
      />
      <SpacerColumn size={2} />

      {/*Input number example*/}

      {/*Input dateTime example*/}

      {/*Input file example*/}

      {/*---- Sub form example */}
      <FormProvider {...form}>
        <TestSimpleFormChild />

        <TestFormFieldArray />

        {/*<TestSubForm/>*/}
      </FormProvider>

      {/*---- Submit button */}
      <PrimaryButton
        size="XL"
        text="Submit form"
        loader
        isLoading={isLoading}
        disabled={isLoading || !form.formState.isValid}
        onPress={onPressSubmit}
      />
    </View>
  );
};
