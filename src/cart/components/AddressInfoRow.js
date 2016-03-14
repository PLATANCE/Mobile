'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
} from 'react-native';

import Color from '../../const/Color';
import DropDown, { Select, Option, OptionList, updatePosition } from 'react-native-dropdown';


export default class PaymentInfoRow extends React.Component {

    static propTypes = {
        headerText: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    };
    
    render() {
        let {
            headerText,
            data,
            type,
            marginStyle
        } = this.props;

        switch (type) {
            case 'input':
                return (
                    <View style={[styles.container, marginStyle]}>
                    <Text style={styles.headerText}>{headerText}</Text>
                    <Text style={styles.data}>{data}</Text>
                    
                </View>
                );
            case 'radio':
                return (
                    <View style={styles.container}>
                        <Text style={styles.headerText}>{headerText}</Text>
                        <Select>
                            <Option>1</Option>
                            <Option>2</Option>
                            <Option>3</Option>
                        </Select>
                    </View>
                );
            case 'picker':
                return (
                    <View style={styles.container}>

                    </View>
                );
        }
    }
}


let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
    },
    headerText: {
        color: Color.PRIMARY_BLACK,
    },
    data: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 5,
        color: Color.PRIMARY_BLACK,
    },
    iconImage: {
        width: 10,
        height: 10,
    },
    radio: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    option: {
        width: 5,
        height: 5,
    }
});
