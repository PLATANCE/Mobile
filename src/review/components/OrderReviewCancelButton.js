'use strict';
import React, {
    PropTypes,
    View,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Color from '../../const/Color';
import Const from '../../const/Const';
import Font from '../../const/Font';

export default class OrderReviewCancelButton extends React.Component {
    static propTypes = {
        
    };
    constructor(props) {
        super(props);
    }
    
    render() {

        return (
            <TouchableHighlight style={styles.leftButton} onPress={Actions.pop} underlayColor={'transparent'}>
                <Image style={styles.image}
                    source={require('../../commonComponent/img/back_white.png')} />
            </TouchableHighlight>
        );
    }
}

let styles = StyleSheet.create({
    leftButton: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 20,
        height: 20,
    }
});
