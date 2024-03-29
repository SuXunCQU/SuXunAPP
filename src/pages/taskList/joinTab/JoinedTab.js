import React from 'react';
import {View, Text, StyleSheet, Button, FlatList, RefreshControl, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../../redux/action';
import TaskItem from "../../../components/TaskView/TaskItem";
import NavigationUtil from '../../../utils/NavigationUtil';
import LinearGradient from "react-native-linear-gradient";

const {width, height, scale} = Dimensions.get("window");
const THEME_COLOR = 'red';
class JoinedTab extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imageObjs: [

            ]
        };
    }

    renderItem(data){
        const item = data.item;
        return(
            <TaskItem
                item={item}
            />
        )
    }

    componentDidMount() {
        console.log("JoinList Mounted");
        console.log(this.props.user.member_id);
        this.props.loadJoinedListData(this.props.user.member_id);
    }

    render(){
        NavigationUtil.navigation = this.props.navigation;
        let {joinedList} = this.props;
        joinedList.isLoading = false;
        console.log("joinedList: ", joinedList);
        if(!joinedList){
            joinedList = {
                items: [],
                isLoading: false,
            }
        }
        return(
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#88d6c0', '#88e7bd']}
                style={styles.container}
            >
                <FlatList
                    data={joinedList && joinedList.items}
                    renderItem={(data)=>this.renderItem(data)}
                    keyExtractor={(item) => {
                        return item && item.task_id;
                    }}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={joinedList.isLoading}
                            tintColor={THEME_COLOR}
                        />
                    }
                    style={styles.list}
                />
            </LinearGradient>
        )
    }
};
const mapStateToProps = (state) => ({
    user: state.user,
    joinedList: state.joinedList,
});

const mapDispatchToProps = (dispatch) => ({
    loadJoinedListData: (member_id) => dispatch(actions.onLoadJoinedListData(member_id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinedTab)

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
