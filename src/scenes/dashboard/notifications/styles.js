var PLColors = require('PLColors');
var { Platform } = require('react-native');

const platform = Platform.OS;

export default {
  defaultButton: {
      color: PLColors.main,
      borderWidth: 1,
      width: 60,
      paddingTop: 3,
      paddingBottom: 3,
      backgroundColor: 'white',
      textAlign: 'center',
      marginBottom: 5,
      fontSize: 13
  },
  icon: {
    color: PLColors.lightText,
    fontSize: 12
  },
  text1: {
    fontSize: 13,
    color: PLColors.main
  },
  text2: {
    fontSize: 10,
    color: PLColors.lightText
  },
  text3: {
    fontSize: 13,
    color: PLColors.main,
    fontWeight: 'bold'
  },
  listItemBody: {
    borderBottomWidth: 0
  },
  listItem: {
    borderBottomWidth: 0.6,
    borderBottomColor: '#c9c9c9',
    marginLeft: 0,
    paddingLeft: 17
  },
  listItemRight: {
    borderBottomWidth: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
