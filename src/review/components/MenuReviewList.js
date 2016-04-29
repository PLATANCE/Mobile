'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableHighlight
} from 'react-native';
import Color from '../../const/Color';
import Const from '../../const/Const';
import { Font, normalize } from '../../const/Font';

import MenuReviewStars from '../../commonComponent/MenuReviewStars';

export default class MenuReviewList extends React.Component {
    static propTypes = {
        
    };
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: dataSource.cloneWithRows(props.reviews),
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reviews !== this.props.reviews) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.reviews),
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
        const { reviews } = this.props;
        
        return (
            <View style={styles.container}>
                <ListView
                    //https://facebook.github.io/react-native/docs/listview.html
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow} />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
    },
    row: {
        flex: 1,
        marginBottom: 10,
        padding: normalize(16),
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
