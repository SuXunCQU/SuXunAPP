import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions, PermissionsAndroid, Alert, TextInput} from 'react-native';
import JPush from '../../components/jpush/JPush'
import ajax from "../../api/ajax";
import DataStore from "../../expand/dao/DataStore";
import { MapView } from "react-native-amap3d";
import RNLocation from 'react-native-location';
import NavigationUtil from '../../utils/NavigationUtil';
import {connect} from 'react-redux';
import Icon from "../../components/Icon";
import Entypo from "react-native-vector-icons/Entypo";
import {reqPhoto} from "../../api";

RNLocation.configure({
    distanceFilter: 5, // Meters
})

const GDKEY = "ba37a34a8bbf80e97c285b9ab129ca26";
const {width, height, scale} = Dimensions.get("window");
class CurrentTaskHomePage extends React.Component {
    static navigationOptions = {
        title: "绘制折线",
    }

    constructor(props) {
        super(props);
        this.messageCount = 0;
        this.dataStore = new DataStore();
        this.state = {
            center: null,
            location: null,
            // 用户自身的路径
            coordinates: [],
            clueBadgeOpacity: 1,
            detailBadgeOpacity: 1,
            orderBadgeOpacity: 1,
            chatBadgeOpacity: 1,
            // 获取的路径
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
            clue_markers: [{
                "coordinate":{
                    "latitude": 29.71628,
                    "longitude": 106.64223,
                },
                "title": "重庆西站"
            }],
            polylines: [],
            marker_polylines: [],
        }
    }

    async componentDidMount() {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);
        console.log("组件已挂载")

        await RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
                detail: "coarse"
            }
        }).then(async (granted) => {
            if (granted) {
                this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
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
                    console.log("订阅成功");
                });
                const latestLocation = await RNLocation.getLatestLocation({ timeout: 60000 });
                this.setState(()=>({
                    center: {
                        latitude: latestLocation.latitude,
                        longitude: latestLocation.longitude,
                    }
                }))
                // const result = await latestLocation
                //
                //     .then((latestLocation) => {
                //         // Use the location here
                //         console.log("获取中心成功");
                //         this.setState(()=>({
                //             center: {
                //                 latitude: latestLocation.latitude,
                //                 longitude: latestLocation.longitude,
                //             }
                //         }))
                //
                //     })
            }})
        this.mockPaths();

        const item = this.props && this.props.joinedList && this.props.joinedList.item;
        const response = await reqPhoto(`${item.lostinfo.incident_id}.jpg`);
        this.setState({
            "photoBase64": `data:image/jpg;base64,${response.result}`,
        })
    }

    componentWillUnmount() {
        // 解除订阅
        this.locationSubscription();
    }

    _onPressAddCoordinate = () => {
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

    _onLocation = (location) => {
        const {latitude, longitude} = location;
        this.setState((prevState) => {
            let coordinates = JSON.parse(
                JSON.stringify(prevState.coordinates)
            )
            if(latitude !==0 && longitude !== 0){
                coordinates.push({latitude, longitude});
            }
            // console.log(location);
            return {location, coordinates};
        })
    }

    mockPaths = async () => {
        let locations = ['重庆西站', '重庆北站', '西南大学', '枫香湖儿童公园', '恒大酒店'];
        for(let i = 0; i < locations.length; i++){
            let results = await ajax(`https://restapi.amap.com/v3/place/text?keywords=${locations[i]}&city=chongqing&offset=20&page=1&key=${GDKEY}&extensions=all&output=JSON`);
            await this.drawPath(results.pois[0].location, "member");
        }

    }

    drawPath = async (coordinate, type) => {
        // console.log(coordinate);
        const url = `https://restapi.amap.com/v3/direction/walking?origin=${this.state.center.longitude},${this.state.center.latitude}&destination=${coordinate}&output=JSON&key=${GDKEY}`;
        const res = await this.dataStore.fetchData(url);
        // console.log(res);
        const response = res.data;
        const data = response.data ? response.data.data : response;
        if(data.status === "1"){
            console.log("保存中");
            this.dataStore.saveData(url, res);
        }
        const steps = data.route.paths[0].steps;
        const polylines = [];
        steps.map((item, index) => {
            let polyline = item.polyline.split(";");
            polylines.push(...polyline);
        });
        const _polylines = [];
        polylines.map((item) => {
            let polyline = item.split(",");
            _polylines.push({
                "latitude": parseFloat(polyline[1]),
                "longitude": parseFloat(polyline[0]),
            })
        })
        if(type === "member"){
            this.setState(()=>({
                "polylines": [...this.state.polylines, _polylines],
            }))
        }
        else if(type === "marker"){
            // console.log(_polylines)
            this.setState(()=>({
                "marker_polylines": _polylines,
            }))
        }

    }

    markerOnPress = async (coordinate) => {
        const param = `${coordinate.longitude},${coordinate.latitude}`;
        this.drawPath(param, "marker");
    }


    render(){
        const {navigation} = this.props;
        const {center, marker_polylines} = this.state;
        // console.log(marker_polylines);
        return(
            <View style={styles.container}>
                {/*地图*/}
                <View style={styles.mapContainer}>
                    {/*<Button*/}
                    {/*    title={"增加通知"}*/}
                    {/*    onPress={() => {*/}
                    {/*        JPush.addLocalNotification({*/}
                    {/*            "messageID": `${this.messageCount++}`,*/}
                    {/*            "title": `测试通知${this.messageCount}`,*/}
                    {/*            "content": `测试内容${this.messageCount}`,*/}
                    {/*        })*/}
                    {/*    }}*/}
                    {/*/>*/}
                    {/*<WebView source={{uri: "https://m.amap.com/navi/?start=116.403124,39.940693&dest=116.481488,39.990464&destName=阜通西&naviBy=car&key=e42246aad47931d04c21276d03fcaac3"}}/>*/}
                    {center ? (
                            <MapView
                                locationEnabled
                                center={{
                                    "latitude": center.latitude,
                                    "longitude": center.longitude,
                                }}
                                zoomLevel={15}
                                style={styles.mapContainer}
                                onLocation={this._onLocation}
                            >
                                {/* 画线部分 */}
                                {this.state.location ?
                                    <MapView.Polyline
                                        gradient
                                        width={3}
                                        color={'#2196f3'}
                                        coordinates={this.state.coordinates}
                                    /> : null
                                }
                                {
                                    this.state.polylines ?
                                        this.state.polylines.map((item, index) => {
                                            return <MapView.Polyline
                                                gradient
                                                width={4}
                                                color={'#8e44ad'}
                                                coordinates={item}
                                                key={index}
                                            />
                                        })
                                    : null
                                }
                                {/*  标记部分  */}
                                {this.state.clue_markers && this.state.clue_markers.length ?
                                    this.state.clue_markers.map((item, index) => {
                                        return <MapView.Marker title={item.title} coordinate={item.coordinate} key={index} onPress={() => this.markerOnPress(item.coordinate)}/>
                                    })
                                    : null
                                }
                                {
                                    this.state.marker_polylines && this.state.marker_polylines.length ? (
                                            <MapView.Polyline
                                                gradient
                                                width={3}
                                                color={'#27ae60'}
                                                coordinates={this.state.marker_polylines}
                                            />
                                    ) : null
                                }
                            </MapView>
                    ) : null}

                </View>

                <View style={styles.bottomNavigator}>
                    <View>
                        <View style={{
                            opacity: this.state.chatBadgeOpacity,
                            width: 13,
                            height: 13,
                            justifyContent: "center",
                            position: 'absolute',
                            zIndex: 9,
                            backgroundColor: "#FB3768",
                            borderRadius: 6,
                            right: -3,
                            top: -1,
                        }}>
                            <Text style={[{fontSize: 10, color: "#fff", textAlign: "center",}]}>8</Text>
                        </View>
                        <Icon iconName="chatbubbles" labelName="对话" style={{color: "#00e0c7",}} textStyle={{color: "#00e0c7"}} onPress={()=>{
                            this.setState({
                                chatBadgeOpacity: 0,
                            })
                            navigation.navigate("MessagePage");
                        }}/>
                    </View>
                    <View>
                        <View style={{
                            opacity: this.state.detailBadgeOpacity,
                            width: 13,
                            height: 13,
                            justifyContent: "center",
                            position: 'absolute',
                            zIndex: 9,
                            backgroundColor: "#FB3768",
                            borderRadius: 6,
                            right: -3,
                            top: -1,
                        }}>
                            <Text style={[{fontSize: 10, color: "#fff", textAlign: "center",}]}>1</Text>
                        </View>
                        <Icon iconName="md-newspaper" labelName="详情" style={{color: "#00e0c7"}} textStyle={{color: "#00e0c7"}} onPress={()=>{
                            this.setState({
                                detailBadgeOpacity: 0,
                            })
                            navigation.navigate("MainDetailPage", {data: this.props.detailItem, photoBase64: this.state.photoBase64});
                        }}/>
                    </View>
                    <View>
                        <View style={{
                            opacity: this.state.clueBadgeOpacity,
                            width: 13,
                            height: 13,
                            justifyContent: "center",
                            position: 'absolute',
                            zIndex: 9,
                            backgroundColor: "#FB3768",
                            borderRadius: 6,
                            right: -3,
                            top: -1,
                        }}>
                            <Text style={[{fontSize: 10, color: "#fff", textAlign: "center",}]}>7</Text>
                        </View>
                        <Icon iconName="alert" labelName="线索" style={{color: "#00e0c7"}} textStyle={{color: "#00e0c7"}} onPress={() => {
                            this.setState({
                                clueBadgeOpacity: 0,
                            })
                            navigation.navigate("CluePage");
                        }}/>
                    </View>
                    <View>
                        <View style={{
                            opacity: this.state.orderBadgeOpacity,
                            width: 13,
                            height: 13,
                            justifyContent: "center",
                            position: 'absolute',
                            zIndex: 9,
                            backgroundColor: "#FB3768",
                            borderRadius: 6,
                            right: -3,
                            top: -1,
                        }}>
                            <Text style={[{fontSize: 10, color: "#fff", textAlign: "center",}]}>3</Text>
                        </View>
                        <Icon iconName="md-megaphone" labelName="指令" style={{color: "#00e0c7"}} textStyle={{color: "#00e0c7"}} onPress={() => {
                            this.setState({
                                orderBadgeOpacity: 0,
                            })
                            navigation.navigate("OrderPage");
                        }}/>
                    </View>
                    <View>
                        <Icon iconName="md-megaphone" labelName="人脸比对" style={{color: "#00e0c7"}} textStyle={{color: "#00e0c7"}} onPress={() => {
                            navigation.navigate("FaceRecogPage");
                        }}/>
                    </View>
                </View>
            </View>
        )
    }
};

const mapStateToProps = (state) => ({
    detailItem: state.taskItem.detailItem,
    joinedList: state.joinedList,
});
export default connect(mapStateToProps)(CurrentTaskHomePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fefefe",
        borderBottomColor: "pink",
    },
    welcome:{
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    bottomNavigator:{
        position: "absolute",
        bottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 0.9 * width,
        height: 50,
        paddingTop: 5,
        borderRadius: 25,
        backgroundColor: "#fff",
        elevation: 4,
    },
    mapContainer:{
        flex: 1,
        width: "100%",
    },
    buttonContainer:{
        width,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    button: {
        borderWidth: 1,
        borderColor: '#000000',
        margin: 5,
        padding: 5,
        width: '70%',
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
    },

});
