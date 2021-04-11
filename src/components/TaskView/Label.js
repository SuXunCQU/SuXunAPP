import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Label extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {level} = this.props;
        return(
            <View style={[styles.container, {backgroundColor: this.props.labelColor}]}>
                <Text style={{fontSize: 12, textAlign: 'center', color: '#fff'}}>{this.props.labelName}</Text>
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
