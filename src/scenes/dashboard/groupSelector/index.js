
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, Item, Input, Grid, Row, Col, Spinner } from 'native-base';
import { View } from 'react-native';
import { loadGroups } from 'PLActions';
import styles from './styles';

const PLColors = require('PLColors');

class GroupSelector extends Component {

    static propTypes = {
        token: React.PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    componentDidMount() {
        const { props: { token, page, perPage, groups } } = this;
        this.setState({ isLoading: true });
        this.props.dispatch(loadGroups(token, page, perPage));
    }

    _renderLoading() {
        if (this.props.groups.length == 0) {
            return (
                <Spinner color={PLColors.main} />
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header searchBar rounded style={styles.header}>
                    <Left style={{ flex: 0.1 }}>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon active name="arrow-back" style={{ color: 'white' }} />
                        </Button>
                    </Left>
                    <Item style={styles.searchBar}>
                        <Input style={styles.searchInput} placeholder="Search for groups" />
                        <Icon active name="search" />
                    </Item>
                </Header>

                <Content padder>
                    <Grid style={{ marginTop: 10 }}>
                        <Row>
                            <Col style={{ alignItems: 'flex-start' }}>
                                <Text style={styles.titleText}>Choose Group</Text>
                            </Col>
                            <Col>
                                <Button small iconLeft transparent style={{ alignSelf: 'flex-end' }}>
                                    <Icon name="ios-add-circle" style={styles.buttonIcon} />
                                    <Text style={styles.buttonText}>ADD GROUP</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                    {this._renderLoading()}
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
    page: state.groups.page,
    perPage: state.groups.items,
    groups: state.groups.payload,
});


export default connect(mapStateToProps)(GroupSelector);
