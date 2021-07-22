import React from 'react';
import {View, Text, StyleSheet, Button, FlatList, RefreshControl, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../../redux/action';
import TaskItem from "../../../components/TaskView/TaskItem";
import NavigationUtil from '../../../utils/NavigationUtil';
import LinearGradient from "react-native-linear-gradient";
import store from '../../../redux/store';
import {reqTasksnIncidents} from "../../../api";

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
        console.log(store.getState());
    }

    loadData(){
        console.log(this.props.user);
        if(this.props.token){
            this.props.loadRecruitListData();
        }
    }

    renderItem(data){
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
        const {incidents} = this.props;
        const {isLoading} = this.state;
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
        return(
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#88d6c0', '#88e7bd']}
                style={styles.container}
            >
                <View style={{paddingVertical: 12, backgroundColor: "#ff3333", width: "100%", display: "flex", alignItems: "center"}}><Text style={{color: "#fefefe"}}>有最新救援任务！</Text></View>
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
    user: state.user,
    token: state.user.token,
    incidents: state.recruitList.items,
});
const mapDispatchToProps = (dispatch) => ({
    setToken: (token) => dispatch(actions.setToken(token)),
    loadRecruitListData: () => dispatch(actions.loadRecruitListData()),
})
export default connect(mapStateToProps, mapDispatchToProps)(RecruitTab)

const styles = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00e0c7",
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
    }
});
