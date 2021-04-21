import React from 'react';
import {View, Text, StyleSheet, Button, FlatList, RefreshControl, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../../redux/action';
import TaskItem from "../../../components/TaskView/TaskItem";
import NavigationUtil from '../../../utils/NavigationUtil';
import LinearGradient from "react-native-linear-gradient";
import {incident_data} from "../../../utils/mockUtils.new";
import {reqLogin, reqTask, reqTasksnIncidents} from "../../../api";
import JPush from "../../../components/jpush/JPush";
import Toast from "../../../utils/Toast";

const {width, height, scale} = Dimensions.get("window");
const THEME_COLOR = 'red';
class RecruitTab extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        console.log(this.props.token);
        if(this.props.token){
            console.log("已有token");
            const result = await reqTasksnIncidents();
            console.log(result);
            this.setState({
                incidents: result,
            })
        } else{
            const username = '17815252256';
            const password = 'asd123';
            const res = await reqLogin(username, password);
            // const res = {
            //     status: 0,
            //     token: 111
            // }
            console.log(res);
            if (res.status === 0) {
                this.props.setToken(res.token);
                const response = await reqTasksnIncidents();
                console.log("招募中列表请求成功");
                console.log(response);
                this.setState({
                    incidents: response.result,
                })
            } else {
                Toast.showTips("账号或密码不正确");
            }
        }
    }

    renderItem(data, index){
        const item = data.item;
        return(
            <TaskItem
                item={item}
                type={"recruit"}
            />
        )
    }

    render(){
        NavigationUtil.navigation = this.props.navigation;
        const {incidents, isLoading} = this.state;
        let recruitList = {
            items: incidents,
            isLoading
        }
        if(!incidents){
            recruitList = {
                items: [],
                isLoading
            }
        }
        console.log(recruitList);
        return(
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#00E0C7', '#009394']}
                style={styles.container}
            >
                <View style={{paddingVertical: 12, backgroundColor: "#dc0000", width: "100%", display: "flex", alignItems: "center"}}><Text>有最新救援任务！</Text></View>
                <FlatList
                    data={recruitList.items}
                    renderItem={(data, index)=>this.renderItem(data)}
                    keyExtractor={(item)=> ""+item.task_id}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={isLoading}
                            onRefresh={this.loadData}
                            tintColor={THEME_COLOR}
                        />
                    }
                    style={styles.list}
                    extraData={this.state}
                />
            </LinearGradient>
        )
    }
};
const mapStateToProps = (state) => ({
    token: state.user.token,
});
const mapDispatchToProps = (dispatch) => ({
    setToken: (token) => dispatch(actions.setToken(token))
})
export default connect(mapStateToProps, mapDispatchToProps)(RecruitTab)

const styles = StyleSheet.create({
    container: {
        height: height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00e0c7",
        // paddingBottom: 70
    },
    welcome:{
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    itemContainer:{
        marginBottom: 10
    },
    list:{
        height: "100%",
        width: "100%",
        marginBottom: 90,
    }
});
