import React from 'react';
import {
  View,
  Text,
  Icon,
  Left,
  Right,
} from 'native-base'
import { connect } from 'react-redux'
import styles from './styles';

const MainContent = ({ description, upvotes, downvotes }) =>
  <View style={styles.mainContent}>
    <Text style={styles.descriptionContainer}>
      {description}
    </Text>
    <View style={styles.mainVotes}>

      <Left>
        <View style={{
          flexDirection: 'row',
          flex: 1/2
        }}>
          <Icon active name="ios-arrow-round-up"/>
          <Text style={styles.votes}>
            { upvotes }
          </Text>
        </View>
        <Text style={styles.votesNotes}>
          Total Upvotes
        </Text>
      </Left>


      <Right>
        <View style={{
          flexDirection: 'row',
          flex: 1/2
        }}>
          <Icon active name="ios-arrow-round-down"/>
          <Text style={styles.votes}>
            { downvotes }
          </Text>
        </View>
        <Text style={styles.votesNotes}>
          Total Downvotes
        </Text>
      </Right>

    </View>
  </View>

const mapStateToProps = ({ analytics: { upvotes, downvotes}}) => {
  return {
    upvotes,
    downvotes
  }
}
export default connect(mapStateToProps)(MainContent)