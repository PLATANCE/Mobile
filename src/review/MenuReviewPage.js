'use strict';
import React, { View, Text, StyleSheet,ScrollView } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import RequestURL from '../const/RequestURL';
import MenuReviewList from './components/MenuReviewList';

export default class ReviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            loaded: false,
        }
    }
    componentDidMount() {
        this.fetchReviewList();
    }
    fetchReviewList() {
        fetch(RequestURL.REQUEST_REVIEW_LIST + "?menu_idx=" + this.props.menuIdx)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    reviews: responseData.review,
                });
            })
            .catch((error) => {
                console.warn(error);
            })
            .done();
    }
    renderLoadingView() {
        return(
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.content} >
                        <MenuReviewList reviews={this.state.reviews} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.PRIMARY_BACKGROUND,
        marginTop: Const.MARGIN_TOP,
    },
    content: {
        flex: 1,
    },
});