// libraries
import moment from "moment";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  Curve,
  Path,
} from "victory-native";

import priceHistorySVG from "../../../../assets/icons/price-history.svg";
import {
  neutral33,
  neutral77,
  primaryColor,
} from "../../../utils/style/colors";
import { fontMedium10, fontMedium14 } from "../../../utils/style/fonts";
import { layout } from "../../../utils/style/layout";
import { BrandText } from "../../BrandText";
import { CollapsableSection } from "../../collapsable/CollapsableSection";
import data from "../nftPriceHistoryData.json";

const axisStyle = {
  grid: { strokeDasharray: "none", stroke: "none", padding: 20 },
  tickLabels: { ...StyleSheet.flatten(fontMedium14), fill: neutral77 },
  ticks: { stroke: neutral77, size: 5 },
};
const dependentAxisStyle = {
  ...axisStyle,
  grid: { ...axisStyle, stroke: neutral33 },
};

export const CollapsablePiceHistory = () => {
  // variables
  const convertedData = useMemo(
    () =>
      data.map((d) => ({
        y: parseInt(d.price, 10),
        x: moment(d.time).format("D MMM"),
      })),
    []
  );

  // returns
  return (
    <CollapsableSection icon={priceHistorySVG} title="Price history">
      <View style={styles.container}>
        <View style={styles.priceLabelTextContainer}>
          <BrandText style={styles.priceLabelText}>Price (SOL)</BrandText>
        </View>
        <VictoryChart
          minDomain={{ y: 0 }}
          padding={{ top: 10, bottom: 40, left: 80, right: 0 }}
          height={200}
        >
          <VictoryAxis domainPadding={layout.padding_x4} style={axisStyle} />
          <VictoryAxis dependentAxis style={dependentAxisStyle} />

          <VictoryLine
            style={{
              data: { stroke: primaryColor },
              border: { stroke: "transparent" },

              parent: { border: "1px solid red" },
            }}
            dataComponent={<Curve openCurve pathComponent={<Path />} />}
            data={convertedData}
          />
        </VictoryChart>
      </View>
    </CollapsableSection>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: layout.padding_x2,
    marginTop: 0,
    borderRadius: layout.borderRadius * 0.67,
    borderColor: neutral33,
    borderWidth: 1,
    flex: 1,
    paddingTop: layout.padding_x2,
  },
  priceLabelTextContainer: {
    flex: 1,
    position: "relative",
  },
  priceLabelText: StyleSheet.flatten([
    fontMedium10,
    {
      transform: [{ rotate: "-90deg" }],
      position: "absolute",
      left: -10,
      top: 50,
      bottom: 0,
      color: neutral77,
    },
  ]),
});