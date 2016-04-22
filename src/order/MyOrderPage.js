'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image, InteractionManager } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Color from '../const/Color';
import Const from '../const/Const';
import Font from '../const/Font';
import MyOrderList from './components/MyOrderList';
import RequestURL from '../const/RequestURL';
import PlaceholderView from '../commonComponent/PlaceholderView';
import userInfo from '../util/userInfo';
import Mixpanel from '../util/mixpanel';

export default class MyOrderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderHistory: [],
            hasData: false,
            editReview: false,
            renderPlaceholderOnly: false,
        }
    }
    componentDidMount() {
        this.fetchMyOrders();
    }
    fetchMyOrders() {
        const userIdx = userInfo.idx;
        fetch(RequestURL.REQUEST_MY_ORDER_LIST + 'user_idx=' + userIdx)
            .then((response) => response.json())
            .then((responseData) => {
                InteractionManager.runAfterInteractions( () => {
                    this.setState({
                        renderPlaceholderOnly: true,
                    });
                })
                if(responseData.order_history.length > 0) {
                    this.setState({
                        orderHistory: responseData.order_history,
                        hasData: true,
                    });
                }
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    changeEditReviewProperty() {
        this.setState({
            editReview: true,
        });
    }
    renderPlaceholderView() {
        return (
          <PlaceholderView />
        );
    }

    componentWillUnmount() {
        Mixpanel.trackWithProperties('View Order Detail', { editReview: this.state.editReview });
    }

    loadingNoDataImage() {
        return (
            <TouchableHighlight onPress={Actions.DrawerPage} underlayColor={'transparent'}>
                <View style={styles.container}>
                    <Image style={styles.img}
                        source={require('./img/no_data.jpg')} />
                </View>
            </TouchableHighlight>
        );
    }
    render() {
        if(!this.state.renderPlaceholderOnly) {
            return this.renderPlaceholderView();
        }
        if(!this.state.hasData) {
            return this.loadingNoDataImage();
        }
        
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <MyOrderList 
                        orders={this.state.orderHistory}
                        changeEditReviewProperty={ () => { this.changeEditReviewProperty(); } }
                    />
                </View>
            </View>
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
        marginTop: 10,
    },
    img: {
        width: Const.WIDTH,
        height: Const.HEIGHT,
        resizeMode: 'contain',
        backgroundColor: 'white',
    },
});