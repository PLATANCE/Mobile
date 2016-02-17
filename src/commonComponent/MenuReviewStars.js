'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class MenuReviewStars extends React.Component {
    static propTypes = {
        score: PropTypes.number.isRequired
    };

    render() {
        let {
            score
        } = this.props;

        /*
         * Style
         */
        let styles = StyleSheet.create({

        });

        return (
            <View>
                <Text>{score}</Text>
            </View>
        );
    }
}
