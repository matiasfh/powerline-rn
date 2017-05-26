/**
 *
 * @providesModule PLNavigator
 * @flow
 */

'use strict';
var React = require('React');
var Platform = require('Platform');
var BackAndroid = require('BackAndroid');
var StyleSheet = require('StyleSheet');
var { Router, Scene } = require('react-native-router-flux');
var { connect } = require('react-redux');
var { StatusBar } = require('react-native');

import { Drawer } from 'native-base';
import { closeDrawer } from './actions/drawer';
import Home from './scenes/dashboard/';
import GroupSelector from './scenes/dashboard/groupSelector/'
import SideBar from './components/sideBar';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { StyleProvider, variables } from 'native-base';

var RouterWithRedux = connect()(Router);

class PLNavigator extends React.Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    closeDrawer: React.PropTypes.func,
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }

  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'home':
        return <Home />;
      default:
        return <Home />;
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme((this.props.themeState === 'material') ? material : undefined)}>
        <Drawer
          ref={(ref) => { this._drawer = ref; }}
          type="overlay"
          tweenDuration={150}
          content={<SideBar />}
          tapToClose
          acceptPan={false}
          onClose={() => this.closeDrawer()}
          openDrawerOffset={0.3}
          panCloseMask={0.2}
          styles={{
            drawer: {
              shadowColor: '#000000',
              shadowOpacity: 0.8,
              shadowRadius: 3,
            },
          }}
          tweenHandler={(ratio) => {  //eslint-disable-line
            return {
              drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
              main: {
                opacity: (2 - ratio) / 2,
              },
            };
          }}
          negotiatePan
        >
          <RouterWithRedux>
            <Scene key="root">
              <Scene key="home" component={Home} hideNavBar initial />
              <Scene key="groupSelector" component={GroupSelector} />
            </Scene>
          </RouterWithRedux>
        </Drawer>
      </StyleProvider>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
});

module.exports = connect(mapStateToProps, bindAction)(PLNavigator);
