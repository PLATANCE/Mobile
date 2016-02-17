'use strict';
import React, {
    PropTypes,
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableHighlight
} from 'react-native';

/*
 * Style
 */
let styles = StyleSheet.create({

});

export default class ReviewList extends React.Component {
    static propTypes = {
        isCurrentShowALL: PropTypes.bool.isRequired,
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

    render() {
        const { isCurrentShowALL, reviews } = this.props;

        let showMoreButton = false;
        if (isCurrentShowALL == false) {
            showMoreButton = (
                <View>
                    <TouchableHighlight>
                        <View>
                            <Text>더 보기</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            );
        }

        return (
            <View>
                <View>
                    <Text>고객님들의 평가</Text>
                </View>
                <ListView //https://facebook.github.io/react-native/docs/listview.html
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, sectionID, rowID) => <Text key={'${sectionID}-${rowID}'}>{JSON.stringify(rowData)}</Text>}
                />
                {showMoreButton}
            </View>
        );
    }
}
