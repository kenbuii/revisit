import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const themes = StyleSheet.create({
  mainLogo: {
    fontSize: moderateScale(26),
    fontFamily: "RobotoSerif-Bold",
    fontWeight: "bold",
    textAlign: "center",
    color: "#E03616",
    marginBottom: verticalScale(13),
  },

  mainFilter: {
    fontSize: 11,
    fontFamily: "RobotoMono",
    textAlign: "center",
  },
});

export default themes;
