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
        marginTop: 10,
        width: "100%",
        height: 35,
        padding: 2,
    },
    searchBar: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        marginLeft: 10,
        width: wp("100%") - 60,
        height: 30,
        paddingLeft: 2,
        paddingRight: 5,
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: colors.GREY.PRIMARY,
    },
    searchIcon: {
        justifyContent: "center",
        alignItems: "center",
        width: 26,
        height: 26,
        backgroundColor: colors.WHITE,
        borderRadius: 5,
    },
    inputContainerStyle: {
        height: 30,
        padding: 0,
        borderBottomWidth: 0,
    },
    textInputStyle: {
        margin: 0,
        height: 30,
        width: wp("100%") - 120,
    },
    inputTextStyle: {
        height: 30,
        fontSize: 14,
    },
    nearby: {
        backgroundColor: colors.WHITE,
        paddingTop: 20,
        paddingLeft: 20,
    },
    nearbyButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 100,
        height: 25,
        backgroundColor: colors.GREY.PRIMARY,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: colors.GREY.SECONDARY
    },
    location: {
        padding: 20,
        borderBottomWidth: 0
    },
    listings: {
        padding: 20,
        borderBottomWidth: 0
    },
    recent: {
        padding: 20,
        borderBottomWidth: 0
    },
});