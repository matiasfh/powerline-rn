import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, Thumbnail, CardItem, Label, Spinner, List, ListItem } from 'native-base';
import { Image, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';
import styles, { MAX_HEIGHT, MIN_HEIGHT, optionsStyles, sliderWidth, itemWidth } from './styles';
import TimeAgo from 'react-native-timeago';
import ImageLoad from 'react-native-image-placeholder';
import Carousel from 'react-native-snap-carousel';
import YouTube from 'react-native-youtube';
import Menu, {
    MenuContext,
    MenuTrigger,
    MenuOptions,
    MenuOption,
    renderers
} from 'react-native-popup-menu';
import { loadPostComments, votePost } from 'PLActions';

const { youTubeAPIKey } = require('PLEnv');

class ItemDetail extends Component {

    page: number;
    comments: Array<Object>;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
        this.page = 0;
        this.comments = [];
    }

    componentWillMount() {
        this.page = 0;
    }

    componentDidMount() {
        this.loadComments();
    }

    async loadComments() {
        const { props: { item, token, dispatch } } = this;
        if (item.entity.type === 'post') {
            this.setState({ isLoading: true });
            try {
                let response = await Promise.race([
                    loadPostComments(token, item.entity.id, this.page),
                    timeout(15000),
                ]);
                this.comments = this.comments.concat(response);
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
    }

    vote(item, option) {
        // To Do:
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

    _renderZoneIcon(item) {
        if (item.zone === 'prioritized') {
            return (<Icon active name="ios-flash" style={styles.zoneIcon} />);
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
            <CardItem style={{ paddingBottom: 0 }}>
                <Left>
                    <Thumbnail small source={thumbnail ? { uri: thumbnail } : require("img/blank_person.png")} defaultSource={require("img/blank_person.png")} />
                    <Body>
                        <Text style={styles.title}>{title}</Text>
                        <Text note style={styles.subtitle}>{item.group.official_name} • <TimeAgo time={item.sent_at} hideAgo={true} /></Text>
                    </Body>
                    <Right style={{ flex: 0.2 }}>
                        <Menu>
                            <MenuTrigger>
                                <Icon name="ios-arrow-down" style={styles.dropDownIcon} />
                            </MenuTrigger>
                            <MenuOptions customStyles={optionsStyles}>
                                <MenuOption>
                                    <Button iconLeft transparent dark>
                                        <Icon name="logo-rss" style={styles.menuIcon} />
                                        <Text style={styles.menuText}>Subscribe to this Post</Text>
                                    </Button>
                                </MenuOption>
                                <MenuOption>
                                    <Button iconLeft transparent dark>
                                        <Icon name="ios-heart" style={styles.menuIcon} />
                                        <Text style={styles.menuText}>Add to Favorites</Text>
                                    </Button>
                                </MenuOption>
                                <MenuOption>
                                    <Button iconLeft transparent dark>
                                        <Icon name="md-person-add" style={styles.menuIcon} />
                                        <Text style={styles.menuText}>Add to Contact</Text>
                                    </Button>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </Right>
                </Left>
            </CardItem>
        );
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
                <CardItem style={{ paddingTop: 0 }}>
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

    _renderMedia(item) {
        switch (item.entity.type) {
            case 'post':
            case 'user-petition':
                return this._renderMetadata(item);
                break;
            default:
                return this._renderCarousel(item);
                break;
        }
    }

    _renderFooter(item) {
        switch (item.entity.type) {
            case 'post':
                return (
                    <CardItem footer style={{ height: 35 }}>
                        <Left style={{ justifyContent: 'space-between' }}>
                            <Button iconLeft transparent style={styles.footerButton} onPress={() => this.vote(item, 'upvote')}>
                                <Icon name="md-arrow-dropup" style={styles.footerIcon} />
                                <Label style={styles.footerText}>Upvote {item.rate_up ? item.rate_up : 0}</Label>
                            </Button>
                            <Button iconLeft transparent style={styles.footerButton} onPress={() => this.vote(item, 'downvote')}>
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
                                <Label style={styles.footerText}>Downvote {item.rate_down ? item.rate_down : 0}</Label>
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

    _renderAddComment() {
        const { props: { profile } } = this;
        var thumbnail: string = '';
        thumbnail = profile.avatar_file_name ? profile.avatar_file_name : '';

        return (
            <CardItem>
                <Left>
                    <Thumbnail small source={thumbnail ? { uri: thumbnail } : require("img/blank_person.png")} defaultSource={require("img/blank_person.png")} />
                    <Body>
                        <Text style={styles.addCommentTitle}>Add Comment...</Text>
                    </Body>
                    <Right />
                </Left>
            </CardItem>
        );
    }

    _renderCommentsLoading() {
        if (this.state.isLoading === true) {
            return (
                <Spinner color='gray' />
            );
        } else {
            return null;
        }
    }

    _renderRootComment(item) {
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
            <CardItem style={{ paddingBottom: 0 }}>
                <Left>
                    <Thumbnail small style={{ alignSelf: 'flex-start' }} source={thumbnail ? { uri: thumbnail } : require("img/blank_person.png")} defaultSource={require("img/blank_person.png")} />
                    <Body style={{ alignSelf: 'flex-start' }}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description} numberOfLines={5}>{item.description}</Text>
                        <Text note style={styles.subtitle}><TimeAgo time={item.sent_at} /></Text>
                        <View style={styles.commentFooterContainer}>
                            <Button iconLeft small transparent>
                                <Icon name="md-arrow-dropup" style={styles.footerIcon} />
                                <Label style={styles.footerText}>{item.rate_up ? item.rate_up : 0}</Label>
                            </Button>
                            <Button iconLeft small transparent>
                                <Icon active name="md-arrow-dropdown" style={styles.footerIcon} />
                                <Label style={styles.footerText}>{item.rate_down ? item.rate_down : 0}</Label>
                            </Button>
                            <Button iconLeft small transparent>
                                <Icon active name="ios-undo" style={styles.footerIcon} />
                                <Label style={styles.footerText}>{item.comments_count ? item.comments_count : 0}</Label>
                            </Button>
                        </View>
                    </Body>
                    <Right style={{ flex: 0.1, alignSelf: 'flex-start' }}>
                        <Icon name="md-more" style={styles.commentMoreIcon} />
                    </Right>
                </Left>
            </CardItem>
        );
    }

    render() {
        const { props: { item } } = this;
        return (
            <MenuContext customStyles={menuContextStyles}>
                <Container style={{ flex: 1 }}>
                    <HeaderImageScrollView
                        maxHeight={MAX_HEIGHT}
                        minHeight={MIN_HEIGHT}
                        fadeOutForeground
                        renderHeader={() => (
                            <Image
                                style={styles.headerImage}
                                source={require('img/item_detail_header.png')}
                            />
                        )}
                        renderFixedForeground={() => (
                            <Animatable.View
                                style={styles.navTitleView}
                                ref={(navTitleView) => { this.navTitleView = navTitleView; }}>
                                <Header style={{ backgroundColor: 'transparent' }}>
                                    <Left>
                                        <Button transparent onPress={() => Actions.pop()}>
                                            <Icon active name="arrow-back" style={{ color: 'white' }} />
                                        </Button>
                                    </Left>
                                    <Body style={{ flex: 4 }}>
                                        <Title style={styles.navTitle}>{item.group.official_name}</Title>
                                    </Body>
                                    <Right />
                                </Header>
                            </Animatable.View>
                        )}
                        renderForeground={() => (
                            <Left style={styles.titleContainer}>
                                <Button transparent onPress={() => Actions.pop()}>
                                    <Icon active name="md-arrow-back" style={{ color: 'white' }} />
                                </Button>
                                <Body style={{ marginTop: -12 }}>
                                    <Thumbnail size={50} source={item.group.avatar_file_path ? { uri: item.group.avatar_file_path } : require("img/blank_person.png")} defaultSource={require("img/blank_person.png")} />
                                    <Text style={styles.imageTitle}>{item.group.official_name}</Text>
                                </Body>
                            </Left>
                        )}>
                        <TriggeringView
                            onHide={() => this.navTitleView.fadeInUp(200)}
                            onDisplay={() => this.navTitleView.fadeOut(100)}>
                            {this._renderHeader(item)}
                        </TriggeringView>
                        {this._renderDescription(item)}
                        {this._renderMedia(item)}
                        <View style={styles.borderContainer} />
                        {this._renderFooter(item)}
                        <View style={styles.borderContainer} />
                        {this._renderAddComment()}
                        <View style={styles.borderContainer} />
                        {this._renderRootComment(item)}
                        <List
                            dataArray={this.comments} renderRow={(comment) =>
                                <ListItem avatar style={{ paddingVertical: 5 }}>
                                    <Left>
                                        <Thumbnail small source={comment.author_picture ? { uri: comment.author_picture } : require("img/blank_person.png")} defaultSource={require("img/blank_person.png")} style={styles.thumbnail} />
                                    </Left>
                                    <Body>
                                        <Text>{comment.comment_body}</Text>
                                    </Body>
                                </ListItem>
                            }>
                        </List>
                        {this._renderCommentsLoading()}
                        <View style={{ height: 50 }} />
                    </HeaderImageScrollView>
                </Container>
            </MenuContext>
        );
    }
}

async function timeout(ms: number): Promise {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Timed out')), ms);
    });
}

const menuContextStyles = {
    menuContextWrapper: styles.container,
    backdrop: styles.backdrop,
};

const mapStateToProps = state => ({
    token: state.user.token,
    profile: state.user.profile,
});

export default connect(mapStateToProps)(ItemDetail);