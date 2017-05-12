/**
 * @flow
 */

'use strict';

import type { Action } from './types';

type Tab = 'newsfeed' | 'friends' | 'new' | 'messages' | 'notifications';

module.exports = {
  switchTab: (tab: Tab): Action => ({
    type: 'SWITCH_TAB',
    tab,
  }),
};
