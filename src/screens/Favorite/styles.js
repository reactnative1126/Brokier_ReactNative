import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "@constants/themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.WHITE
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  oneButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('50%') - 16,
    height: 25,
    backgroundColor: colors.WHITE,
    borderRadius: 5
  },
  statusBar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    backgroundColor: colors.WHITE
  },
  mapSearchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('50%'),
    height: 30,
    backgroundColor: '#B9B9B9',
    borderRadius: 5
  }
});