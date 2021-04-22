import React from 'react';
import {View, Text, StyleSheet, Button, FlatList, RefreshControl, Dimensions} from 'react-native';
import MessageItem from '../../../../components/MessageItem';
import NavigationBar from '../../../../components/NavigationBar';
import ViewUtil from '../../../../utils/ViewUtil';
import NavigationUtil from '../../../../utils/NavigationUtil';
import {connect} from 'react-redux';
import actions from '../../../../redux/action';
import {clue_data} from '../../../../utils/mockUtils';
import {reqQueryClueByKey, reqQueryTaskMemberByKey} from "../../../../api";

const THEME_COLOR = "red";
const {width, height, scale} = Dimensions.get("window");
class CluePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    async componentDidMount() {
        const clues = await this.loadCluesData();
        const members = await this.loadMembersData();
        console.log(clues);
        console.log(members);
        this.setState({
            clues: clues.result,
            members: members.result,
        })
    }

    loadCluesData() {
        const task_id = 2;
        return reqQueryClueByKey(task_id).then((response) => {
            return response;
        })
    }

    loadMembersData() {
        const task_id = 2;
        return reqQueryTaskMemberByKey(task_id).then((response) => {
            return response;
        })
    }

    queryNameById(array, id){
        const size = array.length;
        for(let i = 0; i < size; i++){
            if(array[i].member_id === id)
                return array[i].member_name;
        }
        return "";
    }

    renderItem(data){
        const item = data.item;
        item.member_name = this.queryNameById(this.state.members, item.member_id);
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
        const {navigation} = this.props;
        let {clues} = this.state;
        if(!clues)
            clues = [];
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
                    data={clues}
                    renderItem={(data)=>this.renderItem(data)}
                    keyExtractor={(item)=> ""+item.clue_id}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            onRefresh={()=>this.loadData()}
                            tintColor={THEME_COLOR}
                        />
                    }
                    style={styles.list}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    task_id: state.taskItem.task_id,
})
export default connect(mapStateToProps)(CluePage);

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
