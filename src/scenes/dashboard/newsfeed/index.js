
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, Item, Input, Grid, Row, Col, Spinner, ListItem, Thumbnail, List, Card, CardItem, Label } from 'native-base';
import { View, RefreshControl, TouchableOpacity, Image, WebView, Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { loadActivities, resetActivities } from 'PLActions';
import styles, { sliderWidth, itemWidth } from './styles';
import TimeAgo from 'react-native-timeago';
import ImageLoad from 'react-native-image-placeholder';
import YouTube from 'react-native-youtube';

const PLColors = require('PLColors');
const { WINDOW_HEIGHT } = require('PLConstants');
const { youTubeAPIKey } = require('PLEnv');

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

    youtubeGetID(url) {
        var ID = '';
        url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        }
        else {
            ID = url;
        }
        return ID;
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

    _renderContext(entry) {
        if (entry.type === "image") {
            return (
                <ImageLoad
                    placeholderSource={require('img/empty_image.png')}
                    source={{ uri: entry.imageSrc }}
                    style={styles.image}
                />
            );
        }
        else if (entry.type === "video") {
            var url = entry.text.toString();
            var videoid = this.youtubeGetID(url);
            if (Platform.OS === 'ios') {
                return (
                    <YouTube
                        ref={(component) => {
                            this._youTubeRef = component;
                        }}
                        apiKey={youTubeAPIKey}
                        videoId={videoid}
                        controls={1}
                        style={styles.player}
                    />
                );
            } else {
                return (
                    <WebView
                        style={styles.player}
                        javaScriptEnabled={true}
                        source={{ uri: `https://www.youtube.com/embed/${videoid}?rel=0&autoplay=0&showinfo=0&controls=0` }}
                    />
                );
            }
        }
        else {
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
                    >
                        <View style={[styles.imageContainer, (index + 1) % 2 === 0 ? styles.imageContainerEven : {}]}>
                            {this._renderContext(entry)}
                            <View style={[styles.radiusMask, (index + 1) % 2 === 0 ? styles.radiusMaskEven : {}]} />
                        </View>
                    </TouchableOpacity>
                );
            });

            return (
                <CardItem cardBody>
                    <Carousel
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        inactiveSlideScale={1}
                        inactiveSlideOpacity={1}
                        enableMomentum={true}
                        autoplay={false}
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

    _renderTitle(item) {
        if (item.title) {
            return (<Text style={styles.title}>{item.title}</Text>);
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
                    <Thumbnail small source={thumbnail ? { uri: thumbnail } : require("img/blank_person.png")} defaultSource={require("img/blank_person.png")} />
                    <Body>
                        <Text style={styles.title}>{title}</Text>
                        <Text note style={styles.subtitle}>{item.group.official_name} • <TimeAgo time={item.sent_at} hideAgo={true} /></Text>
                    </Body>
                    <Right style={{ flex: 0.2 }}>
                        <TouchableOpacity style={styles.dropDownIconContainer}>
                            <Icon name="ios-arrow-down" style={styles.dropDownIcon} />
                        </TouchableOpacity>
                    </Right>
                </Left>
            </CardItem>
        );
    }

    _renderFooter(item) {
        switch (item.entity.type) {
            case 'post':
                return (
                    <CardItem footer style={{ height: 35 }}>
                        <Left style={{ justifyContent: 'flex-end' }}>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon name="md-arrow-dropup" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Upvote {item.rate_up ? item.rate_up : 0}</Label>
                            </Button>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon active name="md-arrow-dropdown" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Downvote {item.rate_up ? item.rate_down : 0}</Label>
                            </Button>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon active name="ios-undo" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Reply {item.comments_count ? item.comments_count : 0}</Label>
                            </Button>
                        </Left>
                    </CardItem>
                );
                break;
            case 'petition':
            case 'user-petition':
                return (
                    <CardItem footer style={{ height: 35 }}>
                        <Left style={{ justifyContent: 'flex-end' }}>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon name="md-arrow-dropdown" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Sign</Label>
                            </Button>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon active name="ios-undo" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Reply {item.comments_count ? item.comments_count : 0}</Label>
                            </Button>
                        </Left>
                    </CardItem>
                );
                break;
            case 'question':
                return (
                    <CardItem footer style={{ height: 35 }}>
                        <Left style={{ justifyContent: 'flex-end' }}>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon name="md-arrow-dropdown" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Answer</Label>
                            </Button>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon active name="ios-undo" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Reply {item.comments_count ? item.comments_count : 0}</Label>
                            </Button>
                        </Left>
                    </CardItem>
                );
                break;
            case 'payment-request':
                return (
                    <CardItem footer style={{ height: 35 }}>
                        <Left style={{ justifyContent: 'flex-end' }}>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon name="md-arrow-dropdown" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Pay</Label>
                            </Button>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon active name="ios-undo" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Reply {item.comments_count ? item.comments_count : 0}</Label>
                            </Button>
                        </Left>
                    </CardItem>
                );
                break;
            case 'leader-event':
                return (
                    <CardItem footer style={{ height: 35 }}>
                        <Left style={{ justifyContent: 'flex-end' }}>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon name="md-arrow-dropdown" style={styles.footerIcon} />
                                <Label style={styles.footerText}>RSVP</Label>
                            </Button>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon active name="ios-undo" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Reply {item.comments_count ? item.comments_count : 0}</Label>
                            </Button>
                        </Left>
                    </CardItem>
                );
                break;
            case 'leader-news':
                return (
                    <CardItem footer style={{ height: 35 }}>
                        <Left style={{ justifyContent: 'flex-end' }}>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon name="md-arrow-dropdown" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Discuss</Label>
                            </Button>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon active name="ios-undo" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Reply {item.comments_count ? item.comments_count : 0}</Label>
                            </Button>
                        </Left>
                    </CardItem>
                );
                break;
            default:
                return (
                    <CardItem footer style={{ height: 35 }}>
                        <Left style={{ justifyContent: 'flex-end' }}>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon name="md-arrow-dropup" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Upvote {item.rate_up ? item.rate_up : 0}</Label>
                            </Button>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon active name="md-arrow-dropdown" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Downvote {item.rate_up ? item.rate_down : 0}</Label>
                            </Button>
                            <Button iconLeft transparent style={styles.footerButton}>
                                <Icon active name="ios-undo" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Reply {item.comments_count ? item.comments_count : 0}</Label>
                            </Button>
                        </Left>
                    </CardItem>
                );
                break;
        }
    }

    _renderDescription(item) {
        return (
            <CardItem>
                <Left>
                    <View style={styles.descLeftContainer}>
                        {this._renderZoneIcon(item)}
                        <Label style={styles.commentCount}>{item.responses_count}</Label>
                    </View>
                    <Body style={styles.descBodyContainer}>
                        {this._renderTitle(item)}
                        <Text style={styles.description} numberOfLines={5}>{item.description}</Text>
                    </Body>
                </Left>
            </CardItem>
        );
    }

    _renderMetadata(item) {
        if (item.metadata && item.metadata.image) {
            return (
                <CardItem>
                    <Left>
                        <View style={styles.descLeftContainer} />
                        <Body>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.metaContainer}
                                onPress={() => { alert(`You've clicked metadata`); }}>
                                <View style={styles.imageContainer}>
                                    <ImageLoad
                                        placeholderSource={require('img/empty_image.png')}
                                        source={{ uri: item.metadata.image }}
                                        style={styles.image}
                                    />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title} numberOfLines={2}>{item.metadata.title}</Text>
                                    <Text style={styles.description} numberOfLines={2}>{item.metadata.description}</Text>
                                </View>
                            </TouchableOpacity>
                        </Body>
                    </Left>
                </CardItem>
            );
        } else {
            return null;
        }
    }

    postOrUserPetitionCard(item) {
        return (
            <Card>
                {this._renderHeader(item)}
                {this._renderDescription(item)}
                {this._renderMetadata(item)}
                <View style={styles.borderContainer} />
                {this._renderFooter(item)}
            </Card>
        );
    }

    groupCard(item) {
        return (
            <Card>
                {this._renderHeader(item)}
                {this._renderDescription(item)}
                {this._renderCarousel(item)}
                <View style={styles.borderContainer} />
                {this._renderFooter(item)}
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
                        case 'user-petition':
                            return this.postOrUserPetitionCard(item);
                            break;
                        default:
                            return this.groupCard(item);
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