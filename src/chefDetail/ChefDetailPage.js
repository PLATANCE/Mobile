'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, ScrollView, Image } from 'react-native';
import Color from '../const/Color';
import Const from '../const/Const';
import Separator from '../commonComponent/Separator';
import RequestURL from '../const/RequestURL';
import MediaURL from '../const/MediaURL';

export default class ChefDetailPage extends React.Component {
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
                console.log(responseData);
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
                        <Text style={styles.textBlack}>{chef.name_chef}</Text>
                        <Text style={styles.textGray}>{chef.career_summ}</Text>
                        <Separator />
                        <Text style={styles.textGray}>{chef.career}</Text>
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
        backgroundColor: Color.PRIMARY_BACKGROUND,
        marginTop: Const.MARGIN_TOP,
    },
    content: {
    },
    chefImage: {
        height: 400,
        resizeMode: 'contain',
    },
    chefInfoBox: {
        backgroundColor: 'white',
        padding: 10,
    },
    textBlack: {
        color: Color.PRIMARY_BLACK,
        lineHeight: 20,
        fontSize: 15,
    },
    textGray: {
        color: Color.PRIMARY_GRAY,
        lineHeight: 20,
    },

});
