/*
* @flow
*/
import  React from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {
  Container,
  Spinner,
  Content
} from 'native-base'
import {
  MenuContext 
} from 'react-native-popup-menu'


const PLColors = require('PLColors')
import Useritem from 'src/components/Useritem'
import AnalyticsHeader from './header'
import MainContent from './mainContent'
import TypeSelector from './typeSelector'
import RepresentativesList from './list.js'
import styles from './styles'

import type { AnalyticsData } from 'src/actions/types'


const Analytics = (props) =>
  <MenuContext backHandler customStyles={styles.menu}>
    <Container>
      <AnalyticsHeader />
      <Content>
        <MainContent {...props } />
        <TypeSelector />
        <RepresentativesList />
        
      </Content>
    </Container>
  </MenuContext>
  
    

export default Analytics