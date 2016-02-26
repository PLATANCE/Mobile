'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, ScrollView, Image } from 'react-native';
import Toolbar from '../commonComponent/Toolbar';
import Color from '../const/Color';
import Separator from '../commonComponent/Separator';

export default class ChefDetailPage extends React.Component {


    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
                <Toolbar leftIcon={this.props.toolbar.leftIcon} text={this.props.toolbar.text} rightIcon={this.props.toolbar.rightIcon}/>
                <View style={styles.content}>
                    <Image style={styles.chefImage}
                        source={{uri: this.props.chef.url}} />
 
                    <View style={styles.chefInfoBox}>
                        <Text style={styles.textColorBlack}>{this.props.chef.name}</Text>
                        <Text style={styles.textColorGray}>{this.props.chef.career}</Text>
                        <Separator />
                        <Text style={styles.textColorGray}>{this.props.chef.summary}</Text>
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
    },
    content: {
        margin: 10,
    },
    chefImage: {
        height: 400,
        resizeMode: 'cover',
    },
    chefInfoBox: {
        backgroundColor: 'white',
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
    },
    textColorBlack: {
        color: Color.PRIMARY_BLACK,
    },
    textColorGray: {
        color: Color.PRIMARY_GRAY,
    },

});
