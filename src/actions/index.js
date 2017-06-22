/**
 * @providesModule PLActions
 * @flow
 */

'use strict';

const navigationActions = require('./navigation');
const loginActions = require('./login');
const groupActions = require('./groups');
const bookmarkActions = require('./bookmarks');
const activityActions = require('./activities');
const postActions = require('./posts');
const userActions = require('./users');

module.exports = {
  ...loginActions,
  ...navigationActions,
  ...groupActions,
  ...bookmarkActions,
  ...activityActions,
  ...postActions,
  ...userActions,
};
