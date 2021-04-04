import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Label extends React.Component {
    constructor(props) {
        super(props);
        this.labelColor = [
            "#FF503F",
            "#FFD561",
            "#52BBFF",
            "#53FC96",
            "#9A9999",
        ];
        this.labelName = [
            "一级",
            "二级",
            "三级",
            "四级",
            "五级",
        ];
    }


    static propTypes = {
        level: PropTypes.number,
    }

    static defaultProps = {
        level: 1,
    }

    render() {
        const {level} = this.props;
        return(
            <View style={[styles.container, {backgroundColor: this.labelColor[level - 1]}]}>
                <Text style={{fontSize: 12, textAlign: 'center', color: '#fff'}}>{this.labelName[level - 1]}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: "#000",
        paddingHorizontal: 10,
        borderRadius: 20,
        width: 50,
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
    }
})
