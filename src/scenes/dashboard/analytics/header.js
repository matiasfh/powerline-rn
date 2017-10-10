import  React from 'react'
import { Actions } from 'react-native-router-flux'
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  ListItem,
  Radio,
  Text,
  View,
} from 'native-base'

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import { connect } from 'react-redux';
import { onAnalyticsFilterModeSelected } from 'src/actions/analytics'

var PLColors = require('PLColors');
import styles from './styles';

const baseMenuOptions = [
  {
    key: 'ELECTED',
    text: 'My Elected Leaders'
  },
  {
    key: 'AUTHOR',
    text : "Author's Elected Leaders"
  },
  {
    key: 'TOPLEADERS',
    text: 'Top 10 Elected Leaders'
  },
  {
    key: 'TOPTOWNS',
    text: 'Top 10 Towns'
  },
  {
    key: 'MAP',
    text: 'Plot on Map'
  },
  {
    key: 'CUSTOM',
    text: 'Custom Lookup'
  }
]

const AnalyticsHeader = ({ filterMode, dispatch }) => {
  const selected = baseMenuOptions.find(item => item.key === filterMode)
  let menuRef
  
  return (
    <Header style={styles.header}>
      <Left style={{ flex: 1/4}}>
        <Button transparent onPress={() => Actions.pop()}>
            <Icon active name="arrow-back" style={{ color: 'white' }} />
        </Button>
      </Left>
      <Body style={{flex: 1}}>
        <Title style={{ fontSize: 14 }}>Analytics: {selected.text}</Title>
      </Body>
      <Right style={{flex: 1/4}}>
        <Menu ref={ref => menuRef = ref} >
          <MenuTrigger>
            <Icon active name="md-funnel" style={{ color: 'white' }} />
          </MenuTrigger>
          <MenuOptions customStyles={styles.menuOptions}>
            {
              baseMenuOptions.map((item, index) =>
                <MenuOption value={item.key} key={index}>
                  <ListItem>
                    <Radio
                      selected={item.key === filterMode}
                      onPress={() => {
                        menuRef.close()
                        dispatch(onAnalyticsFilterModeSelected(item.key))
                      }}
                    />
                    <Body>
                      <Text>{item.text}</Text>
                    </Body>
                  </ListItem>
                </MenuOption>
              )
            }
              
          </MenuOptions>
        </Menu>
      </Right>
    </Header>
  )
}

const mapStateToProps = ({ analytics: { filterMode }}) => ({
  filterMode
})

export default connect(mapStateToProps)(AnalyticsHeader)