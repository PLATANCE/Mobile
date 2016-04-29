'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableHighlight,
    PixelRatio,
} from 'react-native';

import MenuReviewStars from '../../commonComponent/MenuReviewStars';
import Color from '../../const/Color';
import Const from '../../const/Const';
import { Font, normalize } from '../../const/Font';

export default class ReviewList extends React.Component {
    static propTypes = {
        
    };
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: dataSource.cloneWithRows(props.reviews)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reviews !== this.props.reviews) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.reviews)
            })
        }
    }

    renderRow(rowData) {
        return (
            <View style={styles.row}>
                <View style={styles.scoreDateBox}>
                    <MenuReviewStars score={rowData.rating} />
                    <Text style={[styles.dateStringText, Font.DEFAULT_FONT_BLACK]}>{rowData.rated_time}</Text>
                </View>
                <View style={styles.contentBox}>
                    <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>{rowData.comment}</Text>
                </View>
                <View style={styles.phoneBox}>
                    <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>{rowData.mobile}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View>
                <View style={styles.headerBox}>
                    <Text style={[Font.DEFAULT_FONT_BLACK, styles.headerText]}>BEST 리뷰</Text>
                </View>
                <ListView style={styles.listView}
                    //https://facebook.github.io/react-native/docs/listview.html
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow} />
            </View>
        );
    }
}

/*
 * Style
 */
let styles = StyleSheet.create({
    headerBox: {
        backgroundColor: 'white',
        padding: normalize(10),
    },
    headerText: {
        textAlign: 'center',
        fontSize: normalize(18),
    },
    row: {
        flex: 1,
        padding: normalize(16),
        marginBottom: normalize(10),
        backgroundColor: 'white',
    },
    scoreDateBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateStringText: {
        flex: 1,
        textAlign: 'right',
    },
    contentBox: {
        marginTop: 5,
    },
    phoneBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5,
    },
    textBlack: {
        lineHeight: normalize(20),
    }

});
