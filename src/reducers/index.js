/**
 * @flow
 */

'use strict';

var { combineReducers } = require('redux');

import drawer from './drawer';
import user from './user';
import navigation from './navigation';

module.exports = combineReducers({
  user,
  drawer,
  navigation,
});