'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, ScrollView, Image } from 'react-native';
import Color from '../const/Color';
import Const from '../const/Const';
import Separator from '../commonComponent/Separator';

export default class ChefDetailPage extends React.Component {


    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image style={styles.chefImage}
                        source={{uri: this.props.chef.url}} />
 
                    <View style={styles.chefInfoBox}>
                        <Text style={styles.textBlack}>{this.props.chef.name}</Text>
                        <Text style={styles.textGray}>{this.props.chef.affiliation}</Text>
                        <Separator />
                        <Text style={styles.textGray}>{this.props.chef.summary}</Text>
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
        resizeMode: 'cover',
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
