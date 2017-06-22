import React, { Component } from 'react';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, Thumbnail } from 'native-base';
import { Image, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';
import styles, { MAX_HEIGHT, MIN_HEIGHT } from './styles';

class ItemDetail extends Component {
    componentWillMount() {
        const { props: { item } } = this;
    }
    render() {
        const { props: { item } } = this;
        return (
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
                        style={styles.section}
                        onHide={() => this.navTitleView.fadeInUp(200)}
                        onDisplay={() => this.navTitleView.fadeOut(100)}>
                        <Text style={styles.title}>
                            <Text style={styles.name}>Title</Text>, (Test 2)
                        </Text>
                    </TriggeringView>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Add Comment...</Text>
                        <Text style={styles.sectionContent}>Test</Text>
                    </View>
                    <View style={[styles.section, styles.sectionLarge]}>
                        <Text style={styles.sectionTitle}>Comments</Text>
                        <View style={styles.keywords}>
                        </View>
                    </View>
                </HeaderImageScrollView>
            </Container>
        );
    }
}

export default ItemDetail;