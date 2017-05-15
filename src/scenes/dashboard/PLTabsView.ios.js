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
var { switchTab } = require('../../actions');
var { connect } = require('react-redux');
var { Tab } = require('../../reducers/navigation');
var { Navigator } = require('react-native-deprecated-custom-components');

class PLTabsView extends React.Component {
  props: {
    tab: Tab;
    onTabSelect: (tab: Tab) => void;
    navigator: Navigator;
  };

  onTabSelect(tab: Tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
  }

  render() {
    return (
      <TabBarIOS tintColor={PLColors.darkText}>
        <TabBarItemIOS
          title="Newsfeed"
          selected={this.props.tab === 'newsfeed'}
          onPress={this.onTabSelect.bind(this, 'newsfeed')}
          icon={require('img/img_newsfeed.png')}
          selectedIcon={require('img/img_newsfeed.png')}>
          <PLNewsfeed navigator={this.props.navigator} />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Friends"
          selected={this.props.tab === 'friends'}
          onPress={this.onTabSelect.bind(this, 'friends')}
          icon={require('img/img_friends.png')}
          selectedIcon={require('img/img_friends.png')}>
          <PLNewsfeed navigator={this.props.navigator} />
        </TabBarItemIOS>
        <TabBarItemIOS
          title=""
          selected={this.props.tab === 'new'}
          onPress={this.onTabSelect.bind(this, 'new')}
          icon={require('img/icon_plus.png')}
          selectedIcon={require('img/icon_plus.png')}>
          <PLNewsfeed navigator={this.props.navigator} />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Messages"
          selected={this.props.tab === 'messages'}
          onPress={this.onTabSelect.bind(this, 'messages')}
          icon={require('img/img_messages.png')}
          selectedIcon={require('img/img_messages.png')}>
          <PLNewsfeed navigator={this.props.navigator} />
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Notifications"
          selected={this.props.tab === 'notifications'}
          onPress={this.onTabSelect.bind(this, 'notifications')}
          icon={require('img/img_notifications.png')}
          selectedIcon={require('img/img_notifications.png')}>
          <PLNewsfeed navigator={this.props.navigator} />
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }

}

function select(store) {
  return {
    tab: store.navigation.tab
  };
}

function actions(dispatch) {
  return {
    onTabSelect: (tab) => dispatch(switchTab(tab)),
  };
}

module.exports = connect(select, actions)(PLTabsView);
