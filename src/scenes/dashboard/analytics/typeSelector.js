import React from 'react'
import {
  View,
  Button,
  Label,
  Text,
  Icon,
  CheckBox,
  Radio,
  ListItem,
  Body
} from 'native-base'
import { connect } from 'react-redux'

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';

import { onAnalyticsListTypeSelected } from 'src/actions/analytics'
var PLColors = require('PLColors');
import styles from './styles'


const baseMenuOptions = [
  {
    key: 'UPVOTES',
    text: 'Count of Total Upvotes'
  },
  {
    key: '%UPVOTES',
    text : '% of Total Upvotes'
  },
  {
    key: 'DOWNVOTES',
    text: 'Count of Total Downvotes'
  },
  {
    key: '%DOWNVOTES',
    text: '% of Total Downvotes'
  },
  {
    key: 'ALL',
    text: 'Count of All Votes'
  }
]

class TypeSelector extends React.Component {
  state = {
    selected: baseMenuOptions.find(item => item.key === this.props.renderMode)
  }
  
  onCheckbox = (item) => {
    const selected = baseMenuOptions.find(e => e.key === item.key)
    this.setState({
      selected
    })
    this.props.dispatch(onAnalyticsListTypeSelected(item.key))
    this.menu.close()
  }

  render() {
    const { selected } = this.state
    return (
      <View style={styles.typeSelectorContainer}>
      
        <Button iconRight transparent>
          
          <Text style={styles.typeSelectorName}>
            SHOW: 
          </Text> 
          <Menu ref={ref => this.menu = ref }>
            <MenuTrigger text={selected.text} />
            <MenuOptions customStyles={styles.menuOptions}>
              {
                baseMenuOptions.map((item, index) =>
                  <MenuOption key={index} value={item.key}>
                    <ListItem>
                      <Radio selected={item.key === this.props.renderMode} onPress={() => this.onCheckbox(item)}/>
                      <Body>
                        <Text>{item.text}</Text>
                      </Body>
                    </ListItem>    
                  </MenuOption>
                )
              }
            </MenuOptions>
          </Menu>
          <Icon name="md-arrow-dropdown" style={{ color: PLColors.darkText }}/>
        </Button>
        
      </View>
    )
  }
}
  
const mapStateToProps = ({ analytics: { renderMode }}) => ({
  renderMode
})
export default connect(mapStateToProps)(TypeSelector)