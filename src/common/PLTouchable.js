/**
 * @providesModule PLTouchable
 * @flow
 */

'use strict';

import React from 'react';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

function PLTouchableIOS(props: Object): ReactElement {
  return (
    <TouchableHighlight
      accessibilityTraits="button"
      underlayColor="#3C5EAE"
      {...props}
    />
  );
}

const PLTouchable = Platform.OS === 'android'
  ? TouchableNativeFeedback
  : PLTouchableIOS;

module.exports = PLTouchable;
