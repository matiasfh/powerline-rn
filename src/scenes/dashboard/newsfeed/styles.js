var PLColors = require('PLColors');
var { Platform } = require('react-native');

const platform = Platform.OS;

export default {
    fullName: {
        color: '#21354a',
        fontSize: 12,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#8694ab',
        fontSize: 10,
    },
    description: {
        color: '#21354a',
        fontSize: 12,
    },
    dropDownIcon: {
        color: PLColors.lightText,
        fontSize: 14,
    },
    dropDownIconContainer: {
        width: 30,
        alignItems: 'flex-end',
    },
    zoneIcon: {
        fontSize: 15,
        color: '#5fc7fa',
    },
    commentCount: {
        fontSize: 12,
        color: '#8694ab',
    },
    footerIcon: {
        fontSize: 15,
        color: '#8694ab',
        marginRight: 5,
    },
    footerText: {
        fontSize: 11,
        color: '#8694ab',
        fontWeight: '500',
    }
}