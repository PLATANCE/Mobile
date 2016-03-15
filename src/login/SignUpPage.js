'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, Image, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Color from '../const/Color';
import Const from '../const/Const';


export default class SignUpPage extends React.Component {
    

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.header}>
                        <Text style={styles.textWhite}>Name</Text>
                    </View>
                    <TextInput style={styles.textInput}/>
                </View>
                <View style={styles.row}>
                    <View style={styles.header}>
                        <Text style={styles.textWhite}>Email</Text>
                    </View>
                    <TextInput style={styles.textInput}/>
                </View>
                <View style={styles.row}>
                    <View style={styles.header}>
                        <Text style={styles.textWhite}>Password</Text>
                    </View>
                    <TextInput style={styles.textInput}/>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        height: 50,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignSelf: 'stretch',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        overflow: 'hidden',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        alignSelf: 'stretch',
    },
    header: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: 100,
    },
    textInput: {
        flex: 1,
    },
    textWhite: {
        fontSize: 16,
    }
});
