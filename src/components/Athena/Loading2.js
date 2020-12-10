import React from 'react';
import {ActivityIndicator, View, Modal } from 'react-native';

import { colors } from '@constants/themes';

export default Loading2 = (props) => {
	return (
		<Modal animationType="fade" transparent={true} visible={props.loading} >
			<View style={{ flex: 1, backgroundColor: '#00000080', justifyContent: 'center', alignItems: 'center' }}>
				<View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, justifyContent: "center" }}>
					<ActivityIndicator style={{ height: 80 }} size="large" color={colors.BLACK} />
				</View>
			</View>
		</Modal>
	)
};