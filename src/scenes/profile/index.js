import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    Container,
    Header,
    Left,
    Right,
    Button,
    Icon,
    Text,
    Content,
    Body,
    Title
} from 'native-base';
import styles from './styles';
const PLColors = require('PLColors');

class Profile extends Component{
    static propTypes = {
        token: React.PropTypes.string
    };

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon active name="arrow-back" style={{color: 'white'}}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>User Profile</Title>
                    </Body>
                </Header>
                <Content>

                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    token: state.user.token
});

export default connect(mapStateToProps)(Profile);