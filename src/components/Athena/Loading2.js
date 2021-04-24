import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, } from 'react-native';

import { colors } from '@constants/themes';

export default Loading2 = (props) => {
	return (
		<Modal animationType="fade" transparent={true} visible={props.loading} >
			<View style={styles.main}>
				<View style={styles.warpper}>
					<ActivityIndicator style={{ height: 80 }} size="large" color={colors.BLACK} />
				</View>
			</View>
		</Modal>
	)
};

const styles = StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00000080',
	},
	warpper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: "center",
		alignItems: 'center'
	}
});