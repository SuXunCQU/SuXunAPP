import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Icon from '../../components/Icon';
import CluePage from './tabs/CluePage';
import NavigationUtil from '../../utils/NavigationUtil';
import {connect} from 'react-redux';

class CurrentTaskHomePage extends React.Component {
    render(){
        const {navigation} = this.props;
        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.welcome}>CurrentTaskPage</Text>
                    <Button
                        title={"修改主题"}
                        onPress={() => this.props.onThemeChange('red')}
                    />
                </View>
                <View style={styles.bottomNavigator}>
                    <Icon iconName="chatbubbles" labelName="对话" onPress={()=>{
                        navigation.navigate("MessagePage");
                    }}
                    />
                    <Icon iconName="md-newspaper" labelName="详情" onPress={()=>{
                        navigation.navigate("MainDetailPage", {data: this.props.detailItem});
                    }}/>
                    <Icon iconName="alert" labelName="线索" onPress={() => {
                        navigation.navigate("CluePage");
                    }}/>
                    <Icon iconName="md-megaphone" labelName="指令" onPress={() => {
                        navigation.navigate("OrderPage");
                    }}/>
                </View>
            </View>
        )
    }
};

const mapStateToProps = (state) => ({
    detailItem: state.taskItem.detailItem,
});
export default connect(mapStateToProps)(CurrentTaskHomePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    welcome:{
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    bottomNavigator:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 50,
        backgroundColor: GlobalStyle.baseColor,
        paddingTop: 5,
    }
});
