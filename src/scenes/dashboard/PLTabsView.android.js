/**
 * @flow
 * @providesModule PLTabsView
 */

'use strict';

var PLColors = require('PLColors');
var React = require('React');
var TabBarIOS = require('TabBarIOS');
var TabBarItemIOS = require('TabBarItemIOS');
var PLNewsfeed = require('PLNewsfeed');

var StyleSheet = require('StyleSheet');
var TouchableOpacity = require('TouchableOpacity');
var Image = require('Image');
var View = require('View');
var { Text } = require('PLText');
var MenuItem = require('./MenuItem');

var { switchTab } = require('../../actions');
var { connect } = require('react-redux');

import type {Tab } from '../../reducers/navigation';
var PLDrawerLayout = require('PLDrawerLayout');

class PLTabsView extends React.Component {
  props: {
    tab: Tab;
    onTabSelect: (tab: Tab) => void;
    navigator: Navigator;
  };

  constructor(props) {
    super(props);

    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.openProfileSettings = this.openProfileSettings.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  getChildContext() {
    return {
      openDrawer: this.openDrawer,
    };
  }

  openDrawer() {
    this.refs.drawer.openDrawer();
  }

  onTabSelect(tab: Tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
    this.refs.drawer.closeDrawer();
  }

  openProfileSettings() {
    this.refs.drawer.closeDrawer();
  }

  renderNavigationView() {
    var accountItem, myPLItem;

    if (this.props.user.isLoggedIn) {
      var name = this.props.user.username || '';
      accountItem = (
        <View>
          <Text style={styles.name}>
            {name.toUpperCase()}
          </Text>
        </View>
      );
      myPLItem = (
        <MenuItem
          title="Newsfeed"
          selected={this.props.tab === 'newsfeed'}
          onPress={this.onTabSelect.bind(this, 'newsfeed')}
          icon={require('img/img_newsfeed.png')}
          selectedIcon={require('img/img_newsfeed.png')}
        />
      );
    }
    return (
      <View style={styles.drawer}>
        <Image
          style={styles.header}
          source={require('img/drawer-header.png')}>
          {accountItem}
        </Image>
        <MenuItem
          title="Newsfeed"
          selected={this.props.tab === 'newsfeed'}
          onPress={this.onTabSelect.bind(this, 'newsfeed')}
          icon={require('img/img_newsfeed.png')}
          selectedIcon={require('img/img_newsfeed.png')}
        />
        <MenuItem
          title="Friends"
          selected={this.props.tab === 'friends'}
          onPress={this.onTabSelect.bind(this, 'friends')}
          icon={require('img/img_friends.png')}
          selectedIcon={require('img/img_friends.png')}
        />
        <MenuItem
          title="Messages"
          selected={this.props.tab === 'messages'}
          onPress={this.onTabSelect.bind(this, 'messages')}
          icon={require('img/img_messages.png')}
          selectedIcon={require('img/img_messages.png')}
        />
        <MenuItem
          title="Notifications"
          selected={this.props.tab === 'notifications'}
          onPress={this.onTabSelect.bind(this, 'notifications')}
          icon={require('img/img_notifications.png')}
          selectedIcon={require('img/img_notifications.png')}
        />
      </View>
    );
  }

  renderContent() {
    switch (this.props.tab) {
      case 'newsfeed':
        return (
          <PLNewsfeed navigator={this.props.navigator} />
        );

      case 'friends':
        return (
          <PLNewsfeed navigator={this.props.navigator} />
        );

      case 'messages':
        return <PLNewsfeed navigator={this.props.navigator} />;

      case 'notifications':
        return <PLNewsfeed navigator={this.props.navigator} />;

      case 'messages':
        return <PLNewsfeed navigator={this.props.navigator} />;
    }
    throw new Error(`Unknown tab ${this.props.tab}`);
  }

  render() {
    return (
      <PLDrawerLayout
        ref="drawer"
        drawerWidth={290}
        drawerPosition="left"
        renderNavigationView={this.renderNavigationView}>
        <View style={styles.content} key={this.props.tab}>
          {this.renderContent()}
        </View>
      </PLDrawerLayout>
    );
  }
}

PLTabsView.childContextTypes = {
  openDrawer: React.PropTypes.func,
};

function select(store) {
  return {
    tab: store.navigation.tab,
    day: store.navigation.day,
    user: store.user,
  };
}

function actions(dispatch) {
  return {
    onTabSelect: (tab) => dispatch(switchTab(tab)),
  };
}

var styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    justifyContent: 'flex-end',
  },
  name: {
    marginTop: 10,
    color: 'white',
    fontSize: 12,
  },
  loginPrompt: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  loginText: {
    fontSize: 12,
    color: PLColors.lightText,
    textAlign: 'center',
    marginBottom: 10,
  },
});

module.exports = connect(select, actions)(PLTabsView);
