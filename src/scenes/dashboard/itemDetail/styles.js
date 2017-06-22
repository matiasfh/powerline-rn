var PLColors = require('PLColors');
var { StyleSheet } = require('react-native');

const { WINDOW_WIDTH, WINDOW_HEIGHT } = require('PLConstants');

export const MAX_HEIGHT = 170;
export const MIN_HEIGHT = 80;

export default {
    headerImage: {
        height: MAX_HEIGHT,
        width: WINDOW_WIDTH,
        alignSelf: 'stretch',
        resizeMode: 'cover',
        backgroundColor: 'gray',
    },
    title: {
        fontSize: 20,
    },
    name: {
        fontWeight: 'bold',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionContent: {
        fontSize: 16,
        textAlign: 'justify',
    },
    keywords: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    keywordContainer: {
        backgroundColor: '#999999',
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    keyword: {
        fontSize: 16,
        color: 'white',
    },
    titleContainer: {
        flex: 1,
        alignSelf: 'stretch',
        paddingTop: 20,
    },
    imageTitle: {
        marginTop: 8,
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 16,
        fontWeight: 'bold',
    },
    navTitleView: {
        height: MIN_HEIGHT,
        paddingTop: 16,
        opacity: 0,
    },
    navTitle: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    sectionLarge: {
        height: 600,
    },
    thumbnail: {
        borderWidth: 1,
        borderColor: PLColors.cellBorder,
    },
}