/*
* @flow
*/
import React, { PropTypes } from 'React'
import {
  List,
  View,
  Text
} from 'native-base';
import PercentageCircle from 'react-native-percentage-circle'
import { FlatList } from 'react-native'
import { connect } from 'react-redux';

import Useritem from 'src/components/Useritem'
const PLColors = require('PLColors');
import type { RenderMode, Represenative } from 'src/actions/types'

type Props = {
  representatives: Array<Representative>,
  mode: RenderMode
};

type ItemProps = {
  item: Representative,
  mode: RenderMode
};

const Constituents = ({number}: {number: number}) =>
  <View style={{ alignItems: 'center', justifyContent: 'center'}}>
    <Text style={{ color: PLColors.darkText, fontSize: 12}}>
      {number}
    </Text>
    <Text style={{ color: PLColors.lightText, fontSize: 10}}>
      constituents
    </Text>
  </View>

const Percentage = ({number}: {number: number}) =>
  <View style={{ alignItems: 'center', justifyContent: 'center'}}>
    <PercentageCircle radius={25} percent={number} color={PLColors.main} />
  </View>

const Item = ({ item, mode }: ItemProps) => {
  const getChild = () => {
    switch(mode) {
      case 'UPVOTES':
        return <Constituents number={item.upvotes} />
      case 'DOWNVOTES':
        return <Constituents number={item.downvotes} />
      case '%UPVOTES':
        return <Percentage number={item.percUpvotes} />
      case '%DOWNVOTES':
        return <Percentage number={item.percDownvotes} />
      default:
        return <Constituents number={item.total} /> //ALL
    }
  }
  return (
    <Useritem
      username={`${item.first_name} ${item.last_name}`}
      note={item.official_title}
      id={item.id}
      key={item.id}
      rightChild={getChild()}
    />
  )
}
  

const RepresentativesList = ({ list, renderMode}: Props) =>
  <FlatList style={{ backgroundColor: 'white', flex: 0.5 }}
    data={list}
    extraData={renderMode}
    keyExtractor={item => item.id}
    renderItem={item => <Item item={item.item} mode={renderMode}/>}
  />
  
  

const mapStateToProps = ({ analytics: { list, renderMode} }) => {
  return {
    list,
    renderMode 
  }
}

export default connect(mapStateToProps)(RepresentativesList)