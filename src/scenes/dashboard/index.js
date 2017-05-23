
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Title, Content, Button, Footer, FooterTab, Text, Body, Left, Right, Icon, Item, Input, Grid, Row, Col } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

class Home extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      group: 'all',
    };
  }

  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
    });
  }

  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false,
    });
  }

  toggleTab3() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false,
    });
  }

  toggleTab4() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true,
    });
  }

  selectGroup(group: string) {
    this.setState({ group: group });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded style={styles.header}>
          <Left style={{ flex: 0.1 }}>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon active name="menu" style={{ color: 'white' }} />
            </Button>
          </Left>
          <Item style={styles.searchBar}>
            <Input style={styles.searchInput} placeholder="Search groups, people, topics" />
            <Icon active name="search" />
          </Item>
        </Header>

        <Content>
          <Grid style={styles.groupSelector}>
            <Row>
              <Col style={styles.col}>
                <Button style={this.state.group == 'all' ? styles.iconActiveButton : styles.iconButton} onPress={() => this.selectGroup('all')}>
                  <Icon active name="walk" style={styles.icon} />
                </Button>
                <Text style={styles.iconText}>All</Text>
              </Col>
              <Col style={styles.col}>
                <Button style={this.state.group == 'town' ? styles.iconActiveButton : styles.iconButton} onPress={() => this.selectGroup('town')}>
                  <Icon active name="pin" style={styles.icon} />
                </Button>
                <Text style={styles.iconText}>Town</Text>
              </Col>
              <Col style={styles.col}>
                <Button style={this.state.group == 'state' ? styles.iconActiveButton : styles.iconButton} onPress={() => this.selectGroup('state')}>
                  <Icon active name="pin" style={styles.icon} />
                </Button>
                <Text style={styles.iconText}>State</Text>
              </Col>
              <Col style={styles.col}>
                <Button style={this.state.group == 'country' ? styles.iconActiveButton : styles.iconButton} onPress={() => this.selectGroup('country')}>
                  <Icon active name="pin" style={styles.icon} />
                </Button>
                <Text style={styles.iconText}>Country</Text>
              </Col>
              <Col style={styles.col}>
                <Button style={styles.iconButton}>
                  <Icon active name="more" style={styles.icon} />
                </Button>
                <Text style={styles.iconText}>More</Text>
              </Col>
            </Row>
          </Grid>
        </Content>

        <Footer>
          <FooterTab>
            <Button active={this.state.tab1} onPress={() => this.toggleTab1()} >
              <Icon active={this.state.tab1} name="ios-flash" />
              <Text>Newsfeed</Text>
            </Button>
            <Button active={this.state.tab2} onPress={() => this.toggleTab2()} >
              <Icon active={this.state.tab2} name="md-people" />
              <Text>Friends</Text>
            </Button>
            <Button>
              <Icon name="ios-add-circle" style={{ fontSize: 40, color: '#030366' }} />
            </Button>
            <Button active={this.state.tab3} onPress={() => this.toggleTab3()} >
              <Icon active={this.state.tab3} name="md-mail" />
              <Text>Messages</Text>
            </Button>
            <Button active={this.state.tab4} onPress={() => this.toggleTab4()} >
              <Icon active={this.state.tab4} name="md-notifications" />
              <Text>Notifications</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, bindAction)(Home);
