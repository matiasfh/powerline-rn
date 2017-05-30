/**
 * @flow
 */

'use strict';

var { combineReducers } = require('redux');

import drawer from './drawer';
import user from './user';
import groups from './groups';
import bookmarks from './bookmarks';

module.exports = combineReducers({
  user,
  drawer,
  groups,
  bookmarks,
});