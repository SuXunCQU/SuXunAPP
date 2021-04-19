import React from 'react';
import {View, Text, StyleSheet, Button, FlatList, RefreshControl, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../../redux/action';
import TaskItem from "../../../components/TaskView/TaskItem";
import NavigationUtil from '../../../utils/NavigationUtil';
import LinearGradient from "react-native-linear-gradient";
import {incident_data} from "../../../utils/mockUtils.new";

const {width, height, scale} = Dimensions.get("window");
const THEME_COLOR = 'red';
class RecruitTab extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const {onLoadJoinedListData} = this.props;
        const url = '../res/data/data.json';
        onLoadJoinedListData(url);
        console.log(this.props && this.props.joinedList);
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
        let joinedList = {
            items: incident_data.items,
            isLoading: false,
        }
        return(
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#00E0C7', '#009394']}
                style={styles.container}
            >
                <FlatList
                    data={joinedList.items}
                    renderItem={(data)=>this.renderItem(data)}
                    keyExtractor={(item)=> ""+item.incident_id}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={joinedList.isLoading}
                            onRefresh={()=>this.loadData()}
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
    joinedList: state.joinedList,
});
const mapDispatchToProps = (dispatch) => ({
    onLoadJoinedListData: (url) => dispatch(actions.onLoadJoinedListData(url)),
});
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
