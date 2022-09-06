import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

import { borderRadius, ButtonsSize, height } from "../../utils/style/buttons";
import { neutral33, neutral77 } from "../../utils/style/colors";
import { fontSemibold14 } from "../../utils/style/fonts";
import { BrandText } from "../BrandText";
import { SVG } from "../SVG";
import { TertiaryBox } from "../boxes/TertiaryBox";

export const SecondaryButtonOutline: React.FC<{
  size: ButtonsSize;
  text: string;
  width?: number;
  onPress?: () => void;
  squaresBackgroundColor?: string;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
  iconSVG?: React.FC<SvgProps>;
  disabled?: boolean;
  fullWidth?: boolean;
}> = ({
  // If no width, the buttons will fit the content including paddingHorizontal 20
  width,
  size,
  text,
  onPress,
  squaresBackgroundColor,
  backgroundColor = neutral33,
  color = "#FFFFFF",
  borderColor = "#FFFFFF",
  style,
  iconSVG,
  disabled = false,
  fullWidth = false,
}) => {
  const boxProps = {
    style,
    disabled,
    squaresBackgroundColor,
    width,
    fullWidth,
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <TertiaryBox
        height={height(size)}
        mainContainerStyle={{
          flexDirection: "row",
          borderRadius: borderRadius(size),
          backgroundColor,
          paddingHorizontal: 20,
          borderColor,
        }}
        {...boxProps}
      >
        {iconSVG ? (
          <SVG
            source={iconSVG}
            width={16}
            height={16}
            style={{ marginRight: 8 }}
          />
        ) : null}

        <BrandText
          style={[
            fontSemibold14,
            { color: disabled ? neutral77 : color, textAlign: "center" },
          ]}
        >
          {text}
        </BrandText>
      </TertiaryBox>
    </TouchableOpacity>
  );
};