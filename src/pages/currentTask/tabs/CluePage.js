import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, RefreshControl } from 'react-native';
import {connect} from 'react-redux';
import actions from '../../../redux/action';
import GlobalStyle from '../../../res/style/GlobalStyle';
import MessageItem from '../../../components/MessageItem';
import clueList from '../../../res/data/clue.json';
import NavigationBar from '../../../components/NavigationBar';
import ViewUtil from '../../../utils/ViewUtil';
import NavigationUtil from '../../../utils/NavigationUtil';

const THEME_COLOR = "red";
export default class CluePage extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        // this.loadData();
    }

    loadData() {
        // console.log(this.props && this.props.clueList);
    }

    renderItem(data){
        const item = data.item;
        return(
            <MessageItem
                item={item}
            />
        )
    }

    onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }

    render(){
        if(!clueList){
            clueList = {
                items: [],
                isLoading: false,
            }
        }
        const {navigation} = this.props;
        let navigationBar = <NavigationBar
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            rightButton={ViewUtil.getRightAddButton(() => navigation.navigate("NewCluePage", {navigation: navigation}))}
            title={'线索'}
            style={styles.navigationBar}
        />
        return(
            <View style={styles.container}>
                {navigationBar}
                <FlatList
                    data={clueList}
                    renderItem={(data)=>this.renderItem(data)}
                    keyExtractor={(item)=> ""+item.clue_id}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={clueList.isLoading}
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
    },
    navigationBar: {
        backgroundColor: "#fff",
        elevation: 5,
        height: 50,
    },
});
