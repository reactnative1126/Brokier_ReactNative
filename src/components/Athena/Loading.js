import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { colors } from '@constants/themes';

export default Loading = (props) => {
	return (
		<View style={styles.main}>
			<ActivityIndicator size="small" color='#FFF' />
		</View>
	)
};

const styles = StyleSheet.create({
	main: {
		display: props.loading ? 'flex' : 'none',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: wp('50%') - 20,
		marginBottom: 60,
		width: 40,
		height: 40,
		borderRadius: 5,
		backgroundColor: '#00000080',
		shadowColor: colors.BLACK,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1,
		elevation: 1,
	}
});