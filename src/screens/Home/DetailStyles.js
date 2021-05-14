import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "@constants/themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 35,
    padding: 2,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    paddingTop: 10,
    backgroundColor: colors.GREY.PRIMARY,
  },
  twoButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 30,
  },
  oneButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "46%",
    height: 20,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp("100%"),
    height: 80,
    backgroundColor: '#F6F6F6',
    paddingVertical: 20,
  },
});