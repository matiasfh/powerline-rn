import  React from 'react'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Content, Text, List, ListItem, Left, Body, Right,Thumbnail, Button, Icon} from 'native-base';

const Analytics = () => {
  return (
    <Content>
      <Text>Analytics</Text>
    </Content>
  )
}

export default connect()(Analytics)