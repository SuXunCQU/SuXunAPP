import React from 'react';
import {View, Text, StyleSheet, Button, FlatList, RefreshControl, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../../redux/action';
import GlobalStyle from '../../../res/style/GlobalStyle';
import ListItem from '../../../components/ListItem';
import TaskItem from "../../../components/TaskView/TaskItem";
import NavigationUtil from '../../../utils/NavigationUtil';
import LinearGradient from "react-native-linear-gradient";

const {width, height, scale} = Dimensions.get("window");
const THEME_COLOR = 'red';
class JoinedTab extends React.Component{
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
            />
        )
    }

    render(){
        NavigationUtil.navigation = this.props.navigation;
        let {joinedList} = this.props;
        if(!joinedList){
            joinedList = {
                items: [],
                isLoading: false,
            }
        }
        return(
            <View style={styles.container}>
                <FlatList
                    data={joinedList.items}
                    renderItem={(data)=>this.renderItem(data)}
                    keyExtractor={(item)=> ""+item.lost_id}
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
            </View>
        )
    }
};
const mapStateToProps = (state) => ({
    joinedList: state.joinedList,
});
const mapDispatchToProps = (dispatch) => ({
    onLoadJoinedListData: (url) => dispatch(actions.onLoadJoinedListData(url)),
});
export default connect(mapStateToProps, mapDispatchToProps)(JoinedTab)

const styles = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00e0c7",
        paddingBottom: 70
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
        backgroundColor: "#00e0c7",
    }
});
