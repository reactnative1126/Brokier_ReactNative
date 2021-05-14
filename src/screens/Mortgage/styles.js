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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
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
    bottomBar: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: wp("100%"),
        height: 80,
        backgroundColor: colors.GREY.PRIMARY,
        padding: 20,
    },
});