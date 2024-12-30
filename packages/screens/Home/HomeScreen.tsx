import React from "react";

import { ScreenContainer } from "@/components/ScreenContainer";
import { HubIntro } from "@/components/hub/HubIntro";
import { HubLanding } from "@/components/hub/HubLanding";
import { useForceNetworkSelection } from "@/hooks/useForceNetworkSelection";
import { TestForm } from "@/screens/Home/TestForms/TestForm";
import { ScreenFC } from "@/utils/navigation";

export const HomeScreen: ScreenFC<"Home"> = ({ route: { params } }) => {
  useForceNetworkSelection(params?.network);
  return (
    <ScreenContainer mobileTitle="HOME">
      <TestForm />

      <HubIntro />
      <HubLanding />
    </ScreenContainer>
  );
};
