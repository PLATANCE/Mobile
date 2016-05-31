'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet,ScrollView, InteractionManager } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import RequestURL from '../const/RequestURL';
import MenuReviewList from './components/MenuReviewList';
import PlaceholderView from '../commonComponent/PlaceholderView';

export default class ReviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            renderPlaceholderOnly: false,
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
                InteractionManager.runAfterInteractions( () => {
                    this.setState({
                        renderPlaceholderOnly: true,
                    });
                })
            })
            .catch((error) => {
                console.warn(error);
            })
            .done();
    }
    renderPlaceholderView() {
        return (
          <PlaceholderView />
        );
    }
    render() {
        if(!this.state.renderPlaceholderOnly) {
            return this.renderPlaceholderView();
        }
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <MenuReviewList reviews={this.state.reviews} />
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
});