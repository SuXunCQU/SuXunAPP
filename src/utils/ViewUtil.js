import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ViewUtil {
    /**
     *
     * @param {Function} callback
     * @returns {Element}
     */
    static getLeftBackButton(callback) {
        return (
            <TouchableOpacity
                style={{padding: 8, paddingLeft: 12}}
                onPress={callback}
            >
                <Ionicons
                    name={'ios-arrow-back'}
                    size={26}
                    style={{color: '#000'}}
                />
            </TouchableOpacity>
        )
    }

    static getRightAddButton(callback) {
        return (
            <TouchableOpacity
                style={{padding: 8, paddingRight: 12}}
                onPress={callback}
            >
                <Ionicons
                    name={'add-circle-outline'}
                    size={26}
                    style={{color: '#000'}}
                />
            </TouchableOpacity>
        )
    }
}
