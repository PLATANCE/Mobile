'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet
} from 'react-native';

import Color from '../../const/Color';
import DropDown, {Select, Option, OptionList, updatePosition } from 'react-native-dropdown';
import Picker from 'react-native-picker';

export default class PaymentInfoRow extends React.Component {

    static propTypes = {
        headerText: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    };

    render() {
        let {
            headerText,
            data,
            type
        } = this.props;
        let test = [1, 2, 3, 4];

        switch (type) {
            case 'input':
                return (
                    <View style={styles.container}>
                        <Text style={styles.headerText}>{headerText}</Text>
                        <Text style={styles.data}>{data}</Text>
                        <Text style={styles.input}>></Text>
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
                        <Text style={styles.headerText}>{headerText}</Text>
                        <Picker style={{height:300}} showDuration={300} pickerData={[1, 2, 3, 4]} selectedValue={1}/>
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
        marginBottom: 1,
    },
    headerText: {
        paddingLeft: 5,
    },
    data: {
        flex: 4,
        textAlign: 'right',
        paddingRight: 5,
    },
    input: {
        width: 30,
        textAlign: 'center',
        paddingRight: 5,
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
