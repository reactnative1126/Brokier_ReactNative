import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TouchableHighlight, Modal, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import RangeSelector from 'reactnative-range-selector';

import { Icon } from "react-native-elements";
import { colors } from "@constants/themes";
import { isCurrency } from "@utils/functions";
import Header from '../Header/Header';
import Card from '../Card/Card';
import PickerButton from '../Buttons/PickerButton';
import PropertyQuestions from './PropertyQuestions';

const days = [
  { value: 0, label: 'Any' },
  { value: 1, label: '1 Day' },
  { value: 3, label: '3 Days' },
  { value: 7, label: '7 Days' },
  { value: 14, label: '14 Days' },
  { value: 30, label: '30 Days' },
  { value: 31, label: '30+ Days' },
];
const solds = [
  { value: 1, label: '1 Day' },
  { value: 7, label: '7 Days' },
  { value: 30, label: '30 Days' },
  { value: 90, label: '3 Months' },
  { value: 180, label: '6 Months' },
  { value: 365, label: '1 Year' },
  { value: 730, label: '2 Years' },
];
const questions = [
  { question: "Investors" },
  { question: "As is" },
  { question: "Fully renovated" },
]

export default PropertyFilter = (props) => {
  const [allTypes, setAllTypes] = useState(global.filters.propertyType.allTypes);
  const [condoApartment, setCondoApartment] = useState(global.filters.propertyType.condoApartment);
  const [condoTown, setCondoTown] = useState(global.filters.propertyType.condoTown);
  const [detached, setDetached] = useState(global.filters.propertyType.detached);
  const [duplex, setDuplex] = useState(global.filters.propertyType.duplex);
  const [freeholdTown, setFreeholdTown] = useState(global.filters.propertyType.freeholdTown);
  const [land, setLand] = useState(global.filters.propertyType.land);
  const [multiFamily, setMultiFamily] = useState(global.filters.propertyType.multiFamily);
  const [semiDetached, setSemiDetached] = useState(global.filters.propertyType.semiDetached);
  const [minPrice, setMinPrice] = useState(global.filters.price.minPrice);
  const [maxPrice, setMaxPrice] = useState(global.filters.price.maxPrice);
  const [dayStatus, setDayStatus] = useState(false);
  const [daysOnMarket, setDaysOnMarket] = useState({
    value: global.filters.daysOnMarket,
    label: global.filters.daysOnMarket == 0 ? 'Any' : global.filters.daysOnMarket == 1 ? '1 Day' : global.filters.daysOnMarket == 3 ? '3 Days' : global.filters.daysOnMarket == 7 ? '7 Days' : global.filters.daysOnMarket == 14 ? '14 Days' : global.filters.daysOnMarket == 30 ? '30 Days' : '30+ Days'
  });
  const [soldStatus, setSoldStatus] = useState(false);
  const [soldInLast, setSoldInLast] = useState({
    value: global.filters.soldInLast,
    label: global.filters.soldInLast == 60 ? 'Any' : global.filters.soldInLast == 1 ? '1 Day' : global.filters.soldInLast == 7 ? '7 Days' : global.filters.soldInLast == 30 ? '30 Days' : global.filters.soldInLast == 90 ? '3 Months' : global.filters.soldInLast == 180 ? '6 Months' : global.filters.soldInLast == 365 ? '1 Year' : '2 Years'
  });
  const [bed, setBed] = useState(global.filters.rooms.bed);
  const [bath, setBath] = useState(global.filters.rooms.bath);
  const [garage, setGarage] = useState(global.filters.rooms.garage);
  const [parking, setParking] = useState(global.filters.rooms.parking);
  const [minSize, setMinSize] = useState(global.filters.size.minSize);
  const [maxSize, setMaxSize] = useState(global.filters.size.maxSize);
  const [minAge, setMinAge] = useState(global.filters.age.minAge);
  const [maxAge, setMaxAge] = useState(global.filters.age.maxAge);
  const [minCondo, setMinCondo] = useState(global.filters.condo.minCondo);
  const [maxCondo, setMaxCondo] = useState(global.filters.condo.maxCondo);
  const [locker, setLocker] = useState('Any');

  return (
    <Modal visible={props.visible} animationType="none" swipeArea={50} transparent={true}>
      <Header style={{ backgroundColor: colors.GREY.PRIMARY, paddingLeft: 10, paddingRight: 10 }}>
        <View style={styles.header}>
          <View />
          <View style={styles.searchBar}>
            <Text style={{ fontWeight: '500' }}>{`Filter Listings`}</Text>
          </View>
          <Icon name="close" type="antdesign" size={25} onPress={() => {
            Alert.alert(
              'Discard changes and leave search filters?',
              'Your filter changes have not been applied yet.',
              [
                {
                  text: 'Cancel',
                  style: 'Cancel'
                },
                {
                  text: 'Discard',
                  onPress: props.onClose
                }
              ], { cancelable: false }
            )
          }} />
        </View>
      </Header>
      <View style={{ height: hp('100%') - 250, backgroundColor: colors.WHITE }}>
        <ScrollView contentContainerStyle={{ marginTop: 10 }}>
          <Card index={11} style={{ width: wp('100%') - 20, marginLeft: 10 }}>
            <View style={styles.toggleButton}>
              <TouchableOpacity onPress={props.onView}
                style={[styles.oneButton, { backgroundColor: props.view ? colors.WHITE : colors.GREY.PRIMARY }]}>
                <Text>{`For Sale Listings`}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={props.onView}
                style={[styles.oneButton, { backgroundColor: !props.view ? colors.WHITE : colors.GREY.PRIMARY }]}>
                <Text>{`Rent Listings`}</Text>
              </TouchableOpacity>
            </View>
          </Card>

          <Card index={12} style={{ width: wp('100%') - 20, marginLeft: 10 }}>
            <View style={styles.propertyType}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>{`Property Type`}</Text>
              <View style={styles.types}>
                <TouchableOpacity style={[styles.typeItem, { borderColor: allTypes ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(!allTypes);
                  setDetached(false);
                  setSemiDetached(false);
                  setFreeholdTown(false);
                  setCondoTown(false);
                  setCondoApartment(false);
                  setDuplex(false);
                  setMultiFamily(false);
                  setLand(false);
                }}>
                  <Text style={{ fontSize: 12 }}>{`All Types`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.typeItem, { borderColor: detached ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(false);
                  setDetached(!detached);
                }}>
                  <Text style={{ fontSize: 12 }}>{`Detached`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.typeItem, { borderColor: semiDetached ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(false);
                  setSemiDetached(!semiDetached);
                }}>
                  <Text style={{ fontSize: 12 }}>{`Semi-Detached`}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.types}>
                <TouchableOpacity style={[styles.typeItem, { borderColor: freeholdTown ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(false);
                  setFreeholdTown(!freeholdTown);
                }}>
                  <Text style={{ fontSize: 12, textAlign: 'center' }}>Row/{'\n'}Freehold Town</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.typeItem, { borderColor: condoTown ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(false);
                  setCondoTown(!condoTown);
                }}>
                  <Text style={{ fontSize: 12 }}>{`Condo Town`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.typeItem, { borderColor: condoApartment ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(false);
                  setCondoApartment(!condoApartment);
                }}>
                  <Text style={{ fontSize: 12 }}>{`Condo Apartment`}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.types}>
                <TouchableOpacity style={[styles.typeItem, { borderColor: duplex ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(false);
                  setDuplex(!duplex);
                }}>
                  <Text style={{ fontSize: 12 }}>{`Duplex`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.typeItem, { borderColor: multiFamily ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(false);
                  setMultiFamily(!multiFamily);
                }}>
                  <Text style={{ fontSize: 12 }}>{`Multi-Family`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.typeItem, { borderColor: land ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(false);
                  setLand(!land);
                }}>
                  <Text style={{ fontSize: 12 }}>{`Land`}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>

          <Card index={13} style={{ width: wp('100%') - 20, marginLeft: 10 }}>
            <View style={styles.propertyType}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>{`Price Range`}</Text>
              <View style={styles.range}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  {/* <Text style={{ fontSize: 12 }}>${isNumber(minPrice)}</Text>
                    <Text style={{ fontSize: 12 }}>${isNumber(maxPrice)}</Text> */}
                  <Text style={{ fontSize: 12 }}>{isCurrency(minPrice).split('.')[0]}</Text>
                  <Text style={{ fontSize: 12 }}>{isCurrency(maxPrice).split('.')[0]}{maxPrice == 5000000 && '+'}</Text>
                </View>
                <View style={{ marginTop: -15, height: 50 }}>
                  <RangeSelector
                    min={0}
                    max={5000000}
                    defaultMin={minPrice}
                    defaultMax={maxPrice}
                    onMoveChange={({ min, max }) => {
                      setMinPrice(min);
                      setMaxPrice(max);
                    }}
                    backgroundBarStyle={{
                      backgroundColor: colors.GREY.SECONDARY,
                      height: 8
                    }}
                    frontBarStyle={{
                      backgroundColor: '#00000090',
                      height: 8
                    }}
                    getSlider={() => {
                      return (
                        <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: colors.WHITE, borderWidth: 1, borderColor: colors.BLACK }} />
                      )
                    }}
                  />
                </View>
              </View>
            </View>
          </Card>

          <Card index={14} style={{ width: wp('100%') - 20, marginLeft: 10 }}>
            <View style={styles.picker}>
              <View>
                <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>{`Days listings is on market:`}</Text>
                <View style={styles.range1}>
                  <TouchableOpacity style={styles.inputView} onPress={() => setDayStatus(true)}>
                    <View />
                    <Text style={{ fontSize: 12 }}>{daysOnMarket.label}</Text>
                    <Icon name='down' type='antdesign' size={14} color={colors.BLACK} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ width: wp('40%') }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Sold in the last:</Text>
                <View style={styles.range1}>
                  <TouchableOpacity style={styles.inputView} onPress={() => setSoldStatus(true)}>
                    <View />
                    <Text style={{ fontSize: 12 }}>{soldInLast.label}</Text>
                    <Icon name='down' type='antdesign' size={14} color={colors.BLACK} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Card>

          <Card index={15} style={{ width: wp('100%') - 20, marginLeft: 10 }}>
            <View style={styles.propertyType}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>{`Beds, Baths, Parking`}</Text>
              <View style={styles.parking}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: wp('60%') }}>
                  <Text style={{ width: 50 }}>Beds</Text>
                  <TouchableOpacity style={styles.roundButton} onPress={() => bed != 0 && setBed(bed - 1)}>
                    <Icon name="minus-a" type="fontisto" size={10} /></TouchableOpacity>
                  <Text>{bed}+</Text>
                  <TouchableOpacity style={styles.roundButton} onPress={() => setBed(bed + 1)}>
                    <Icon name="plus-a" type="fontisto" size={10} /></TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: wp('60%'), marginTop: 5 }}>
                  <Text style={{ width: 50 }}>Baths</Text>
                  <TouchableOpacity style={styles.roundButton} onPress={() => bath != 0 && setBath(bath - 1)}>
                    <Icon name="minus-a" type="fontisto" size={10} /></TouchableOpacity>
                  <Text>{bath}+</Text>
                  <TouchableOpacity style={styles.roundButton} onPress={() => setBath(bath + 1)}>
                    <Icon name="plus-a" type="fontisto" size={10} /></TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: wp('60%'), marginTop: 5 }}>
                  <Text style={{ width: 50 }}>Parking</Text>
                  <TouchableOpacity style={styles.roundButton} onPress={() => parking != 0 && setParking(parking - 1)}>
                    <Icon name="minus-a" type="fontisto" size={10} /></TouchableOpacity>
                  <Text>{parking}+</Text>
                  <TouchableOpacity style={styles.roundButton} onPress={() => setParking(parking + 1)}>
                    <Icon name="plus-a" type="fontisto" size={10} /></TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: wp('60%'), marginTop: 5 }}>
                  <Text style={{ width: 50 }}>Garage</Text>
                  <TouchableOpacity style={styles.roundButton} onPress={() => garage != 0 && setGarage(garage - 1)}>
                    <Icon name="minus-a" type="fontisto" size={10} /></TouchableOpacity>
                  <Text>{garage}+</Text>
                  <TouchableOpacity style={styles.roundButton} onPress={() => setGarage(garage + 1)}>
                    <Icon name="plus-a" type="fontisto" size={10} /></TouchableOpacity>
                </View>
              </View>
            </View>
          </Card>

          <Card index={16} style={{ width: wp('100%') - 20, marginLeft: 10 }}>
            <View style={styles.propertyType}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Size</Text>
              <View style={styles.range}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12 }}>{minSize}Sqft</Text>
                  <Text style={{ fontSize: 12 }}>{maxSize}{maxSize == 5000 && '+'}Sqft</Text>
                </View>
                <View style={{ marginTop: -10, height: 50 }}>
                  <RangeSelector
                    min={0}
                    max={5000}
                    defaultMin={minSize}
                    defaultMax={maxSize}
                    onMoveChange={({ min, max }) => {
                      setMinSize(parseInt(min));
                      setMaxSize(parseInt(max));
                    }}
                    backgroundBarStyle={{
                      backgroundColor: colors.GREY.SECONDARY,
                      height: 8
                    }}
                    frontBarStyle={{
                      backgroundColor: '#00000090',
                      height: 8
                    }}
                    getSlider={() => {
                      return (
                        <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: colors.WHITE, borderWidth: 1, borderColor: colors.BLACK }} />
                      )
                    }}
                  />
                </View>
              </View>
            </View>
          </Card>


          <Card index={17} style={{ width: wp('100%') - 20, marginLeft: 10 }}>
            <View style={styles.propertyType}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Age</Text>
              <View style={styles.range}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12 }}>{minAge < 5 ? 'New Construction' : minAge + ' years old'}</Text>
                  <Text style={{ fontSize: 12 }}>{maxAge} {`years old`}</Text>
                </View>
                <View style={{ marginTop: -10, height: 50 }}>
                  <RangeSelector
                    min={0}
                    max={100}
                    defaultMin={minAge}
                    defaultMax={maxAge}
                    onMoveChange={({ min, max }) => {
                      setMinAge(min);
                      setMaxAge(max);
                    }}
                    backgroundBarStyle={{
                      backgroundColor: colors.GREY.SECONDARY,
                      height: 8
                    }}
                    frontBarStyle={{
                      backgroundColor: '#00000090',
                      height: 8
                    }}
                    getSlider={() => {
                      return (
                        <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: colors.WHITE, borderWidth: 1, borderColor: colors.BLACK }} />
                      )
                    }}
                  />
                </View>
              </View>
            </View>
          </Card>

          <Card index={18} style={{ width: wp('100%') - 20, marginLeft: 10 }}>
            <View style={styles.propertyType}>
              {props.view && <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>{`Condo Filters`}</Text>}
              <View style={styles.range}>
                {props.view &&
                  <React.Fragment>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 12 }}>{isCurrency(minCondo).split('.')[0]}</Text>
                      <Text style={{ fontSize: 12 }}>{`Max HOA / Maintenance Fees`}</Text>
                      <Text style={{ fontSize: 12 }}>{isCurrency(maxCondo).split('.')[0]}{maxCondo == 5000 && '+'}</Text>
                    </View>
                    <View style={{ marginTop: -10, height: 50 }}>
                      <RangeSelector
                        min={0}
                        max={5000}
                        defaultMin={minCondo}
                        defaultMax={maxCondo}
                        onMoveChange={({ min, max }) => {
                          setMinCondo(min);
                          setMaxCondo(max);
                        }}
                        backgroundBarStyle={{
                          backgroundColor: colors.GREY.SECONDARY,
                          height: 8
                        }}
                        frontBarStyle={{
                          backgroundColor: '#00000090',
                          height: 8
                        }}
                        getSlider={() => {
                          return (
                            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: colors.WHITE, borderWidth: 1, borderColor: colors.BLACK }} />
                          )
                        }}
                      />
                    </View>
                  </React.Fragment>}
                <Text style={{ width: '100%', textAlign: 'center', marginBottom: 5 }}>{`Locker / Storage`}</Text>
                <View style={[styles.toggleButton, { marginBottom: 0, marginLeft: -35 }]}>
                  <TouchableOpacity onPress={() => setLocker('Any')}
                    style={[styles.oneButton, { width: wp('30%'), backgroundColor: locker === 'Any' ? colors.WHITE : colors.GREY.PRIMARY }]}>
                    <Text>Any</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setLocker('Yes')}
                    style={[styles.oneButton, { width: wp('30%'), backgroundColor: locker === 'Yes' ? colors.WHITE : colors.GREY.PRIMARY }]}>
                    <Text>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setLocker('No')}
                    style={[styles.oneButton, { width: wp('30%'), backgroundColor: locker === 'No' ? colors.WHITE : colors.GREY.PRIMARY }]}>
                    <Text>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Card>
          <PropertyQuestions
            title="Keywords in Description"
            questions={questions} />
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
      <View style={styles.bottomButtons}>
        <TouchableHighlight
          style={styles.clearButton}
          onPress={() => props.onClearFilters({
            type: null,
            lastStatus: null,
            propertyType: {
              allTypes: false,
              condoApartment: false,
              condoTown: false,
              detached: false,
              duplex: false,
              freeholdTown: false,
              land: false,
              multiFamily: false,
              semiDetached: false,
            },
            price: {
              minPrice: 0,
              maxPrice: 5000000,
            },
            daysOnMarket: 0,
            soldInLast: 90,
            rooms: {
              bed: 0,
              bath: 0,
              garage: 0,
              parking: 0,
            },
            size: {
              minSize: 0,
              maxSize: 5000,
            },
            age: {
              minAge: 0,
              maxAge: 100,
            },
            condo: {
              minCondo: 0,
              maxCondo: 5000
            }
          }, false)}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.WHITE }}>{`CLEAR`}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.applyButton}
          onPress={() => props.onAppleFilters({
            type: null,
            lastStatus: null,
            propertyType: {
              allTypes: allTypes,
              detached: detached,
              semiDetached: semiDetached,
              freeholdTown: freeholdTown,
              condoTown: condoTown,
              condoApartment: condoApartment,
              duplex: duplex,
              multiFamily: multiFamily,
              land: land
            },
            price: {
              minPrice: minPrice,
              maxPrice: maxPrice
            },
            daysOnMarket: daysOnMarket.value,
            soldInLast: soldInLast.value,
            rooms: {
              bed: bed,
              bath: bath,
              parking: parking,
              garage: garage
            },
            size: {
              minSize: minSize,
              maxSize: maxSize
            },
            age: {
              minAge: minAge,
              maxAge: maxAge
            },
            condo: {
              minCondo: minCondo,
              maxCondo: maxCondo
            }
          }, true)}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.WHITE }}>{`APPLY FILTERS`}</Text>
        </TouchableHighlight>
      </View>
      <TouchableOpacity style={{ backgroundColor: '#00000050', width: wp('100%'), height: hp('100%') }} onPress={props.onClose} />
      {dayStatus ? <PickerButton data={days} one={daysOnMarket} onSelect={(item) => {
        setDaysOnMarket(item);
        setDayStatus(false);
      }} /> : null}
      {soldStatus ? <PickerButton data={solds} one={soldInLast} onSelect={(item) => {
        setSoldInLast(item);
        setSoldStatus(false);
      }} /> : null}
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 35,
    paddingTop: 15
  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('100%') - 20,
    height: 25,
    backgroundColor: colors.GREY.PRIMARY,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  oneButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('50%') - 16,
    height: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 2
  },
  propertyType: {
    width: wp('100%') - 60,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  types: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  typeItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (wp('100%') - 40) / 3,
    height: 35,
    borderWidth: 1,
    borderColor: colors.GREY.SECONDARY
  },
  range: {
    marginLeft: 30,
    marginBottom: 5
  },
  range1: {
    marginLeft: 10,
    marginBottom: 5
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('100%') - 20,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('35%'),
    height: 20,
    paddingLeft: 5, paddingRight: 5,
    borderRadius: 5,
    borderWidth: 0.5,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 160,
    width: wp('100%'),
    height: 50,
  },
  clearButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('30%'),
    height: 50,
    backgroundColor: '#BCBCBC'
  },
  applyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('70%'),
    height: 50,
    backgroundColor: colors.RED.PRIMARY
  },
  parking: {
    alignItems: 'center'
  },
  roundButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 0.5,
  }
});

