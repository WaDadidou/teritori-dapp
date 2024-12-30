import { FC, Fragment } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { View } from "react-native";

import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { TertiaryButton } from "@/components/buttons/TertiaryButton";
import { SpacerColumn, SpacerRow } from "@/components/spacer";
import { TestTextInputCustom } from "@/screens/Home/TestForms/Inputs/TestTextInputCustom";
import { memberRandomName } from "@/screens/Home/TestForms/TestForm";
import { FormObject } from "@/screens/Home/TestForms/utils/testFormTypes";
import Checkbox from "@/screens/Mini/components/Checkbox/Checkbox";

export const TestFormFieldArray: FC = () => {
  const form = useFormContext<FormObject>();

  const membersField = useFieldArray({
    // Plug form and "members" field array
    control: form.control,
    name: "members",
  });

  // membersField.remove
  const onPressRemoveMember = (index: number) => {
    membersField.remove(index);
  };
  // membersField.append
  const onPressAddMember = () => {
    membersField.append({
      name: memberRandomName(),
      isBlacklisted: false,
    });
  };
  // membersField.update (Not used here because isBlacklisted is controlled with Controller)
  // const onPressMemberCheckbox = (member: MemberObject, index: number) => {
  //   const updatedMember: MemberObject = {...member, isBlacklisted: !member.isBlacklisted}
  //   membersField.update(index, updatedMember)
  // }

  return (
    <View>
      {/* Field array example */}
      {membersField.fields.map((member, index) => (
        // Use member.id as key to correctly index the fields
        <Fragment key={member.id}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/*---- Controlled text input plugged to member's name */}
            <TestTextInputCustom<FormObject>
              control={form.control}
              // Use index to find the field name from the form
              name={`members.${index}.name`}
              label="Member name"
            />
            <SpacerRow size={2} />

            {/*---- Controlled checkbox plugged to member's isBlacklisted */}
            <Controller<FormObject>
              control={form.control}
              name={`members.${index}.isBlacklisted`}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  isChecked={!!value}
                  onPress={() => onChange(!value)}
                  label="Blacklisted"
                  wrapperStyle={{ width: 110 }}
                  value=""
                />
              )}
            />

            {/*<SpacerRow size={2} />*/}

            {/*/!*---- Uncontrolled checkbox plugged to member's isBlacklisted *!/*/}
            {/*<Checkbox*/}
            {/*  isChecked={member.isBlacklisted}*/}
            {/*  onPress={() =>*/}
            {/*    onPressMemberCheckbox(member, index)}*/}

            {/*  label="Blacklisted"*/}
            {/*  wrapperStyle={{width: 20}}*/}
            {/*  value={""}*/}
            {/*/>*/}
            {/*<SpacerRow size={1}/>*/}

            {index > 0 && (
              <TertiaryButton
                size="SM"
                text="Remove member"
                onPress={() => onPressRemoveMember(index)}
              />
            )}
          </View>

          <SpacerColumn size={2} />
        </Fragment>
      ))}
      <SpacerColumn size={2} />

      <SecondaryButton size="SM" text="Add member" onPress={onPressAddMember} />
    </View>
  );
};
