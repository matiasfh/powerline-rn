
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, Item, Input, Grid, Row, Col, Spinner, ListItem, Thumbnail, List, Card, CardItem, Label } from 'native-base';
import { View, RefreshControl, TouchableOpacity, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { loadActivities, resetActivities } from 'PLActions';
import styles, { sliderWidth, itemWidth } from './styles';
import TimeAgo from 'react-native-timeago';

const PLColors = require('PLColors');
const { WINDOW_HEIGHT } = require('PLConstants');

class Newsfeed extends Component {

    static propTypes = {
        token: React.PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadingTail: false,
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

    async loadNextActivities() {
        this.setState({ isLoadingTail: true });
        const { props: { token, page, dispatch } } = this;
        try {
            await Promise.race([
                dispatch(loadActivities(token, page)),
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
            this.setState({ isLoadingTail: false });
        }
    }

    _onRefresh() {
        this.props.dispatch(resetActivities());
        this.loadInitialActivities();
    }

    _onEndReached() {
        const { props: { page, count } } = this;
        if (this.state.isLoadingTail === false && count > 0) {
            this.loadNextActivities();
        }
    }

    _renderTailLoading() {
        if (this.state.isLoadingTail === true) {
            return (
                <Spinner color='gray' />
            );
        } else {
            return null;
        }
    }

    _renderZoneIcon(item) {
        if (item.zone === 'prioritized') {
            return (<Icon active name="ios-flash" style={styles.zoneIcon} />);
        } else {
            return null;
        }
    }

    _renderCarousel(item) {
        if (item.poll) {
            const slides = item.poll.educational_context.map((entry, index) => {
                return (
                    <TouchableOpacity
                        key={`entry-${index}`}
                        activeOpacity={0.7}
                        style={styles.slideInnerContainer}
                        onPress={() => { alert(`You've clicked '${title}'`); }}
                    >
                        <View style={[styles.imageContainer, (index + 1) % 2 === 0 ? styles.imageContainerEven : {}]}>
                            <Image
                                source={{ uri: entry.imageSrc }}
                                style={styles.image}
                            />
                            <View style={[styles.radiusMask, (index + 1) % 2 === 0 ? styles.radiusMaskEven : {}]} />
                        </View>
                    </TouchableOpacity>
                );
            });

            return (
                <CardItem cardBody bordered>
                    <Carousel
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        inactiveSlideScale={1}
                        inactiveSlideOpacity={1}
                        enableMomentum={true}
                        autoplay={true}
                        autoplayDelay={500}
                        autoplayInterval={2500}
                        containerCustomStyle={styles.slider}
                        contentContainerCustomStyle={styles.sliderContainer}
                        showsHorizontalScrollIndicator={false}
                        snapOnAndroid={true}
                        removeClippedSubviews={false}
                    >
                        {slides}
                    </Carousel>
                </CardItem>
            );
        } else {
            return null;
        }
    }

    _renderHeader(item) {
        var thumbnail: string = '';
        var title: string = '';

        switch (item.entity.type) {
            case 'post' || 'user-petition':
                thumbnail = item.owner.avatar_file_path ? item.owner.avatar_file_path : '';
                title = item.owner.first_name + ' ' + item.owner.last_name;
                break;
            default:
                thumbnail = item.group.avatar_file_path ? item.group.avatar_file_path : '';
                title = item.user.full_name;
                break;
        }
        return (
            <CardItem>
                <Left>
                    <Thumbnail small source={{ uri: thumbnail }} defaultSource={require("img/blank_person.png")} />
                    <Body>
                        <Text style={styles.title}>{title}</Text>
                        <Text note style={styles.subtitle}>{item.group.official_name} • <TimeAgo time={item.sent_at} hideAgo={true} /></Text>
                    </Body>
                    <Right style={{ flex: 0.2 }}>
                        <TouchableOpacity style={styles.dropDownIconContainer}>
                            <Icon name="arrow-down" style={styles.dropDownIcon} />
                        </TouchableOpacity>
                    </Right>
                </Left>
            </CardItem>
        );
    }

    _renderFooter(item) {
        switch (item.entity.type) {
            default:
                return (
                    <CardItem footer style={{ height: 35 }}>
                        <Left style={{ justifyContent: 'flex-end' }}>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon name="md-arrow-dropdown" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Upvote {item.rate_up ? item.rate_up : 0}</Label>
                            </Button>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon active name="md-arrow-dropup" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Downvote {item.rate_up ? item.rate_down : 0}</Label>
                            </Button>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon active name="undo" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Reply {item.comments_count ? item.comments_count : 0}</Label>
                            </Button>
                        </Left>
                    </CardItem>
                );
                break;
        }
    }

    _renderDescription(item) {
        var isBordered = true;
        switch (item.entity.type) {
            case 'post' || 'user-petition':
                isBordered = (item.metadata && item.metadata.image) ? false : true;
                break;
            case 'petition':
                isBordered = (item.poll && item.poll.educational_context.length) ? false : true;
                break;
            default:
                break;
        }
        return (
            <CardItem bordered={isBordered}>
                <Left style={{ flex: 0.15, flexDirection: 'column', marginTop: -10, alignSelf: 'flex-start' }}>
                    {this._renderZoneIcon(item)}
                    <Label style={styles.commentCount}>{item.responses_count}</Label>
                </Left>
                <Body style={{ marginTop: -15, marginLeft: 10 }}>
                    <Text style={styles.description}>{item.description}</Text>
                </Body>
            </CardItem>
        );
    }

    _renderMetadata(item) {
        if (item.metadata && item.metadata.image) {
            return (
                <CardItem bordered body>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.slideInnerContainer}
                        onPress={() => { alert(`You've clicked '${title}'`); }}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: item.metadata.image }}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title} numberOfLines={2}>{item.metadata.title}</Text>
                            <Text style={styles.description} numberOfLines={2}>{item.metadata.description}</Text>
                        </View>
                    </TouchableOpacity>
                </CardItem>
            );
        } else {
            return null;
        }
    }

    postCard(item) {
        return (
            <Card>
                {this._renderHeader(item)}
                {this._renderDescription(item)}
                {this._renderMetadata(item)}
                {this._renderFooter(item)}
            </Card>
        );
    }

    groupPetitionCard(item) {
        return (
            <Card>
                {this._renderHeader(item)}
                {this._renderDescription(item)}
                {this._renderCarousel(item)}
                {this._renderFooter(item)}
            </Card>
        );
    }

    groupDiscussionCard(item) {
        return null;
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
                }
                onScroll={(e) => {
                    var height = e.nativeEvent.contentSize.height;
                    var offset = e.nativeEvent.contentOffset.y;
                    if ((WINDOW_HEIGHT + offset) >= height && offset > 0) {
                        this._onEndReached();
                    }
                }}>
                <List dataArray={payload} renderRow={item => {
                    switch (item.entity.type) {
                        case 'post':
                            return this.postCard(item);
                            break;
                        case 'petition':
                            return this.groupPetitionCard(item);
                            break;
                        case 'leader-news':
                            return this.groupDiscussionCard(item);
                            break;
                        default:
                            return null;
                            break;
                    }
                }}
                />
                {this._renderTailLoading()}
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
    count: state.activities.count,
});

export default connect(mapStateToProps)(Newsfeed);