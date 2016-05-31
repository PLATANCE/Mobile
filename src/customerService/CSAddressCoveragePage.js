'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, ListView, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';
import DeliveryCoverageList from './components/DeliveryCoverageList';
import {
  fetchDeliveryCoverage,
} from '../app/actions/CustomerServiceActions';

export default class CSAddressCoveragePage extends Component {
    constructor(props) {
        super(props);
        props.dispatch(fetchDeliveryCoverage());
    }
    render() {
        const {
            deliveryCoverage
        } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <View style={styles.header}>
                        <Text style={[Font.DEFAULT_FONT_BLACK_BOLD, {fontSize: normalize(17)}]}>배달 가능 지역</Text>
                    </View>
                    <DeliveryCoverageList deliveryCoverage={deliveryCoverage}/>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        height: normalize(50),
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: normalize(16),
    },
});