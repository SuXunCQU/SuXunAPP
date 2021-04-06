import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions, Alert, PermissionsAndroid} from 'react-native';
import { MapView } from "react-native-amap3d";
import RNLocation from 'react-native-location';
import Icon from '../../components/Icon';
import CluePage from './tabs/CluePage';
import NavigationUtil from '../../utils/NavigationUtil';
import {connect} from 'react-redux';
import GlobalStyle from "../../res/style/GlobalStyle";

const {width, height, scale} = Dimensions.get("window");
class CurrentTaskHomePage extends React.Component {
    static navigationOptions = {
        title: "绘制折线",
    }

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            lines : [
                {
                    "position": [
                        {
                            latitude: 40.006901,
                            longitude: 116.097972,
                        },
                        {
                            latitude: 40.006901,
                            longitude: 116.597972,
                        },
                    ]
                },
                {
                    "position" : [
                        {
                            latitude: 39.906901,
                            longitude: 116.097972,
                        },
                        {
                            latitude: 39.906901,
                            longitude: 116.597972,
                        },
                    ]
                },
                {
                    "position" : [
                        {
                            latitude: 39.806901,
                            longitude: 116.097972,
                        },
                        {
                            latitude: 39.806901,
                            longitude: 116.257972,
                        },
                        {
                            latitude: 39.806901,
                            longitude: 116.457972,
                        },
                        {
                            latitude: 39.806901,
                            longitude: 116.597972,
                        },
                    ]
                },
            ],
        }
    }

    async componentDidMount() {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);

        await RNLocation.configure({
            distanceFilter: 5.0
        })

        await RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
                detail: "coarse"
            }
        }).then(granted => {
            if (granted) {
                this.locationSubscription = RNLocation.subscribeToLocationUpdates((locations) => {
                    /* Example location returned
                    {
                      speed: -1,
                      longitude: -0.1337,
                      latitude: 51.50998,
                      accuracy: 5,
                      heading: -1,
                      altitude: 0,
                      altitudeAccuracy: -1
                      floor: 0
                      timestamp: 1446007304457.029,
                      fromMockProvider: false
                    }
                    */
                    this.location
                    console.log(locations)
                })
                console.log("订阅成功");
            }
        })

        console.log("组件已挂载")
    }



    _onPress = () => {
        this.setState((prevState) => {
            let lines = JSON.parse(
                JSON.stringify(prevState.lines)
            )
            let size = lines.length;
            for(let i = 0; i < size; i++){
                let position_size = lines[i].position.length;
                let latitude = lines[i].position[position_size - 1].latitude + 0.01;
                let longitude = lines[i].position[position_size - 1].longitude + 0.01;
                try{
                    lines[i].position.push({latitude, longitude});
                } catch(e){
                    console.log(e);
                }
            }
            return {lines};
        })


    }

    render(){
        const {navigation} = this.props;
        return(
            <View style={styles.container}>
                {/*地图*/}
                <View style={styles.mapContainer}>
                    <MapView
                        center={{
                            latitude: 39.91095,
                            longitude: 116.37296
                        }}
                        style={styles.mapContainer}
                    >
                        <MapView.Polyline
                            width={5}
                            color="rgba(255, 0, 0, 0.5)"
                            coordinates={this.state.lines[0].position}
                        />
                        <MapView.Polyline
                            dashed
                            width={5}
                            coordinates={this.state.lines[1].position}
                        />
                        <MapView.Polyline
                            gradient
                            width={5}
                            colors={['#f44336', '#2196f3', '#4caf50']}
                            onPress={this._onPress}
                            coordinates={this.state.lines[2].position}
                        />
                    </MapView>
                    <Button title={"增加坐标"} onPress={this._onPress}/>
                </View>
                <View style={styles.bottomNavigator}>
                    <Icon iconName="chatbubbles" labelName="对话" onPress={()=>{
                        navigation.navigate("MessagePage");
                    }}
                    />
                    <Icon iconName="md-newspaper" labelName="详情" onPress={()=>{
                        navigation.navigate("MainDetailPage", {data: this.props.detailItem});
                    }}/>
                    <Icon iconName="alert" labelName="线索" onPress={() => {
                        navigation.navigate("CluePage");
                    }}/>
                    <Icon iconName="md-megaphone" labelName="指令" onPress={() => {
                        navigation.navigate("OrderPage");
                    }}/>
                </View>
            </View>
        )
    }
};

const mapStateToProps = (state) => ({
    detailItem: state.taskItem.detailItem,
});
export default connect(mapStateToProps)(CurrentTaskHomePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    welcome:{
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    bottomNavigator:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width,
        height: 50,
        backgroundColor: GlobalStyle.baseColor,
        paddingTop: 5,
        borderTopWidth: 1 / scale,
        borderColor: "#e8e8e8",
    },
    mapContainer:{
        flex: 1,
        width: "100%",
    }
});
