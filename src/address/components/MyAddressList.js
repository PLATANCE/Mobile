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
import RequestURL from '../../const/RequestURL';

export default class MyAddressList extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => (row1 !== row2),
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(props.addressList),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addressList !== this.props.addressList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.addressList),
      });
    }
  }

  changeInUseAddress(idx, userIdx, inUse) {
    if (!inUse) {
      this.updateInUseAddress(idx, userIdx);
    }
  }

  updateInUseAddress(idx, userIdx) {
    const param = {
      idx,
      userIdx,
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
      console.log(responseData);
      const message = responseData.result;
      Alert.alert(
        '주소 변경', 
        message,
        [
          { text: '확인', onPress: () => Actions.pop() }
        ]
      );
      Actions.refresh();
      this.props.onUpdateInUseAddress();
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
    const textStyle = (deliveryAvailable)
      ? {
        color: Color.PRIMARY_BLACK,
      }
      : {
        color: Color.PRIMARY_GRAY,
      };

    if (rowData.delivery_available) {
      return (
        <TouchableHighlight underlayColor={'transparent'}
          onPress={() => this.changeInUseAddress(rowData.idx, rowData.user_idx, rowData.in_use)}
        >
          <View style={styles.row}>
            <Image style={styles.img} source={leftIcon}/>
            <View style={styles.addressBox}>
              <Text style={textStyle}>{rowData.address}</Text>
              <Text style={textStyle}>{rowData.address_detail}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    }

    return (
      <TouchableHighlight underlayColor={'transparent'}>
        <View style={styles.row}>
          <Image style={styles.img} source={leftIcon}/>
          <View style={styles.addressBox}>
            <Text style={textStyle}>{rowData.address}</Text>
            <Text style={textStyle}>{rowData.address_detail}</Text>
            <Text style={{ color: 'red' }}>배달이 불가능한 지역입니다.</Text>
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
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
  },
  img: {
    width: 30,
    height: 30,
  },
  addressBox: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  deleteText: {
    color: Color.PRIMARY_ORANGE,
    textDecorationLine: 'underline',
  },
});
