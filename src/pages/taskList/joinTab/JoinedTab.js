import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, RefreshControl } from 'react-native';
import {connect} from 'react-redux';
import actions from '../../../redux/action';
import GlobalStyle from '../../../res/style/GlobalStyle';
import ListItem from '../../../components/ListItem';
import NavigationUtil from '../../../utils/NavigationUtil';

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
            <ListItem
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
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
        flex: 1,
        width: "100%",
        backgroundColor: GlobalStyle.itemBaseColor
    }
});
