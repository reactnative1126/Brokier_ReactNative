import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "@constants/themes";

export default StyleSheet.create({
    whole: {
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: '#E3E3E3'
    },
    container: {
        backgroundColor: "#E3E3E3",
        alignItems: 'center'
    },
    view1: {
        alignItems: "flex-start",
        marginTop: 30,
        width: wp("100%"),
        paddingLeft: 10
    },
    view2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080',
    },
    view3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
    },
    text1: {
        marginTop: 5,
        marginLeft: 100,
        width: '90%',
        fontSize: 12,
        color: colors.RED.DEFAULT
    },
    text2: {
        fontSize: 12,
        color: colors.BLUE.PRIMARY,
        textDecorationLine: "underline"
    }
});