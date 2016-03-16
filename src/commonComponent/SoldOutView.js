'use strict';
import React, {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';


export default class SoldOutView extends React.Component {

    render() {
        let {
            stock
        } = this.props;
        
        if (stock == 0) {
            return(
                <View style={styles.containerAlpha}>
                    <Text style={styles.textEng}>SOLD OUT</Text>
                    <Text style={styles.textKor}>금일 메뉴가 매진 되었습니다.</Text>
                </View>
            );
        } else {
            return(
                <View style={styles.container}>
                </View>
            );
        }
    }
}

/*
 * Style
 */
let styles = StyleSheet.create({
    containerAlpha: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    textEng: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
    },
    textKor: {
        color: 'white',
        marginTop: 10,
        fontSize: 17,
    },
});
