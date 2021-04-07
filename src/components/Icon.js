import React from 'react';
import { View, Text, ViewPropTypes, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

export default class Icon extends React.Component {
    static propTypes = {
        iconName: PropTypes.string,
        labelName: PropTypes.string,
        style: ViewPropTypes.style,
    }

    static defaultProps = {
        iconName: "add",
        labelName: "Demo",
    }

    render() {
        return(
            <TouchableOpacity onPress={this.props.onPress? this.props.onPress : null}>
                <View style={{alignItem: 'center'}}>
                    <Ionicons 
                        name={this.props.iconName}
                        size={26}
                        style={[this.props.style, {alignSelf: "center"}]}
                    />
                    <Text style={[{fontSize: 12, textAlign: 'center'}, this.props.textStyle]}>{this.props.labelName}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}