import React from 'react'
import { Button, Icon, Label } from 'native-base'
import { Actions } from 'react-native-router-flux';

import styles from './styles'

const AnalyticsButton = (props) =>
  <Button iconLeft transparent style={styles.footerButton} onPress={() => Actions.analytics(props)}>
      <Icon active name="ios-stats" style={styles.footerIcon} />
      <Label style={styles.footerText}>Analytics</Label>
  </Button>

export default AnalyticsButton