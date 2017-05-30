var PLColors = require('PLColors');
var { Platform } = require('react-native');

const platform = Platform.OS;

export default {
    fullName: {
        color: '#21354a',
        fontSize: 14,
        fontWeight: 'bold',
    },
    subtitle: {
        color: PLColors.lightText,
        fontSize: 10,
    },
    description: {
        color: '#21354a',
        fontSize: 14,
    }
}