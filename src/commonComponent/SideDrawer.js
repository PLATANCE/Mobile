import React, { Text, View, Component, PropTypes } from 'react-native';
import Drawer from 'react-native-drawer';

import { Actions } from 'react-native-router-flux';

class SideDrawerContent extends Component {

    static contextTypes = {
        drawer: PropTypes.object.isRequired,
    };

    render() {
        const { drawer } = this.context;
        return (
            <View style={styles.container}>
            	<View style={styles.drawerRow}>
					<Text>Home</Text>
				</View>
				<Text>Screen 1</Text>
				<Text>Screen 2</Text>
				<Text>Screen 3</Text>
				<Text>Screen 4</Text>
			</View>
        );
    }
}

export default class SideDrawer extends Component {
    static propTypes = {
        isDrawerOpen: PropTypes.bool.isRequired
    };
    constructor(props) {
        super(props);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.refs.drawer && this.props.isDrawerOpen == true) {
            this.refs.drawer.open();
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
    render() {
        return (
            <Drawer
				ref="drawer"
		        type="overlay"
		        content={<SideDrawerContent />}
		        tapToClose={true}
		        openDrawerOffset={0.2} 
		        panCloseMask={0.2}
		        closedDrawerOffset={0}
		        styles={drawerStyles}
		        tweenHandler={(ratio) => ({ main: { opacity: (2 - ratio) / 2 } })}
			>
	        {React.Children.map(this.props.children, c => React.cloneElement(c, {
	        	route: this.props.route
	        }))}
	      </Drawer>
        )
    }
}

var drawerStyles = {
    drawer: {
        backgroundColor: '#ffffff'
    },
};
