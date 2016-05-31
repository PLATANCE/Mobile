'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    PixelRatio,
} from 'react-native';

import Const from '../const/Const';
import { Font, normalize } from '../const/Font';

export default class MenuReviewStars extends Component {
    static propTypes = {
        
    };

    render() {
        let {
            score
        } = this.props;

        var scoreStar = [];

        let decimalScore = (score * 10) % 10;
        let intScore = (score * 10 - decimalScore) / 10;
        // 정수개 -1 만큼 가득 찬 별표 채우기
        for (var i = 0; i < intScore; i++) {
            scoreStar.push(
                <Image style={styles.star} key={"star_" + i}
                    source={require('./img/icon_star_filled_yellow.png')}/>
            );
        }
        for (var i = intScore; i < 5; i++) {
            if (i == intScore) {
                if (decimalScore == 0) {
                    scoreStar.push(
                        <Image style={styles.star} key={"star_" + i}
                            source={require('./img/icon_star_empty_yellow.png')}/>
                    );
                } else if (decimalScore <= 5) {
                    scoreStar.push(
                        <Image style={styles.star} key={"star_" + i}
                            source={require('./img/icon_star_half_yellow.png')}/>
                    );
                } else {
                    scoreStar.push(
                        <Image style={styles.star} key={"star_" + i}
                            source={require('./img/icon_star_filled_yellow.png')}/>
                    );
                }
            } else {
                scoreStar.push(
                    <Image style={styles.star} key={"star_" + i}
                        source={require('./img/icon_star_empty_yellow.png')}/>
                );
            }
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
        width: normalize(25),
        height: normalize(25),
    }
});
