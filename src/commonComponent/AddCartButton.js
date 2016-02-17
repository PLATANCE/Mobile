'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

export default class AddCartButton extends React.Component {
    render() {
        /*
         * Style
         */
        let styles = StyleSheet.create({

        });

        return (
            <View>
                <TouchableHighlight>
                    <View>
                        <Text>추가하기</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
