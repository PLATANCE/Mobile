'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

export default class MenuReviewStars extends React.Component {
    static propTypes = {
        score: PropTypes.number.isRequired
    };

    render() {
        let {
            score
        } = this.props;

        var scoreStar = [];
        for(var i = 0; i < 5; i++) {
            scoreStar.push(
                <Image style={styles.star} key={"star_"+i}
                    source={require('./img/icon_star_filled_yellow.png')}/>
            );
        }
        return (
            <View style={styles.container}>
                {scoreStar}
            </View>
        );
    }
}

/*
 * Style
 */
let styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    star: {
        width: 25,
        height: 25,
    }
});
