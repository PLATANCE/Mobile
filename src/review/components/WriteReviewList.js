import React, { View, ListView, Text, StyleSheet, Image, TextInput } from 'react-native';
import Color from '../../const/Color';

export default class WriteReviewList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

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
                <View style={styles.menuBox}>
                    <Image style={styles.menuImage}
                        source={{uri: rowData.menu.url}} />
                    <View style={styles.menuInfoBox}>
                        <Text style={[styles.textBlack, styles.textBold]}>{rowData.menu.name}</Text>
                        <Text style={styles.textBlack}>{rowData.menu.foreignName}</Text>
                        <Text style={styles.chefNameText}>{rowData.chef.name}</Text>
                        <View style={styles.starBox}>
                            <Image style={styles.starImage}
                                source={require('../../commonComponent/img/icon_star_empty_yellow.png')} />
                            <Image style={styles.starImage}
                                source={require('../../commonComponent/img/icon_star_empty_yellow.png')} />
                            <Image style={styles.starImage}
                                source={require('../../commonComponent/img/icon_star_empty_yellow.png')} />
                            <Image style={styles.starImage}
                                source={require('../../commonComponent/img/icon_star_empty_yellow.png')} />
                            <Image style={styles.starImage}
                                source={require('../../commonComponent/img/icon_star_empty_yellow.png')} />
                        </View>
                    </View>
                </View>
                <View style={styles.reviewBox}>
                    <TextInput style={styles.textInput} 
                        placeholder='솔직한 리뷰는,플레이팅을 더 맛있게 합니다 :)' multiline={true}/>
                </View>
                <View style={styles.buttonBox}>
                    <Text style={styles.textWhite}>리뷰 저장</Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 10,
    },
    menuBox: {
        flexDirection: 'row',
        height: 120,
    },
    menuImage: {
        width: 120,
        height: 120,
    },
    menuInfoBox: {
        flex: 1,
        marginLeft: 10,
    },
    textBlack: {
        color: Color.PRIMARY_BLACK,
    },
    textBold: {
        fontWeight: 'bold',
    },
    chefNameText: {
        marginTop: 20,
        color: Color.PRIMARY_ORANGE,
    },
    starBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    starImage: {
        width: 40,
        height: 40,
    },
    reviewBox: {
        backgroundColor: 'green',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.PRIMARY_BACKGROUND,
        overflow: 'hidden',
        height: 70,
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 13,
    },
    buttonBox: {
        flexDirection: 'row',
        marginTop: 10,
        borderColor: Color.PRIMARY_ORANGE,
        backgroundColor: Color.PRIMARY_ORANGE,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWhite: {
        color: 'white',
    },
});
