'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableHighlight
} from 'react-native';

import MenuReviewStars from '../../commonComponent/MenuReviewStars';
import Color from '../../const/Color';

export default class ReviewList extends React.Component {
    static propTypes = {
        reviews: PropTypes.arrayOf(PropTypes.shape({
            score: PropTypes.number.isRequired,
            dateString: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            maskedPhoneNumber: PropTypes.string.isRequired
        }))
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
                    <MenuReviewStars score={rowData.score} />
                    <Text style={styles.dateStringText}>{rowData.dateString}</Text>
                </View>
                <View style={styles.contentBox}>
                    <Text style={styles.textBlack}>{rowData.content}</Text>
                </View>
                <View style={styles.phoneBox}>
                    <Text style={styles.textBlack}>{rowData.maskedPhoneNumber}</Text>
                </View>
            </View>
        )
    }

    render() {
        const { reviews } = this.props;

        return (
            <View>
                <View style={styles.headerBox}>
                    <Text style={styles.headerText}>고객님들의 평가</Text>
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
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 18,
        color: Color.PRIMARY_BLACK,
    },
    row: {
        flex: 1,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    scoreDateBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateStringText: {
        flex: 1,
        textAlign: 'right',
        color: Color.PRIMARY_BLACK,
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
        color: Color.PRIMARY_BLACK,
        lineHeight: 20,
    }

});
