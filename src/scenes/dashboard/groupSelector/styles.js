
const React = require('react-native');
const PLColors = require('PLColors');
const { StyleSheet } = React;

export default {
    container: {
        backgroundColor: '#f5f9fc',
    },
    header: {
        backgroundColor: PLColors.main,
    },
    searchBar: {
        backgroundColor: '#030747',
        marginLeft: 15,
        paddingHorizontal: 10,
    },
    searchInput: {
        fontSize: 12,
        color: 'white',
    },
    titleText: {
        fontSize: 20,
        color: '#2e3f50',
        marginLeft: 10,
        fontWeight: '500',
    },
    buttonText: {
        fontSize: 12,
        color: PLColors.main,
        marginLeft: -7,
    },
    buttonIcon: {
        fontSize: 15,
        color: PLColors.main,
    },
};
