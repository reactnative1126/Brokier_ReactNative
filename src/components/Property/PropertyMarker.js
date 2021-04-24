import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { Icon } from "react-native-elements";
import { colors } from "@constants/themes";
import MarkerDetail from './MarkerDetail';

export default PropertyMarker = (props) => {
  const [unitsAll, setUnitAll] = useState(false);
  const { listings, likes, navigation, onLogin, onLike, onShare } = props;

  return (listings.length == 1 ?
    <View style={{ height: (hp('100%') - 100) / 3 + 30, backgroundColor: colors.WHITE }}>
      <MarkerDetail listing={listings[0]} likes={likes} navigation={navigation} onLogin={onLogin} onLike={() => onLike(listings[0].id)} onShare={() => onShare(listings[0].id)} />
    </View> :
    <View style={unitsAll ? { position: 'absolute', top: 0, height: hp('100%'), paddingTop: 50, backgroundColor: colors.WHITE } : { height: (hp('100%') - 100) / 3 + 60, backgroundColor: colors.WHITE }}>
      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: wp('100%'), height: 30, paddingLeft: 10 }} onPress={() => setUnitAll(!unitsAll)}>
        <Icon name={unitsAll ? "down" : "up"} type="antdesign" size={25} />
        <Text>{listings.length} Units ({unitsAll ? 'Click to close' : 'Click to view all'})</Text>
        <View style={{ width: 30 }} />
      </TouchableOpacity>
      {
        unitsAll ?
          <ScrollView>
            {listings.map((item, key) => {
              return (
                <View key={key} style={{ paddingBottom: 7 }}>
                  <MarkerDetail listing={item} likes={likes} navigation={navigation} onLogin={onLogin} onLike={() => onLike(item.id)} onShare={() => onShare(item.id)} />
                </View>
              )
            })}
            <View style={{ height: 2 }} />
          </ScrollView>
          :
          <MarkerDetail listing={listings[0]} likes={likes} navigation={navigation} onLogin={onLogin} onLike={() => onLike(listings[0].id)} onShare={() => onShare(listings[0].id)} />
      }
    </View>
  );
}
