
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, Item, Input, Grid, Row, Col, Spinner, ListItem, Thumbnail, List, Card, CardItem } from 'native-base';
import { View, RefreshControl } from 'react-native';
import { loadBookmarks, resetBookmarks } from 'PLActions';
import styles from './styles';

const PLColors = require('PLColors');
const datas = ['Simon Mignolet11', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Alberto Moreno', 'Emre Can', 'Joe Allen', 'Phil Coutinho'];

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
        const { props: { page, items } } = this;
        if (page === 0) {
            this.loadInitialBookmarks();
        }
    }

    async loadInitialBookmarks() {
        this.setState({ isLoading: true });
        const { props: { token, dispatch } } = this;
        try {
            await Promise.race([
                dispatch(loadBookmarks(token)),
                timeout(15000),
            ]);
        } catch (e) {
            const message = e.message || e;
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
        this.props.dispatch(resetBookmarks());
        this.loadInitialBookmarks();
    }

    postCard(item) {
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail small source={{ uri: item.detail.owner.avatar_file_path ? item.detail.owner.avatar_file_path : 'https://www.gstatic.com/webp/gallery3/2_webp_a.png' }} />
                        <Body>
                            <Text style={styles.fullName}>{item.detail.owner.first_name} {item.detail.owner.last_name}</Text>
                            <Text note style={styles.subtitle}>{item.detail.group.official_name}</Text>
                        </Body>
                    </Left>
                </CardItem>

                <CardItem>
                    <Body>
                        <Text style={styles.description}>{item.detail.description}</Text>
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
        const { props: { page, items, totalItems, totalPages } } = this;
        return (
            <Content
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }>
                <List dataArray={items} renderRow={item => {
                    switch (item.type) {
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
    page: state.bookmarks.page,
    totalItems: state.bookmarks.totalItems,
    totalPages: state.bookmarks.totalPages,
    items: state.bookmarks.items,
});

export default connect(mapStateToProps)(Newsfeed);