import React, { View, ListView, Text, StyleSheet, Image, TextInput } from 'react-native';
import Color from '../../const/Color';

export default class ReviewList extends React.Component {
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
                        
                        <Text>{rowData.menu.name}</Text>
                        <Text>{rowData.menu.foreignName}</Text>
                        
                        <View style={styles.chefBottomBox}>
                            <Text style={styles.chefNameText}>{rowData.chef.name}</Text>
                        </View>
                    </View>
                </View>


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


                <View style={styles.reviewBox}>
                    <TextInput style={styles.textInput} 
                        placeholder='동이름을 입력하세요' multiline={true}/>
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
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: 'white',
    },
    menuBox: {
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 5,
        height: 100,
    },
    menuImage: {
        width: 100,
        height: 100,
    },
    menuInfoBox: {
        flex: 1,
        marginLeft: 5,
    },
    chefBottomBox: {
        alignItems: 'flex-end',
        flex: 1,
        flexDirection: 'row'
    },
    chefNameText: {
    },
    starBox: {
        height: 70,
        flexDirection: 'row',
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starImage: {
        width: 50,
        height: 50,
    },
    reviewBox: {
        backgroundColor: 'green',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.PRIMARY_BACKGROUND,
        borderColor: Color.PRIMARY_BACKGROUND,
        overflow: 'hidden',
        height: 70,
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
    },
});
