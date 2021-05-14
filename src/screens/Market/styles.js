import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "@constants/themes";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE
    },
    topButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10
    },
    inputView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: wp('90%') / 3,
        height: 20,
        paddingLeft: 5, paddingRight: 5,
        borderRadius: 5,
        borderWidth: 0.5,
    },
    bottomBar: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: wp("100%"),
        height: 100,
        backgroundColor: colors.GREY.PRIMARY,
        padding: 20,
    },
});