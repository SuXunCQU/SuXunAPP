import React from 'react';
import {View, Text, StyleSheet, Button, Image, TouchableOpacity} from 'react-native';
import GlobalStyle from '../res/style/GlobalStyle';
import NavigationUtil from "../utils/NavigationUtil";
import NavigationBar from './NavigationBar'
import ViewUtil from '../utils/ViewUtil';
import LineProgressBar from "./LineProgressBar";

export default class ItemDetailPage extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        let navigationBar = <NavigationBar
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            title={'任务详情'}
            style={styles.navigationBar}
        />

        const {data} = this.props.navigation.state.params;
        const lostTimestamp = new Date().getTime(); // 模仿数据中的timestamp
        const lostTime = new Date(lostTimestamp);
        return (
            <View style={styles.container}>
            {navigationBar}
                {!data ? <Text>无详情信息</Text>:
                    <View style={styles.detailContainer}>
                        <View style={styles.topContainer}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image} source={{uri: 'logo512'}}/>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>姓名：{data.lost_name}</Text>
                                <Text style={styles.text}>性别：{data.lost_gender}</Text>
                                <Text style={styles.text}>年龄：{data.lost_age}</Text>
                                <Text style={styles.text}>身高：</Text>
                                <Text style={styles.text}>身形：</Text>
                            </View>
                        </View>
                        <View style={styles.bottomContainer}>
                            <View style={styles.detail}>
                                <Text>{`走失时间：${lostTime.getFullYear()}-${lostTime.getMonth() + 1}-${lostTime.getDate()} ${lostTime.getHours()}:${lostTime.getMinutes()}:${lostTime.getSeconds()}`}</Text>
                                <Text>走失地点：{data.lost_location}</Text>
                                <Text>身份证号码：{data.identification_number}</Text>
                                <Text>是否有精神疾病：{data.isPhycho ? '是' : '否'}</Text>
                            </View>
                            <View style={styles.progress}>
                                <LineProgressBar />
                            </View>
                            <View style={styles.phoneNumber}>
                                <View style={styles.phoneNumberItem}>
                                    <Text style={styles.name}>指挥员：</Text>
                                    <Text style={styles.number}>13145687691</Text>
                                </View>
                                <View style={styles.phoneNumberItem}>
                                    <Text style={styles.name}>警方：</Text>
                                    <Text style={styles.number}>110</Text>
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button}><Text>完成</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.button}><Text>加入</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }


            </View>
        )
    }

    onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    detailContainer:{
        width: "100%",
        height: "100%",
    },
    topContainer:{
        flex: 2,
        flexDirection: 'row',
    },
    bottomContainer:{
        flex: 5,
        justifyContent: "flex-start",
        margin: 10,
        marginTop: 20,
    },
    imageContainer:{
        flex:1,
    },
    image:{
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        margin: 10,
        borderWidth: 1,
        borderColor: "#000"
    },
    textContainer:{
        flex: 1,
        paddingTop: 10,
        paddingLeft: 30,
    },
    text:{
        marginBottom: 10,
    },
    navigationBar: {
        backgroundColor: "#fff",
        elevation: 5,
        height: 50,
    },
    detail:{
        marginHorizontal: 10,
        marginBottom: 5,
    },
    progress:{
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "grey",
        padding: 10,
    },
    phoneNumber:{
        borderTopWidth: 1,
        borderColor: "grey",
        marginTop: 5,
    },
    phoneNumberItem:{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "grey",
        paddingVertical: 10,
    },
    name:{
        flex: 1,
    },
    number:{
        flex: 4,
    },
    buttonContainer:{
        marginTop: 20,
        marginBottom: 50,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    button:{
        borderWidth: 1,
        backgroundColor: GlobalStyle.baseColor,
        width: 50,
        alignItems: "center",
        borderRadius: 10,
    }
});
