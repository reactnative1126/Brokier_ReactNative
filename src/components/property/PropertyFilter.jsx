import React, { useState, useEffect, Fragment } from "react";

import { isEmpty, isCurrency, isNumber } from "../../utils/functions";

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

const PropertyFilter = (props) => {

  const [loading, setLoading] = useState(false);
  const [allTypes, setAllTypes] = useState(window.filters.propertyType.allTypes);
  const [condoApartment, setCondoApartment] = useState(window.filters.propertyType.condoApartment);
  const [condoTown, setCondoTown] = useState(window.filters.propertyType.condoTown);
  const [detached, setDetached] = useState(window.filters.propertyType.detached);
  const [duplex, setDuplex] = useState(window.filters.propertyType.duplex);
  const [freeholdTown, setFreeholdTown] = useState(window.filters.propertyType.freeholdTown);
  const [land, setLand] = useState(window.filters.propertyType.land);
  const [multiFamily, setMultiFamily] = useState(window.filters.propertyType.multiFamily);
  const [semiDetached, setSemiDetached] = useState(window.filters.propertyType.semiDetached);
  const [minPrice, setMinPrice] = useState(window.filters.price.minPrice);
  const [maxPrice, setMaxPrice] = useState(window.filters.price.maxPrice);
  const [dayStatus, setDayStatus] = useState(false);
  const [daysOnMarket, setDaysOnMarket] = useState({
    value: window.filters.daysOnMarket,
    label: window.filters.daysOnMarket == 0 ? 'Any' : window.filters.daysOnMarket == 1 ? '1 Day' : window.filters.daysOnMarket == 3 ? '3 Days' : window.filters.daysOnMarket == 7 ? '7 Days' : window.filters.daysOnMarket == 14 ? '14 Days' : window.filters.daysOnMarket == 30 ? '30 Days' : '30+ Days'
  });
  const [soldStatus, setSoldStatus] = useState(false);
  const [soldInLast, setSoldInLast] = useState({
    value: window.filters.soldInLast,
    label: window.filters.soldInLast == 60 ? 'Any' : window.filters.soldInLast == 1 ? '1 Day' : window.filters.soldInLast == 7 ? '7 Days' : window.filters.soldInLast == 30 ? '30 Days' : window.filters.soldInLast == 90 ? '3 Months' : window.filters.soldInLast == 180 ? '6 Months' : window.filters.soldInLast == 365 ? '1 Year' : '2 Years'
  });
  const [bed, setBed] = useState(window.filters.rooms.bed);
  const [bath, setBath] = useState(window.filters.rooms.bath);
  const [garage, setGarage] = useState(window.filters.rooms.garage);
  const [parking, setParking] = useState(window.filters.rooms.parking);
  const [minSize, setMinSize] = useState(window.filters.size.minSize);
  const [maxSize, setMaxSize] = useState(window.filters.size.maxSize);
  const [minAge, setMinAge] = useState(window.filters.age.minAge);
  const [maxAge, setMaxAge] = useState(window.filters.age.maxAge);
  const [minCondo, setMinCondo] = useState(window.filters.condo.minCondo);
  const [maxCondo, setMaxCondo] = useState(window.filters.condo.maxCondo);
  const [locker, setLocker] = useState('Any');


  return (
    <Fragment>
      <div className='ft-wrapper' onClick={() => props.onClose()} />
      <div id='filter-container' className='ft-container'>
        {/* <div style={styles.header}>
          <div />
          <div style={styles.searchBar}>
            <span style={{ fontWeight: '500' }}>Filter Listings</span>
          </div>
          <Icon name="close" type="antdesign" size={25} onPress={() => {
            Alert.alert(
              'Discard changes and leave search filters?',
              'Your filter changes have not been applied yet.',
              [
                {
                  span: 'Cancel',
                  style: 'Cancel'
                },
                {
                  span: 'Discard',
                  onPress: props.onClose
                }
              ], { cancelable: false }
            )
          }} />
        </div> */}
        <div style={{ height: '100%', backgroundColor: 'white' }}>
          <div contentContainerStyle={{ marginTop: 10 }}>
            {/* <div index={11} style={{ width: wp('100%') - 20, marginLeft: 10 }}>
            <div style={styles.toggleButton}>
              <button onPress={props.ondiv}
                style={[styles.oneButton, { backgroundColor: props.div ? colors.WHITE : colors.GREY.PRIMARY }]}>
                <span>For Sale Listings</span>
              </button>
              <button onPress={props.ondiv}
                style={[styles.oneButton, { backgroundColor: !props.div ? colors.WHITE : colors.GREY.PRIMARY }]}>
                <span>Rent Listings</span>
              </button>
            </div>
          </div> */}

            {/* <div index={12} style={{ width: wp('100%') - 20, marginLeft: 10 }}>
            <div style={styles.propertyType}>
              <span style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Property Type</span>
              <div style={styles.types}>
                <button style={[styles.typeItem, { borderColor: allTypes ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
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
                  <span style={{ fontSize: 12 }}>All Types</span>
                </button>
                <button style={[styles.typeItem, { borderColor: detached ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(false);
                  setDetached(!detached);
                }}>
                  <span style={{ fontSize: 12 }}>Detached</span>
                </button>
                <button style={[styles.typeItem, { borderColor: semiDetached ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(false);
                  setSemiDetached(!semiDetached);
                }}>
                  <span style={{ fontSize: 12 }}>Semi-Detached</span>
                </button>
              </div>
              <div style={styles.types}>
                <button style={[styles.typeItem, { borderColor: freeholdTown ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(false);
                  setFreeholdTown(!freeholdTown);
                }}>
                  <span style={{ fontSize: 12, spanAlign: 'center' }}>Row/{'\n'}Freehold Town</span>
                </button>
                <button style={[styles.typeItem, { borderColor: condoTown ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(false);
                  setCondoTown(!condoTown);
                }}>
                  <span style={{ fontSize: 12 }}>Condo Town</span>
                </button>
                <button style={[styles.typeItem, { borderColor: condoApartment ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(false);
                  setCondoApartment(!condoApartment);
                }}>
                  <span style={{ fontSize: 12 }}>Condo Apartment</span>
                </button>
              </div>
              <div style={styles.types}>
                <button style={[styles.typeItem, { borderColor: duplex ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(false);
                  setDuplex(!duplex);
                }}>
                  <span style={{ fontSize: 12 }}>Duplex</span>
                </button>
                <button style={[styles.typeItem, { borderColor: multiFamily ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(false);
                  setMultiFamily(!multiFamily);
                }}>
                  <span style={{ fontSize: 12 }}>Multi-Family</span>
                </button>
                <button style={[styles.typeItem, { borderColor: land ? colors.BLACK : colors.GREY.PRIMARY }]} onPress={() => {
                  setAllTypes(false);
                  setLand(!land);
                }}>
                  <span style={{ fontSize: 12 }}>Land</span>
                </button>
              </div>
            </div>
          </div> */}

            {/* <div index={13} style={{ width: wp('100%') - 20, marginLeft: 10 }}>
            <div style={styles.propertyType}>
              <span style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Price Range</span>
              <div style={styles.range}>
                <div style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12 }}>{isCurrency(minPrice).split('.')[0]}</span>
                  <span style={{ fontSize: 12 }}>{isCurrency(maxPrice).split('.')[0]}{maxPrice == 5000000 && '+'}</span>
                </div>
                <div style={{ marginTop: -15, height: 50 }}>
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
                        <div style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: colors.WHITE, borderWidth: 1, borderColor: colors.BLACK }} />
                      )
                    }}
                  />
                </div>
              </div>
            </div>
          </div> */}

            {/* <div index={14} style={{ width: wp('100%') - 20, marginLeft: 10 }}>
            <div style={styles.picker}>
              <div>
                <span style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Days listings is on market:</span>
                <div style={styles.range1}>
                  <button style={styles.inputdiv} onPress={() => setDayStatus(true)}>
                    <div />
                    <span style={{ fontSize: 12 }}>{daysOnMarket.label}</span>
                    <Icon name='down' type='antdesign' size={14} color={colors.BLACK} />
                  </button>
                </div>
              </div>
              <div style={{ width: wp('40%') }}>
                <span style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Sold in the last:</span>
                <div style={styles.range1}>
                  <button style={styles.inputdiv} onPress={() => setSoldStatus(true)}>
                    <div />
                    <span style={{ fontSize: 12 }}>{soldInLast.label}</span>
                    <Icon name='down' type='antdesign' size={14} color={colors.BLACK} />
                  </button>
                </div>
              </div>
            </div>
          </div> */}

            {/* <div index={15} style={{ width: wp('100%') - 20, marginLeft: 10 }}>
            <div style={styles.propertyType}>
              <span style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Beds, Baths, Parking</span>
              <div style={styles.parking}>
                <div style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: wp('60%') }}>
                  <span style={{ width: 50 }}>Beds</span>
                  <button style={styles.roundButton} onPress={() => bed != 0 && setBed(bed - 1)}>
                    <Icon name="minus-a" type="fontisto" size={10} /></button>
                  <span>{bed}+</span>
                  <button style={styles.roundButton} onPress={() => setBed(bed + 1)}>
                    <Icon name="plus-a" type="fontisto" size={10} /></button>
                </div>
                <div style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: wp('60%'), marginTop: 5 }}>
                  <span style={{ width: 50 }}>Baths</span>
                  <button style={styles.roundButton} onPress={() => bath != 0 && setBath(bath - 1)}>
                    <Icon name="minus-a" type="fontisto" size={10} /></button>
                  <span>{bath}+</span>
                  <button style={styles.roundButton} onPress={() => setBath(bath + 1)}>
                    <Icon name="plus-a" type="fontisto" size={10} /></button>
                </div>
                <div style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: wp('60%'), marginTop: 5 }}>
                  <span style={{ width: 50 }}>Parking</span>
                  <button style={styles.roundButton} onPress={() => parking != 0 && setParking(parking - 1)}>
                    <Icon name="minus-a" type="fontisto" size={10} /></button>
                  <span>{parking}+</span>
                  <button style={styles.roundButton} onPress={() => setParking(parking + 1)}>
                    <Icon name="plus-a" type="fontisto" size={10} /></button>
                </div>
                <div style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: wp('60%'), marginTop: 5 }}>
                  <span style={{ width: 50 }}>Garage</span>
                  <button style={styles.roundButton} onPress={() => garage != 0 && setGarage(garage - 1)}>
                    <Icon name="minus-a" type="fontisto" size={10} /></button>
                  <span>{garage}+</span>
                  <button style={styles.roundButton} onPress={() => setGarage(garage + 1)}>
                    <Icon name="plus-a" type="fontisto" size={10} /></button>
                </div>
              </div>
            </div>
          </div> */}

            {/* <div index={16} style={{ width: wp('100%') - 20, marginLeft: 10 }}>
            <div style={styles.propertyType}>
              <span style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Size</span>
              <div style={styles.range}>
                <div style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12 }}>{minSize}Sqft</span>
                  <span style={{ fontSize: 12 }}>{maxSize}{maxSize == 5000 && '+'}Sqft</span>
                </div>
                <div style={{ marginTop: -10, height: 50 }}>
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
                        <div style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: colors.WHITE, borderWidth: 1, borderColor: colors.BLACK }} />
                      )
                    }}
                  />
                </div>
              </div>
            </div>
          </div> */}


            {/* <div index={17} style={{ width: wp('100%') - 20, marginLeft: 10 }}>
            <div style={styles.propertyType}>
              <span style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Age</span>
              <div style={styles.range}>
                <div style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12 }}>{minAge < 5 ? 'New Construction' : minAge + ' years old'}</span>
                  <span style={{ fontSize: 12 }}>{maxAge} years old</span>
                </div>
                <div style={{ marginTop: -10, height: 50 }}>
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
                        <div style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: colors.WHITE, borderWidth: 1, borderColor: colors.BLACK }} />
                      )
                    }}
                  />
                </div>
              </div>
            </div>
          </div> */}

            {/* <div index={18} style={{ width: wp('100%') - 20, marginLeft: 10 }}>
            <div style={styles.propertyType}>
              {props.div && <span style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10 }}>Condo Filters</span>}
              <div style={styles.range}>
                {props.div &&
                  <React.Fragment>
                    <div style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 12 }}>{isCurrency(minCondo).split('.')[0]}</span>
                      <span style={{ fontSize: 12 }}>Max HOA / Maintenance Fees</span>
                      <span style={{ fontSize: 12 }}>{isCurrency(maxCondo).split('.')[0]}{maxCondo == 5000 && '+'}</span>
                    </div>
                    <div style={{ marginTop: -10, height: 50 }}>
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
                            <div style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: colors.WHITE, borderWidth: 1, borderColor: colors.BLACK }} />
                          )
                        }}
                      />
                    </div>
                  </React.Fragment>}
                <span style={{ width: '100%', spanAlign: 'center', marginBottom: 5 }}>Locker / Storage</span>
                <div style={[styles.toggleButton, { marginBottom: 0, marginLeft: -35 }]}>
                  <button onPress={() => setLocker('Any')}
                    style={[styles.oneButton, { width: wp('30%'), backgroundColor: locker === 'Any' ? colors.WHITE : colors.GREY.PRIMARY }]}>
                    <span>Any</span>
                  </button>
                  <button onPress={() => setLocker('Yes')}
                    style={[styles.oneButton, { width: wp('30%'), backgroundColor: locker === 'Yes' ? colors.WHITE : colors.GREY.PRIMARY }]}>
                    <span>Yes</span>
                  </button>
                  <button onPress={() => setLocker('No')}
                    style={[styles.oneButton, { width: wp('30%'), backgroundColor: locker === 'No' ? colors.WHITE : colors.GREY.PRIMARY }]}>
                    <span>No</span>
                  </button>
                </div>
              </div>
            </div>
          </div> */}
            {/* <PropertyQuestions
            title="Keywords in Description"
            questions={questions} />
          <div style={{ height: 100 }} /> */}
          </div>
        </div>
        {/* <div style={styles.bottomButtons}>
        <button
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
          <span style={{ fontSize: 20, fontWeight: 'bold', color: colors.WHITE }}>CLEAR</span>
        </button>
        <button
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
          <span style={{ fontSize: 20, fontWeight: 'bold', color: colors.WHITE }}>APPLY FILTERS</span>
        </button>
      </div> */}
        {/* <button style={{ backgroundColor: '#00000050', width: wp('100%'), height: hp('100%') }} onPress={props.onClose} /> */}
        {/* {dayStatus ? <PickerButton data={days} one={daysOnMarket} onSelect={(item) => {
        setDaysOnMarket(item);
        setDayStatus(false);
      }} /> : null}
      {soldStatus ? <PickerButton data={solds} one={soldInLast} onSelect={(item) => {
        setSoldInLast(item);
        setSoldStatus(false);
      }} /> : null} */}
      </div>
    </Fragment>
  );
}

export default PropertyFilter;