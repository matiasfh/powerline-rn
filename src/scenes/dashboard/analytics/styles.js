var PLColors = require('PLColors');
var { Platform } = require('react-native');
const { WINDOW_WIDTH, WINDOW_HEIGHT } = require('PLConstants');

const platform = Platform.OS;

export default {
  header: {
    backgroundColor: PLColors.main,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  mainContent: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: PLColors.cellBorder,
    padding: 20,
  },
  mainVotes: {
    flexDirection:'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginBottom: 20
  },
  descriptionContainer: {
    color: PLColors.darkText,
    marginBottom: 10,
    marginTop: 10
  },
  votes:{
    color: PLColors.darkText,
    fontSize: 24
  },
  votesNotes: {
    color: PLColors.lightText,
    fontSize: 10
  },
  typeSelectorContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: PLColors.cellBorder,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'stretch'
  },
  typeSelectorLabel: {
    color: PLColors.darkText,
    fontSize: 14
  },
  typeSelectorName: {
    color: PLColors.lightText,
    fontSize: 14
  },
  menu: {
    menuContextWrapper: {
      backgroundColor: 'white',
      flex: 1,
    },
    backdrop: {
      backgroundColor: 'black',
      opacity: 0.5,
    }
  },
  optionStyles: {
    optionsContainer: {
      backgroundColor: '#fafafa',
      paddingLeft: 5,
      width: WINDOW_WIDTH,
    },
  }

};
