import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import { colors } from "@constants/themes";

export default PaymentCalculator = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.statusBar}>
                <Text>Browse Mortgages</Text>
                <View style={styles.topButton}>
                    <TouchableOpacity style={styles.inputView} onPress={props.purposeStatus}>
                        <Icon name='down' type='antdesign' size={14} color={colors.BLACK} />
                        <Text style={{ fontSize: 12 }}>{props.purpose}</Text>
                        <View />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputView} onPress={props.termStatus}>
                        <Icon name='down' type='antdesign' size={14} color={colors.BLACK} />
                        <Text style={{ fontSize: 12 }}>{props.term}</Text>
                        <View />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputView} onPress={props.typeStatus}>
                        <Icon name='down' type='antdesign' size={14} color={colors.BLACK} />
                        <Text style={{ fontSize: 12 }}>{props.type}</Text>
                        <View />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inputView} onPress={props.depositStatus}>
                        <Icon name='down' type='antdesign' size={14} color={colors.BLACK} />
                        <Text style={{ fontSize: 12 }}>{props.deposit}</Text>
                        <View />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: 20 }} />
            <ScrollView contentContainerStyle={styles.main}>
                <View style={styles.item}>
                    <View style={{ alignItems: 'center', width: wp('100%') - 150 }}>
                        <Text style={{ fontSize: 20 }}>MCAP Mortgage Corp</Text>
                        <Text style={{ fontSize: 20 }}>2.5%</Text>
                        <Text style={{ fontSize: 12, color: '#999' }}>Fixed 4 Year</Text>
                    </View>
                    <View style={{ width: 130 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120, height: 20, borderWidth: 0.5, borderRadius: 3 }}>
                            <Text style={{ fontSize: 12 }}>Calculate Payment</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120, height: 20, borderWidth: 0.5, borderRadius: 3, marginTop: 5 }}>
                            <Text>Get This Rate</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={{ alignItems: 'center', width: wp('100%') - 150 }}>
                        <Text style={{ fontSize: 20 }}>MCAP Mortgage Corp</Text>
                        <Text style={{ fontSize: 20 }}>2.5%</Text>
                        <Text style={{ fontSize: 12, color: '#999' }}>Fixed 4 Year</Text>
                    </View>
                    <View style={{ width: 130 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120, height: 20, borderWidth: 0.5, borderRadius: 3 }}>
                            <Text style={{ fontSize: 12 }}>Calculate Payment</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120, height: 20, borderWidth: 0.5, borderRadius: 3, marginTop: 5 }}>
                            <Text>Get This Rate</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={{ alignItems: 'center', width: wp('100%') - 150 }}>
                        <Text style={{ fontSize: 20 }}>MCAP Mortgage Corp</Text>
                        <Text style={{ fontSize: 20 }}>2.5%</Text>
                        <Text style={{ fontSize: 12, color: '#999' }}>Fixed 4 Year</Text>
                    </View>
                    <View style={{ width: 130 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120, height: 20, borderWidth: 0.5, borderRadius: 3 }}>
                            <Text style={{ fontSize: 12 }}>Calculate Payment</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120, height: 20, borderWidth: 0.5, borderRadius: 3, marginTop: 5 }}>
                            <Text>Get This Rate</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={{ alignItems: 'center', width: wp('100%') - 150 }}>
                        <Text style={{ fontSize: 20 }}>MCAP Mortgage Corp</Text>
                        <Text style={{ fontSize: 20 }}>2.5%</Text>
                        <Text style={{ fontSize: 12, color: '#999' }}>Fixed 4 Year</Text>
                    </View>
                    <View style={{ width: 130 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120, height: 20, borderWidth: 0.5, borderRadius: 3 }}>
                            <Text style={{ fontSize: 12 }}>Calculate Payment</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120, height: 20, borderWidth: 0.5, borderRadius: 3, marginTop: 5 }}>
                            <Text>Get This Rate</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={{ alignItems: 'center', width: wp('100%') - 150 }}>
                        <Text style={{ fontSize: 20 }}>MCAP Mortgage Corp</Text>
                        <Text style={{ fontSize: 20 }}>2.5%</Text>
                        <Text style={{ fontSize: 12, color: '#999' }}>Fixed 4 Year</Text>
                    </View>
                    <View style={{ width: 130 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120, height: 20, borderWidth: 0.5, borderRadius: 3 }}>
                            <Text style={{ fontSize: 12 }}>Calculate Payment</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120, height: 20, borderWidth: 0.5, borderRadius: 3, marginTop: 5 }}>
                            <Text>Get This Rate</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={{ alignItems: 'center', width: wp('100%') - 150 }}>
                        <Text style={{ fontSize: 20 }}>MCAP Mortgage Corp</Text>
                        <Text style={{ fontSize: 20 }}>2.5%</Text>
                        <Text style={{ fontSize: 12, color: '#999' }}>Fixed 4 Year</Text>
                    </View>
                    <View style={{ width: 130 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120, height: 20, borderWidth: 0.5, borderRadius: 3 }}>
                            <Text style={{ fontSize: 12 }}>Calculate Payment</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120, height: 20, borderWidth: 0.5, borderRadius: 3, marginTop: 5 }}>
                            <Text>Get This Rate</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={{ alignItems: 'center', width: wp('100%') - 150 }}>
                        <Text style={{ fontSize: 20 }}>MCAP Mortgage Corp</Text>
                        <Text style={{ fontSize: 20 }}>2.5%</Text>
                        <Text style={{ fontSize: 12, color: '#999' }}>Fixed 4 Year</Text>
                    </View>
                    <View style={{ width: 130 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120, height: 20, borderWidth: 0.5, borderRadius: 3 }}>
                            <Text style={{ fontSize: 12 }}>Calculate Payment</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 120, height: 20, borderWidth: 0.5, borderRadius: 3, marginTop: 5 }}>
                            <Text>Get This Rate</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
    },
    statusBar: {
        padding: 10,
        alignItems: 'center',
        width: wp('100%'),
        height: 65,
        backgroundColor: colors.GREY.PRIMARY,
        borderTopWidth: 1,
        borderTopColor: '#BCBCBC'
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
        width: wp('90%') / 4,
        height: 20,
        paddingLeft: 5, paddingRight: 5,
        borderRadius: 5,
        borderWidth: 0.5,
    },
    main: {
        padding: 10,
        alignItems: 'center',
        width: wp('100%'),
        backgroundColor: colors.WHITE,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 70,
        borderBottomWidth: 0.5,
        borderBottomColor: '#DEDEDE'
    }
});