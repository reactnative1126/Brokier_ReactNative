import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import { colors } from "@constants/themes";
import { isEmpty, isCurrency } from "@utils/functions";
import Card from '../Card/Card';

export default PropertyDescription = ({ listing, loading }) => {
  const [detail, setDetail] = useState(false);
  const [description, setDescription] = useState(false);
  const [rooms, setRooms] = useState([]);

  const onShowMore = () => {
    loading();
    ListingsService.getDetailRooms(listing.mlsNumber)
      .then((rooms) => {
        setDescription(!description);
        setRooms(rooms);
        loading();
      });
  }

  return (
    <Card index='propertyDetail' style={styles.description}>
      <Text style={{ fontSize: 14, fontWeight: "bold" }}>{`Property Details:`}</Text>
      <View key='propertyDetail1' style={{ marginTop: 10 }} >
        <View key="neighborhood" style={{ flexDirection: "row", marginTop: 5 }} >
          <Text style={{ width: '40%', fontSize: 14 }}>{`Neighbourhood:`}</Text>
          <Text style={{ fontSize: 14 }}>{!isEmpty(listing.neighborhood) && listing.neighborhood}</Text>
        </View>
        <View key="type" style={{ flexDirection: "row", marginTop: 5 }} >
          <Text style={{ width: '40%', fontSize: 14 }}>{`Type:`}</Text>
          <Text style={{ fontSize: 14 }}>{!isEmpty(listing.propertyType) && listing.propertyType}</Text>
        </View>
        <View key="style" style={{ flexDirection: "row", marginTop: 5 }} >
          <Text style={{ width: '40%', fontSize: 14 }}>{`Style:`}</Text>
          <Text style={{ fontSize: 14 }}>{!isEmpty(listing.style) && listing.style}</Text>
        </View>
        <View key="lotSize" style={{ flexDirection: "row", marginTop: 5 }} >
          <Text style={{ width: '40%', fontSize: 14 }}>{`Lot Size:`}</Text>
          <Text style={{ fontSize: 14 }}>---</Text>
        </View>
        <View key="yearBuilt" style={{ flexDirection: "row", marginTop: 5 }} >
          <Text style={{ width: '40%', fontSize: 14 }}>{`Year Built:`}</Text>
          <Text style={{ fontSize: 14 }}>{!isEmpty(listing.detail.yearBuilt) && listing.detail.yearBuilt}</Text>
        </View>
        <View key="taxes" style={{ flexDirection: "row", marginTop: 5 }} >
          <Text style={{ width: '40%', fontSize: 14 }}>{`Taxes:`}</Text>
          <Text style={{ fontSize: 14 }}>{!isEmpty(listing.tax.annualAmount) && isCurrency(parseFloat(listing.tax.annualAmount) / 12)}</Text>
        </View>
        <View key="size" style={{ flexDirection: "row", marginTop: 5 }} >
          <Text style={{ width: '40%', fontSize: 14 }}>{`Size:`}</Text>
          <Text style={{ fontSize: 14 }}>{!isEmpty(listing.detail.sqft) && listing.detail.sqft + 'sqft'}</Text>
        </View>
        <View key="basement" style={{ flexDirection: "row", marginTop: 5 }} >
          <Text style={{ width: '40%', fontSize: 14 }}>{`Basement:`}</Text>
          <Text style={{ fontSize: 14 }}>---</Text>
        </View>
        <View key="laundry" style={{ flexDirection: "row", marginTop: 5 }} >
          <Text style={{ width: '40%', fontSize: 14 }}>{`Laundry:`}</Text>
          <Text style={{ fontSize: 14 }}>---</Text>
        </View>
      </View>
      {listing.propertyType === 'Condo Apt' || listing.propertyType === 'Condo Townhouse' ?
        <View key={20} style={{ marginTop: 10 }} >
          <View key="condo" style={{ flexDirection: "row", marginTop: 5 }} >
            <Text style={{ fontSize: 14, textDecorationLine: 'underline' }}>{`Condo`}</Text>
          </View>
          <View key="maintenance" style={{ flexDirection: "row", marginTop: 5 }} >
            <Text style={{ width: '40%', fontSize: 14 }}>{`Maintenance:`}</Text>
            <Text style={{ fontSize: 14 }}>{!isEmpty(listing.maintenance) && '$' + listing.maintenance}</Text>
          </View>
          <View key="exposure" style={{ flexDirection: "row", marginTop: 5 }} >
            <Text style={{ width: '40%', fontSize: 14 }}>{`Exposure:`}</Text>
            <Text style={{ fontSize: 14 }}>{!isEmpty(listing.condominium.exposure) && (
              listing.condominium.exposure == 'E' ? 'East' : listing.condominium.exposure == 'W' ? 'West' : listing.condominium.exposure == 'N' ? 'North' : listing.condominium.exposure == 'Ne' ? 'North East' : listing.condominium.exposure == 'Nw' ? 'North West' : listing.condominium.exposure == 'S' ? 'South' : listing.condominium.exposure == 'Se' ? 'South East' : listing.condominium.exposure == 'Sw' ? 'South West' : null
            )}</Text>
          </View>
          <View key="Locker" style={{ flexDirection: "row", marginTop: 5 }} >
            <Text style={{ width: '40%', fontSize: 14 }}>{`Locker:`}</Text>
            <Text style={{ fontSize: 14 }}>{!isEmpty(listing.condominium.locker) && listing.condominium.locker}</Text>
          </View>
          <View key="Balcony" style={{ flexDirection: "row", marginTop: 5 }} >
            <Text style={{ width: '40%', fontSize: 14 }}>{`Balcony:`}</Text>
            <Text style={{ fontSize: 14 }}>{!isEmpty(listing.detail.patio) && listing.detail.patio}</Text>
          </View>
          <View key="Amenlties" style={{ flexDirection: "row", marginTop: 5 }} >
            <Text style={{ width: '40%', fontSize: 14 }}>{`Amenlties:`}</Text>
            {listing.condominium.ammenities.split('#').map((item, key) => {
              !isEmpty(item) && <Text key={key} style={{ fontSize: 14, width: '30%' }}>{item}</Text>
            })}
          </View>
        </View> : null
      }

      {detail ?
        <React.Fragment>
          <View key='propertyDetail2' style={{ marginTop: 10 }} >
            <View key="Utilities" style={{ flexDirection: "row", marginTop: 5 }} >
              <Text style={{ fontSize: 14, textDecorationLine: 'underline' }}>{`Utilities`}</Text>
            </View>
            <View key="Heat" style={{ flexDirection: "row", marginTop: 5 }} >
              <Text style={{ width: '40%', fontSize: 14 }}>{`Heat:`}</Text>
              <Text style={{ fontSize: 14 }}>{!isEmpty(listing.detail.heating) && listing.detail.heating}</Text>
            </View>
            <View key="Hydro" style={{ flexDirection: "row", marginTop: 5 }} >
              <Text style={{ width: '40%', fontSize: 14 }}>{`Hydro:`}</Text>
              <Text style={{ fontSize: 14 }}>{!isEmpty(listing.hydroIncl) && (listing.hydroIncl == 'N' ? 'No' : 'Yes')}</Text>
            </View>
            <View key="AC" style={{ flexDirection: "row", marginTop: 5 }} >
              <Text style={{ width: '40%', fontSize: 14 }}>{`A/C:`}</Text>
              <Text style={{ fontSize: 14 }}>{!isEmpty(listing.detail.airConditioning) && listing.detail.airConditioning}</Text>
            </View>
            <View key="Water" style={{ flexDirection: "row", marginTop: 5 }} >
              <Text style={{ width: '40%', fontSize: 14 }}>{`Water:`}</Text>
              <Text style={{ fontSize: 14 }}>{!isEmpty(listing.waterIncl) && listing.waterIncl}</Text>
            </View>
          </View>
          <View key={20} style={{ marginTop: 10 }} >
            <View key="Building" style={{ flexDirection: "row", marginTop: 5 }} >
              <Text style={{ fontSize: 14, textDecorationLine: 'underline' }}>{`Building`}</Text>
            </View>
            <View key="Exterior" style={{ flexDirection: "row", marginTop: 5 }} >
              <Text style={{ width: '40%', fontSize: 14 }}>{`Exterior:`}</Text>
              <Text style={{ fontSize: 14 }}>{!isEmpty(listing.detail.exteriorConstruction1) && listing.detail.exteriorConstruction1}</Text>
            </View>
            <View key="Garage" style={{ flexDirection: "row", marginTop: 5 }} >
              <Text style={{ width: '40%', fontSize: 14 }}>{`Garage:`}</Text>
              <Text style={{ fontSize: 14 }}>{!isEmpty(listing.detail.garage) && listing.detail.garage}</Text>
            </View>
            <View key="Driveway" style={{ flexDirection: "row", marginTop: 5 }} >
              <Text style={{ width: '40%', fontSize: 14 }}>{`Driveway:`}</Text>
              <Text style={{ fontSize: 14 }}>{!isEmpty(listing.condominium.parkingType) && listing.condominium.parkingType}</Text>
            </View>
            <View key="ParkingSpaces" style={{ flexDirection: "row", marginTop: 5 }} >
              <Text style={{ width: '40%', fontSize: 14 }}>{`Parking Spaces:`}</Text>
              <Text style={{ fontSize: 14 }}>{!isEmpty(listing.numParkingSpaces) && listing.numParkingSpaces}</Text>
            </View>
            <View key="Furnished" style={{ flexDirection: "row", marginTop: 5 }} >
              <Text style={{ width: '40%', fontSize: 14 }}>{`Furnished:`}</Text>
              <Text style={{ fontSize: 14 }}>{!isEmpty(listing.detail.furnished) && listing.detail.furnished}</Text>
            </View>
          </View>
        </React.Fragment>
        : null}
      <TouchableOpacity style={{ marginTop: 10, marginBottom: 10 }} onPress={() => setDetail(!detail)}>
        <Text style={{ fontSize: 14, color: colors.BLUE.PRIMARY }}>
          {detail ? 'Show Less Details' : 'Show More Details'}
        </Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 14, fontWeight: "bold" }}>
        {`Property Description:`}
      </Text>
      <Text style={{ fontSize: 14 }}>
        {listing.detail.description}
      </Text>
      {(description && !isEmpty(rooms)) ?
        <View key={80}>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 10 }}>
            {`Extras:`}
          </Text>
          <Text style={{ fontSize: 14, marginTop: 10 }}>
            {listing.detail.extras}
          </Text>
          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 10 }}>{`Rooms and Sizes:`}</Text>
            {!isEmpty(rooms[0].description) &&
              <View key={81} style={styles.roomWrapper}>
                <Text style={{ width: '25%', textAlign: 'center' }}>{rooms[0].description}</Text>
                <Text style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[0].length) ? rooms[0].length : 0} X {!isEmpty(rooms[0].width) ? rooms[0].width : 0} ft</Text>
                <Text style={{ width: '45%', textAlign: 'center' }}>{rooms[0].features}</Text>
              </View>}
            {!isEmpty(rooms[1].description) &&
              <View key={82} style={styles.roomWrapper}>
                <Text style={{ width: '25%', textAlign: 'center' }}>{rooms[1].description}</Text>
                <Text style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[1].length) ? rooms[1].length : 0} X {!isEmpty(rooms[1].width) ? rooms[1].width : 0} ft</Text>
                <Text style={{ width: '45%', textAlign: 'center' }}>{rooms[1].features}</Text>
              </View>}
            {!isEmpty(rooms[2].description) &&
              <View key={83} style={styles.roomWrapper}>
                <Text style={{ width: '25%', textAlign: 'center' }}>{rooms[2].description}</Text>
                <Text style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[2].length) ? rooms[2].length : 0} X {!isEmpty(rooms[2].width) ? rooms[2].width : 0} ft</Text>
                <Text style={{ width: '45%', textAlign: 'center' }}>{rooms[2].features}</Text>
              </View>}
            {!isEmpty(rooms[3].description) &&
              <View key={84} style={styles.roomWrapper}>
                <Text style={{ width: '25%', textAlign: 'center' }}>{rooms[3].description}</Text>
                <Text style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[3].length) ? rooms[3].length : 0} X {!isEmpty(rooms[3].width) ? rooms[3].width : 0} ft</Text>
                <Text style={{ width: '45%', textAlign: 'center' }}>{rooms[3].features}</Text>
              </View>}
            {!isEmpty(rooms[4].description) &&
              <View key={85} style={styles.roomWrapper}>
                <Text style={{ width: '25%', textAlign: 'center' }}>{rooms[4].description}</Text>
                <Text style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[4].length) ? rooms[4].length : 0} X {!isEmpty(rooms[4].width) ? rooms[4].width : 0} ft</Text>
                <Text style={{ width: '45%', textAlign: 'center' }}>{rooms[4].features}</Text>
              </View>}
            {!isEmpty(rooms[5].description) &&
              <View key={86} style={styles.roomWrapper}>
                <Text style={{ width: '25%', textAlign: 'center' }}>{rooms[5].description}</Text>
                <Text style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[5].length) ? rooms[5].length : 0} X {!isEmpty(rooms[5].width) ? rooms[5].width : 0} ft</Text>
                <Text style={{ width: '45%', textAlign: 'center' }}>{rooms[5].features}</Text>
              </View>}
            {!isEmpty(rooms[6].description) &&
              <View key={87} style={styles.roomWrapper}>
                <Text style={{ width: '25%', textAlign: 'center' }}>{rooms[6].description}</Text>
                <Text style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[6].length) ? rooms[6].length : 0} X {!isEmpty(rooms[6].width) ? rooms[6].width : 0} ft</Text>
                <Text style={{ width: '45%', textAlign: 'center' }}>{rooms[6].features}</Text>
              </View>}
            {!isEmpty(rooms[7].description) &&
              <View key={88} style={styles.roomWrapper}>
                <Text style={{ width: '25%', textAlign: 'center' }}>{rooms[7].description}</Text>
                <Text style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[7].length) ? rooms[7].length : 0} X {!isEmpty(rooms[7].width) ? rooms[7].width : 0} ft</Text>
                <Text style={{ width: '45%', textAlign: 'center' }}>{rooms[7].features}</Text>
              </View>}
            {!isEmpty(rooms[8].description) &&
              <View key={89} style={styles.roomWrapper}>
                <Text style={{ width: '25%', textAlign: 'center' }}>{rooms[8].description}</Text>
                <Text style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[8].length) ? rooms[8].length : 0} X {!isEmpty(rooms[8].width) ? rooms[8].width : 0} ft</Text>
                <Text style={{ width: '45%', textAlign: 'center' }}>{rooms[8].features}</Text>
              </View>}
            {!isEmpty(rooms[9].description) &&
              <View key={90} style={styles.roomWrapper}>
                <Text style={{ width: '25%', textAlign: 'center' }}>{rooms[9].description}</Text>
                <Text style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[9].length) ? rooms[9].length : 0} X {!isEmpty(rooms[9].width) ? rooms[9].width : 0} ft</Text>
                <Text style={{ width: '45%', textAlign: 'center' }}>{rooms[9].features}</Text>
              </View>}
            {!isEmpty(rooms[10].description) &&
              <View key={91} style={styles.roomWrapper}>
                <Text style={{ width: '25%', textAlign: 'center' }}>{rooms[10].description}</Text>
                <Text style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[10].length) ? rooms[10].length : 0} X {!isEmpty(rooms[10].width) ? rooms[10].width : 0} ft</Text>
                <Text style={{ width: '45%', textAlign: 'center' }}>{rooms[10].features}</Text>
              </View>}
            {!isEmpty(rooms[11].description) &&
              <View key={92} style={styles.roomWrapper}>
                <Text style={{ width: '25%', textAlign: 'center' }}>{rooms[11].description}</Text>
                <Text style={{ width: '30%', textAlign: 'center' }}>{!isEmpty(rooms[11].length) ? rooms[11].length : 0} X {!isEmpty(rooms[11].width) ? rooms[11].width : 0} ft</Text>
                <Text style={{ width: '45%', textAlign: 'center' }}>{rooms[11].features}</Text>
              </View>}
          </View>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginTop: 10 }}>
            {`Listed By: Re/Max Realty Services`}
          </Text>
          <Text style={{ fontSize: 14, marginTop: 10 }}>
            {'This listing data is provided under copyright by the Toronto Real Estate Board. This listing data is deemed reliable but is not gauranteed accurate by the Toronto Real Estate Board or Brokier.'}
          </Text>
        </View>
        : null}
      <TouchableOpacity style={{ marginTop: 10, marginBottom: 10 }} onPress={() => onShowMore()}>
        <Text style={{ fontSize: 14, color: colors.BLUE.PRIMARY }}>
          {description ? 'Show Less' : 'Show More'}
        </Text>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  description: {
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  roomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%'
  }
});
