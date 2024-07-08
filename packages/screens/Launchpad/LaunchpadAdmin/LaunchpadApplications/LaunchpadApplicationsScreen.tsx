import React, { useState } from "react";
import { View } from "react-native";

import { BrandText } from "@/components/BrandText";
import { ScreenContainer } from "@/components/ScreenContainer";
import { HighVolSortButton } from "@/components/sorts/HighVolSortButton";
import { SpacerColumn } from "@/components/spacer";
import { Tabs } from "@/components/tabs/Tabs";
import { useAppNavigation } from "@/hooks/navigation/useAppNavigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { NetworkFeature } from "@/networks";
import { DummyLaunchpadCollection } from "@/screens/Launchpad/LaunchpadAdmin/LaunchpadAdministrationOverview/LaunchpadAdministrationOverviewScreen";
import { LaunchpadCollectionsTable } from "@/screens/Launchpad/LaunchpadAdmin/LaunchpadApplications/component/LaunchpadCollectionsTable";
import { neutral33 } from "@/utils/style/colors";
import { fontSemibold20, fontSemibold28 } from "@/utils/style/fonts";
import { layout } from "@/utils/style/layout";

type TabsListType = "pendingApplications" | "pendingConfirmations";

export const LaunchpadApplicationsScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const isMobile = useIsMobile();

  const tabs = {
    pendingApplications: {
      name: "Pending Applications",
      badgeCount: 32,
    },
    pendingConfirmations: {
      name: "Pending Confirmations",
      badgeCount: 42,
    },
  };

  const [selectedTab, setSelectedTab] = useState<TabsListType>(
    "pendingApplications",
  );

  const dummyData: DummyLaunchpadCollection[] = Array(25)
    .fill({
      id: 0,
      rank: 0,
      collectionName: "The R!ot",
      collectionNetwork: "teritori",
      TwitterURL: "https://www.lipsum.com/",
      DiscordURL: "https://www.lipsum.com/",
      expectedTotalSupply: 3000,
      expectedPublicMintPrice: "550 L",
      expectedMintDate: new Date(),
    })
    .map((item, index) => ({ ...item, id: index + 1, rank: index + 1 }));

  return (
    <ScreenContainer
      isLarge
      footerChildren={<></>}
      headerChildren={
        <BrandText style={fontSemibold20}>Administration Dashboard</BrandText>
      }
      responsive
      onBackPress={() => navigation.goBack()}
      forceNetworkFeatures={[NetworkFeature.NFTLaunchpad]}
    >
      <View style={{ marginTop: layout.spacing_x4 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BrandText style={fontSemibold28}>Launchpad Applications</BrandText>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 30,
            borderTopColor: neutral33,
            borderTopWidth: 1,
            borderBottomColor: neutral33,
            borderBottomWidth: 1,
          }}
        >
          <Tabs
            items={tabs}
            selected={selectedTab}
            style={{ height: 58, flex: 1 }}
            onSelect={setSelectedTab}
            noUnderline
          />

          {!isMobile && (
            <HighVolSortButton
              style={{ marginLeft: 12 }}
              sortDirection={1}
              onChangeSortDirection={() => {}} // TODO: don't forget to rewrite onPress function if possible
              height={42}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 12,
            flexWrap: "nowrap",
            justifyContent: "space-between",
            marginTop: layout.spacing_x4,
          }}
        >
          <LaunchpadCollectionsTable rows={dummyData} />
        </View>

        <SpacerColumn size={16} />
      </View>
    </ScreenContainer>
  );
};