
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, Item, Input, Grid, Row, Col, Spinner, ListItem, Thumbnail, List, Card, CardItem } from 'native-base';
import { View, RefreshControl } from 'react-native';
import { loadActivities, resetActivities } from 'PLActions';
import styles from './styles';
import TimeAgo from 'react-native-timeago';

const PLColors = require('PLColors');

class Newsfeed extends Component {

    static propTypes = {
        token: React.PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    componentWillMount() {
        const { props: { page } } = this;
        if (page === 0) {
            this.loadInitialActivities();
        }
    }

    async loadInitialActivities() {
        this.setState({ isLoading: true });
        const { props: { token, dispatch } } = this;
        try {
            await Promise.race([
                dispatch(loadActivities(token)),
                timeout(15000),
            ]);
        } catch (e) {
            const message = e.message || e;
            console.error(e);
            if (message !== 'Timed out') {
                alert(message);
            }
            else {
                alert('Timed out. Please check internet connection');
            }
            return;
        } finally {
            this.setState({ isLoading: false });
        }
    }

    _onRefresh() {
        this.props.dispatch(resetActivities());
        this.loadInitialActivities();
    }

    postCard(item) {
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail small source={{ uri: item.owner.avatar_file_path ? item.owner.avatar_file_path : 'https://www.gstatic.com/webp/gallery3/2_webp_a.png' }} />
                        <Body>
                            <Text style={styles.fullName}>{item.owner.first_name} {item.owner.last_name}</Text>
                            <Text note style={styles.subtitle}>{item.group.official_name} • <TimeAgo time={item.sent_at} hideAgo={true} /></Text>
                        </Body>
                    </Left>
                </CardItem>

                <CardItem>
                    <Body>
                        <Text style={styles.description}>{item.description}</Text>
                    </Body>
                </CardItem>

                <CardItem style={{ paddingVertical: 0 }}>
                    <Left>
                        <Button iconLeft dark transparent>
                            <Icon active name="thumbs-up" />
                            <Text>Upvote 12</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button iconLeft dark transparent>
                            <Icon active name="thumbs-down" />
                            <Text>Downvote 4</Text>
                        </Button>
                    </Body>
                    <Right>
                        <Button iconLeft dark transparent>
                            <Icon active name="undo" />
                            <Text>Reply 3</Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        );
    }

    render() {
        const { props: { payload } } = this;
        console.log("payload = ", payload);
        return (
            <Content
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }>
                <List dataArray={payload} renderRow={item => {
                    switch (item.entity.type) {
                        case 'post':
                            return this.postCard(item);
                            break;
                        default:
                            return null;
                            break;
                    }
                }}
                />
            </Content >
        );
    }
}

async function timeout(ms: number): Promise {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Timed out')), ms);
    });
}

const mapStateToProps = state => ({
    token: state.user.token,
    page: state.activities.page,
    totalItems: state.activities.totalItems,
    payload: state.activities.payload,
});

export default connect(mapStateToProps)(Newsfeed);