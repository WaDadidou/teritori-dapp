import { FC, Fragment, useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { View } from "react-native";

import { BrandText } from "@/components/BrandText";
import { SpacerColumn } from "@/components/spacer";
import {
  FormObject,
  SecretListObject,
} from "@/screens/Home/TestForms/utils/testFormTypes";

export const TestSubForm: FC = () => {
  const form = useFormContext<FormObject>();
  const secretListForm = useForm<SecretListObject>();
  const secretListMembers = secretListForm.watch("members");

  // Plugs secretList members from secretListForm to form
  useEffect(() => {
    form.setValue("secretList.members", secretListMembers);
  }, [secretListMembers, form]);

  return (
    <View>
      {secretListMembers?.map((member, key) => (
        <Fragment key={key}>
          <BrandText>{member.name}</BrandText>
          <SpacerColumn size={1} />
        </Fragment>
      ))}
      <SpacerColumn size={2} />
    </View>
  );
};
