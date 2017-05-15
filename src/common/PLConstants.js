/**
 * @providesModule PLConstants
 **/

'use strict';

var { Dimensions } = require('react-native');
var { width, height } = Dimensions.get('window');

module.exports = {
    WINDOW_WIDTH: width,
    WINDOW_HEIGHT: height
};
