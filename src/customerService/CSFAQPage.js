'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, ListView, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';
import RequestURL from '../const/RequestURL';
import FAQList from './components/FAQList';


export default class CSFAQPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FAQ: [],
        }
    }
    componentDidMount() {
        this.fetchFAQList();
    }
    fetchFAQList() {
        fetch(RequestURL.REQUEST_FAQ_LIST)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    FAQ: responseData.FAQ,
                });
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <View style={styles.header}>
                        <Text style={[Font.DEFAULT_FONT_BLACK_BOLD, {fontSize: normalize(17)}]}>FAQ</Text>
                    </View>
                    <FAQList FAQ={this.state.FAQ} />
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