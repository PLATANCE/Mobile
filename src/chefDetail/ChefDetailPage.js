'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, Image } from 'react-native';
import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';
import Separator from '../commonComponent/Separator';
import RequestURL from '../const/RequestURL';
import MediaURL from '../const/MediaURL';

export default class ChefDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chef: [],
        }
    }
    componentDidMount() {
        this.fetchChefDetail();
    }
    fetchChefDetail() {
        fetch(RequestURL.REQUEST_CHEF_DETAIL + "chef_idx=" + this.props.chefIdx)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    chef: responseData[0],
                });
            })
            .catch((error) => {
                console.warn(error);
            })
            .done();
    }
    render() {
        let chef = this.state.chef;
        let chefURL = MediaURL.CHEF_URL + chef.image_url_chef2;
        return (
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image style={styles.chefImage}
                        source={{uri: chefURL}} />
                    <View style={styles.chefInfoBox}>
                        <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>{chef.name_chef}</Text>
                        <Text style={[styles.textGray, Font.DEFAULT_FONT_GRAY]}>{chef.career_summ}</Text>
                        <Separator />
                        <Text style={[styles.textGray, Font.DEFAULT_FONT_GRAY]}>{chef.career}</Text>
                    </View>
                </View>
            </View>
            </ScrollView>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
    },
    chefImage: {
        height: normalize(400),
        resizeMode: 'contain',
    },
    chefInfoBox: {
        backgroundColor: 'white',
        padding: normalize(10),
    },
    textBlack: {
        lineHeight: normalize(20),
        fontSize: normalize(15),
    },
    textGray: {
        lineHeight: normalize(20),
    },

});
