import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Color from '../../const/Color';
import Const from '../../const/Const';
import { Font, normalize } from '../../const/Font';
import MenuReviewStars from '../../commonComponent/MenuReviewStars';
        
export default class MenuReviewItem extends Component {
  static propTypes = {
    review: PropTypes.object.isRequired,
  };

  render() {
    const {
      review,
    } = this.props;
    const {
      rating,
      rated_time,
      comment,
      mobile,
    } = review;
    
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <MenuReviewStars score={rating} />
          <Text style={[styles.timeText, Font.DEFAULT_FONT_BLACK]}>{rated_time}</Text>
        </View>
        <View style={styles.center}>
          <Text style={Font.DEFAULT_FONT_BLACK}>{comment}</Text>
        </View>
        <View>
          <Text style={[styles.mobileText, Font.DEFAULT_FONT_BLACK]}>{mobile}</Text>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    padding: normalize(16),
    backgroundColor: 'white',
    marginBottom: normalize(10),
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    marginTop: normalize(5),
    marginBottom: normalize(5),
  },
  timeText: {
    flex: 1,
    textAlign: 'right',
  },
  mobileText: {
    textAlign: 'right',
  },
});
