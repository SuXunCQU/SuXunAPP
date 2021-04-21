import React, { Component } from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import avatar from '../res/images/avatar.jpeg';
import NavigationUtil from "../utils/NavigationUtil";
import {formateDate} from "../utils/dateUtils";

const {width, height, scale} = Dimensions.get("window");
const photoUrls = [
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdimg07.c-ctrip.com%2Fimages%2Ffd%2Ftg%2Fg4%2FM09%2F52%2F45%2FCggYHFZuPyKAHIlUAANmzEr5Zg8292_R_1024_10000_Q90.jpg&refer=http%3A%2F%2Fdimg07.c-ctrip.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621622832&t=3ea730c531098c112aacf588e58f3d31",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1402%2F02%2Fc13%2F30986746_1391341006743_mthumb.jpg&refer=http%3A%2F%2Fimg.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621622897&t=fd1c00e695a7d2c36e1f3c0859242ead",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.fang.com%2Falbum%2F2013_06%2F27%2F1372296238080_000.jpg&refer=http%3A%2F%2Fimg1.fang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621622945&t=8f829d07f14f0a554eccba478d0bfe42",
    "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=512167730,196035005&fm=15&gp=0.jpg",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage11.m1905.cn%2Fuploadfile%2F2016%2F0719%2F20160719093531112158.jpg&refer=http%3A%2F%2Fimage11.m1905.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621623058&t=78c29e22e2fda87981a22e16abae2a9e",
    "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1664740751,2546932349&fm=26&gp=0.jpg",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs11.sinaimg.cn%2Fmiddle%2F48d276bbta7c6d0ce087a%26690&refer=http%3A%2F%2Fs11.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621623107&t=67502c67881a4da8ad60adae364e8c79",
]
export default class MessageItem extends Component {
    render() {
        const {item} = this.props;
        return (
            <Card style={styles.cardContainer}>
                <CardTitle
                    avatarSource={avatar}
                    title={item.member_name || "指挥官"}
                    subtitle={formateDate(item.time)}
                />
                <CardContent text={item.text} />
                <View style={styles.imagesContainer}>
                    <TouchableOpacity style={styles.imageContainer}>
                        <CardImage
                            style={styles.cardImage}
                            source={{uri: photoUrls[Math.ceil(Math.random() * 7)]}}
                            resizeMode={"cover"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.imageContainer}
                    >
                        <CardImage
                            style={styles.cardImage}
                            source={{uri: photoUrls[Math.ceil(Math.random() * 7)]}}
                            resizeMode={"cover"}
                        />
                    </TouchableOpacity>
                </View>
            </Card>
        )
    }
};

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor: "#fefefe",
        borderWidth: 1 / scale,
        borderColor: "#e8e8e8",
        borderRadius: 10,
        margin: 10,
        marginBottom: 0,
        // ios的阴影
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        // android的阴影
        elevation: 5,
    },
    imagesContainer:{
        height: 180,
        flexDirection: "row",
        paddingHorizontal: 5,
    },
    imageContainer:{
        flex: 1,
    },
    cardImage:{
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#fefefe",
    },

    // textContainer:{
    //     flexDirection: "row",
    //     justifyContent: "flex-start",
    //     alignItems: "center",
    //     paddingHorizontal: 10,
    //     paddingTop: 5,
    // },
    // title:{
    //     fontWeight: "bold",
    //     marginRight: 5,
    // },
    // label:{
    //     flexDirection: "row",
    //     alignItems: "center",
    // },
    // description:{
    //     width: "88%",
    //     fontSize: 13,
    //     marginHorizontal: 10,
    //     color: "#555",
    // },
})
