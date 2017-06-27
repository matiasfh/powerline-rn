import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Content, Text, List, ListItem, Left, Body, Right,Thumbnail} from 'native-base';

import Menu, {
    MenuContext,
    MenuTrigger,
    MenuOptions,
    MenuOption,
    renderers
} from 'react-native-popup-menu';

const PLColors = require('PLColors');
const { WINDOW_WIDTH, WINDOW_HEIGHT } = require('PLConstants');
var { getAcivities } = require('PLActions');

class Notifications extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            notifications: [1,11,,1,1,1,1,1]
        };

        getAcivities().then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    render (){
        return (
            <Content>
                <List>
                    {
                        this.state.notifications.map((value, index)=> {
                            return (
                                <ListItem avatar key={index}>
                                <Left>
                                    <Thumbnail source={{ uri: 'Image URL' }} />
                                </Left>
                                <Body>
                                    <Text>Kumar Pratik</Text>
                                    <Text note>Doing what you like will always keep you happy . .</Text>
                                </Body>
                                <Right>
                                    <Text note>3:43 pm</Text>
                                </Right>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Content>
        );
    }

}

const mapStateToProps = state => ({
    token: state.user.token,
    page: state.activities.page,
    totalItems: state.activities.totalItems,
    payload: state.activities.payload,
    count: state.activities.count,
});

export default connect()(Notifications);