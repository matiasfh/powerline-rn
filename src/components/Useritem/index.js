import React, { PropTypes } from 'react'
import {
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Icon
} from 'native-base';

import { View, TouchableOpacity, Text } from 'react-native';

const PLColors = require('PLColors');
import defaultAvatar from 'src/assets/blank_person.png'

const UserItem = ({
  itemStyle,
  avatar ,
  username,
  note,
  rightChild,
  onPress,
  id
}) => {
  const avatarSource = (typeof avatar === 'number')? avatar : { uri: avatar }
  return (
    
    <ListItem key={id} onPress={onPress} style={{...itemStyle, paddingTop: 10, paddingBottom: 10, height: 80 }} >
      <Left style={{ flex: 1/3 }}>
        <Thumbnail source={avatar} />
      </Left>
      <Body style={{ flex: 1 }}>
        <Text style={{fontSize: 12, color: PLColors.darkText }} >{username}</Text>
        <Text note style={{fontSize: 10, color: PLColors.lightText }}>{note}</Text>
      </Body>
      {
        rightChild && 
        <Right style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1/3,
        }}>
          {rightChild}
        </Right>
      }
    </ListItem>
    
  )
}
  

UserItem.propTypes = {
  itemStyle: PropTypes.object,
  avatar: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  username: PropTypes.string.isRequired,
  note: PropTypes.string,
  rightChild: PropTypes.element,
  onPress: PropTypes.func,
  id: PropTypes.string.isRequired
}
UserItem.defaultProps = {
  onPress: function() {},
  avatar: defaultAvatar
}

export default UserItem