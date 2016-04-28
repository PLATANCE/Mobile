import React, {
  View,
  ListView,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Color from '../../const/Color';
import Const from '../../const/Const';
import { Font, normalize } from '../../const/Font';
import RequestURL from '../../const/RequestURL';
import Mixpanel from '../../util/mixpanel';

export default class MyAddressList extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => (row1 !== row2),
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(props.myAddressList),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myAddressList !== this.props.myAddressList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.myAddressList),
      });
    }
  }

  changeInUseAddress(idx, userIdx, inUse) {
    if (!inUse) {
      Mixpanel.trackWithProperties('Select Address', { addressIdx: idx });
      this.updateInUseAddress(idx, userIdx);
    }
  }

  updateInUseAddress(idx, userIdx) {
    const param = {
      idx: idx,
      user_idx: userIdx,
      mode: 'update',
    };

    fetch(RequestURL.SUBMIT_IN_USE_ADDRESS, {
      method: 'POST',
      headers: {
        Accept: 'applcation/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    })
    .then((response) => response.json())
    .then((responseData) => {
      const message = responseData.result;
      Alert.alert(
        '주소 변경', 
        message,
        [
          { text: '확인', onPress: () => this.props.fetchMyAddressList() }
        ]
      );
      Actions.refresh();
      this.props.fetchCartInfo();
      this.props.fetchMyAddress();
    })
    .catch((error) => {
      console.warn(error);
    });
  }
  renderRow(rowData) {
    const inUse = (parseInt(rowData.in_use, 10) === 1);
    const deliveryAvailable = (parseInt(rowData.delivery_available, 10) === 1);
    const leftIcon = (inUse)
      ? require('../img/check_circle.png')
      : require('../img/empty_circle.png');

    if (rowData.delivery_available) {
      if(!rowData.reservation_type) {
        return (
          <TouchableHighlight underlayColor={'transparent'}
            onPress={() => this.changeInUseAddress(rowData.idx, rowData.user_idx, rowData.in_use)}
          >
            <View style={styles.row}>
              <Image style={styles.img} source={leftIcon}/>
              <View style={styles.addressBox}>
                <Text style={Font.DEFAULT_FONT_BLACK_BOLD}>{rowData.address}</Text>
                <Text style={Font.DEFAULT_FONT_BLACK}>{rowData.address_detail}</Text>
              </View>
            </View>
          </TouchableHighlight>
        );
      } else {
        return (
          <TouchableHighlight underlayColor={'transparent'}
            onPress={() => this.changeInUseAddress(rowData.idx, rowData.user_idx, rowData.in_use)}
          >
            <View style={styles.row}>
              <Image style={styles.img} source={leftIcon}/>
              <View style={styles.addressBox}>
                <Text style={Font.DEFAULT_FONT_BLACK_BOLD}>{rowData.address}</Text>
                <Text style={Font.DEFAULT_FONT_BLACK}>{rowData.address_detail}</Text>
                <Text style={Font.DEFAULT_FONT_RED}>현재 예약만 가능한 지역입니다.</Text>
              </View>
            </View>
          </TouchableHighlight>
        );
      }
    }

    return (
      <TouchableHighlight underlayColor={'transparent'}>
        <View style={styles.row}>
          <Image style={styles.img} source={leftIcon}/>
          <View style={styles.addressBox}>
            <Text style={Font.DEFAULT_FONT_BLACK_BOLD}>{rowData.address}</Text>
            <Text style={Font.DEFAULT_FONT_BLACK}>{rowData.address_detail}</Text>
            <Text style={Font.DEFAULT_FONT_RED}>배달이 불가능한 지역입니다.</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    padding: 10,
    height: normalize(80),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
  },
  img: {
    width: normalize(35),
    height: normalize(35),
  },
  addressBox: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
});
