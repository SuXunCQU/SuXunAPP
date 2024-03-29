import React, {Component} from "react";

import {Alert, Dimensions, Platform, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BASE_URI} from "../../../../../utils/pathMap";
// 文件操作库
// 聊天UI库
import IMUI from "aurora-imui-react-native";
import JMessage from "../../../../../utils/JMessage";
import {Color, Layout, Size} from "../../../../../utils/GlobalStyle";
import {Icon} from "react-native-elements";
import NavigationBar from "../../../../../components/NavigationBar";
import ViewUtil from "../../../../../utils/ViewUtil";
import NavigationUtil from "../../../../../utils/NavigationUtil";
import Button from "teaset/components/Button/Button";
import {pxToDp} from "../../../../../utils/styleKits";

let ReactNative = require("react-native");

// 聊天UI库中的输入组件
const InputView = IMUI.ChatInput;
// 消息展示列表
const MessageListView = IMUI.MessageList;
// 总的控制中心
const AuroraIController = IMUI.AuroraIMUIController;
// 获取屏幕相关信息
const window = Dimensions.get("window");


let theMessageId = 1;


// 负责创建各种类型的消息
function constructNormalMessage() {

    // 创建了一个消息对象
    const message = {};
    // 添加消息id
    message.msgId = theMessageId.toString();
    theMessageId += 1;
    // 消息的状态 => 发送完成
    message.status = "send_succeed";
    // 当前这条消息 是发送出去的 还是 接收回来的
    // 接收者：
    //              ：发送者
    message.isOutgoing = true;
    message.timeString = "";
    message.fromUser = {
        userId: "",
        displayName: "",
        avatarPath: "",
    };

    return message;
}

// 图片数组
let imageUrlArray = [];

class TestRNIMUI extends Component {


    state = {
        groupId: '70231526',
    }

    constructor(props) {
        super(props);
        const incident = this.props.navigation.state.params.data;
        // console.log(incident);
        let navigationBar = <NavigationBar
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            title={incident.lost_name}
            style={styles.header}
            rightButton={
                <TouchableOpacity onPress={this.showMembers}>
                    <Icon name='list'/>
                </TouchableOpacity>
            }
        />;
        let initHeight;
        if (Platform.OS === "ios") {
            initHeight = 46;
        } else {
            initHeight = 100;
        }
        this.state = {
            inputLayoutHeight: initHeight,
            messageListLayout: {flex: 1, width: window.width, margin: 0},
            inputViewLayout: {width: window.width, height: initHeight},
            isAllowPullToRefresh: false,
            navigationBar: {},
        };


        this.updateLayout = this.updateLayout.bind(this);
        this.onMsgClick = this.onMsgClick.bind(this);
        this.messageListDidLoadEvent = this.messageListDidLoadEvent.bind(this);
    }

    async componentDidMount() {
        /**
         * Android only
         * Must set menu height once, the height should be equals with the soft keyboard height so that the widget won't flash.
         * 在别的界面计算一次软键盘的高度，然后初始化一次菜单栏高度，如果用户唤起了软键盘，则之后会自动计算高度。
         */
        if (Platform.OS === "android") {
            this.refs["ChatInput"].setMenuContainerHeight(316);
        }
        this.resetMenu();
        console.log('componentDidMount');

        const {groupId} = this.state;
        const incident = this.props.navigation.state.params.data;
        console.log(incident);

        // 1. 判断groupId是否为空，为空则创建群组
        if (!groupId) {
            await JMessage.creatGroup(incident.task_name);
        }

        // 2. 加入群组
        const res = await JMessage.addGroupMembers(groupId,['18602368180']);
        console.log(res);


        // const res = await JMessage.getGroupInfo(taskId);

        // console.log(res);
        AuroraIController.addMessageListDidLoadListener(this.messageListDidLoadEvent);
    }


    messageListDidLoadEvent() {
        this.getHistoryMessage();
    }

    // 获取历史消息
    getHistoryMessage = async () => {
        // 1 获取极光的历史消息
        const username = "18602368180";
        const groupId = '70231526';
        const from = 1;
        const limit = 1000;
        console.log('groupId', groupId);
        console.log("getHistoryMsg11");
        // const historys = await JMessage.getHistoryMessagesUser(username, from, limit);
        // console.log("-------------------------------------");
        // console.log(historys);
        // console.log("-------------------------------------");

        const historys = await JMessage.getHistoryMessagesGroup(groupId, from, limit);
        console.log("-------------------------------------");
        console.log(historys);
        console.log("-------------------------------------");

        // 消息数组
        const messages = [];
        historys.forEach(v => {
            // 创建一个消息对象
            const message = constructNormalMessage();
            // 设置消息相关的用户头像
            // 发送者头像  this.props.UserStore.user.header
            // 接收者头像  this.props.route.params.header
            // 如何判断发送者和接收者
            // 获取到消息对象中的一个 from.username 等于当前的登录用户 guid
            if (v.from.username === this.props.user.username) {
                // 当前消息是输入发送者的 当前登录用户的
                message.isOutgoing = true;
                message.fromUser.avatarPath = 'http://img.fdchen.host/suxun/member/avatar.jpg';
            } else {
                message.isOutgoing = false;
                // message.fromUser.avatarPath=BASE_URI + this.props.route.params.header;
            }
            // 当前的消息类型是 图片 还是 文本
            message.msgType = "text";
            // 设置消息内容
            message.text = v.text;
            // 带上发送时间
            message.timeString = (new Date(v.creatTime)).toLocaleTimeString();
            // 图片路径
            // message.mediaPath = imageUrlArray[index];
            // 聊天消息的气泡大小
            message.contentSize = {"height": 100, "width": 200};
            // 额外数据，暂时无用
            // message.extras = { "extras": "fdfsf" };

            messages.push(message);
        });
        for (let index in imageUrlArray) {

        }
        AuroraIController.appendMessages(messages);
        AuroraIController.scrollToBottom(true);

        // for (let i = 0; i < 10; i++) {
        //   let message = constructNormalMessage()
        //   message.msgType = 'custom'

        //   if (Platform.OS === "ios") {
        //     message.content = `
        //     <h5>This is a custom message. </h5>
        //     <img src="file://${RNFS.MainBundlePath}/default_header.png"/>
        //     `
        //   } else {
        //     message.content = '<body bgcolor="#ff3399"><h5>This is a custom message. </h5>\
        //     <img src="/storage/emulated/0/XhsEmoticonsKeyboard/Emoticons/wxemoticons/icon_040_cover.png"></img></body>'
        //   }

        //   let eventMessage = constructNormalMessage()
        //   eventMessage.msgType = "event"
        //   eventMessage.text = 'fsadfad'

        //   message.contentSize = { 'height': 100, 'width': 200 }
        //   message.extras = { "extras": "fdfsf" }
        //   AuroraIController.appendMessages([message, eventMessage])
        //   AuroraIController.scrollToBottom(true)
        // }
    };


    onInputViewSizeChange = (size) => {
        console.log("onInputViewSizeChange height: " + size.height + " width: " + size.width);
        if (this.state.inputLayoutHeight != size.height) {
            this.setState({
                inputLayoutHeight: size.height,
                inputViewLayout: {width: window.width, height: size.height},
                messageListLayout: {flex: 1, width: window.width, margin: 0},
            });
        }
    };

    componentWillUnmount() {
        AuroraIController.removeMessageListDidLoadListener(this.messageListDidLoadEvent);
    }

    resetMenu() {
        if (Platform.OS === "android") {
            this.refs["ChatInput"].showMenu(false);
            this.setState({
                messageListLayout: {flex: 1, width: window.width, margin: 0},
                navigationBar: {height: 64, justifyContent: "center"},
            });
            this.forceUpdate();
        } else {
            AuroraIController.hidenFeatureView(true);
        }
    }

    /**
     * Android need this event to invoke onSizeChanged
     */
    onTouchEditText = () => {
        this.refs["ChatInput"].showMenu(false);
    };

    onFullScreen = () => {
        console.log("on full screen");
        this.setState({
            messageListLayout: {flex: 0, width: 0, height: 0},
            inputViewLayout: {flex: 1, width: window.width, height: window.height},
            navigationBar: {height: 0},
        });
    };

    onRecoverScreen = () => {
        this.setState({
            inputLayoutHeight: 100,
            messageListLayout: {flex: 1, width: window.width, margin: 0},
            inputViewLayout: {flex: 0, width: window.width, height: 100},
            navigationBar: {height: 64, justifyContent: 'center'}
        })
    };

    onAvatarClick = (message) => {
        Alert.alert();
        AuroraIController.removeMessage(message.msgId);
    };

    onMsgClick(message) {
        console.log(message);
        Alert.alert("message", JSON.stringify(message));
    }

    onMsgLongClick = (message) => {
        Alert.alert("message bubble on long press", "message bubble on long press");
    };

    onStatusViewClick = (message) => {
        message.status = "send_succeed";
        AuroraIController.updateMessage(message);
    };

    onBeginDragMessageList = () => {
        this.resetMenu();
        AuroraIController.hidenFeatureView(true);
    };

    onTouchMsgList = () => {
        AuroraIController.hidenFeatureView(true);
    };

    onPullToRefresh = () => {
        console.log("on pull to refresh");
        // let messages = [];
        // for (let i = 0; i < 14; i++) {
        //     let message = constructNormalMessage();
        //     // if (index%2 == 0) {
        //     message.msgType = "text";
        //     message.text = "" + i;
        //     // }
        //
        //     if (i % 3 == 0) {
        //         message.msgType = "video";
        //         message.text = "" + i;
        //         message.mediaPath = "/storage/emulated/0/ScreenRecorder/screenrecorder.20180323101705.mp4";
        //         message.duration = 12;
        //     }
        //     messages.push(message);
        // }
        // AuroraIController.insertMessagesToTop(messages);
        // if (Platform.OS === "android") {
        //     this.refs["MessageList"].refreshComplete();
        // }

        this.getHistoryMessage();

    };

    // 发送文本消息
    onSendText = async (text) => {
        const message = constructNormalMessage()
        message.msgType = 'text'
        message.text = text
        message.fromUser.avatarPath = "http://img.fdchen.host/suxun/member/avatar.jpg";
        AuroraIController.appendMessages([message]);

        // 极光来实现 发送文本
        const username = this.props.route.params.guid;
        const groupId = '70231526';
        // 额外的数据
        const extras = {user: JSON.stringify(this.props.user.username)};
        const res = await JMessage.sendTextMessage(groupId, text, extras);
        console.log("++++++++++++==");
        console.log(res);
        console.log("++++++++++++==");
    };

    onTakePicture = (media) => {
        console.log("media " + JSON.stringify(media));
        let message = constructNormalMessage();
        message.msgType = "image";
        message.mediaPath = media.mediaPath;
        AuroraIController.appendMessages([message]);
        this.resetMenu();
        AuroraIController.scrollToBottom(true);
    };

    onStartRecordVoice = (e) => {
        console.log("on start record voice");
    };

    onFinishRecordVoice = (mediaPath, duration) => {
        let message = constructNormalMessage();
        message.msgType = "voice";
        message.mediaPath = mediaPath;
        message.timeString = "safsdfa";
        message.duration = duration;
        AuroraIController.appendMessages([message]);
        console.log("on finish record voice");
    };

    onCancelRecordVoice = () => {
        console.log("on cancel record voice");
    };

    onStartRecordVideo = () => {
        console.log("on start record video");
    };

    onFinishRecordVideo = (video) => {
        // let message = constructNormalMessage()

        // message.msgType = "video"
        // message.mediaPath = video.mediaPath
        // message.duration = video.duration
        // AuroraIController.appendMessages([message])
    };

    // 发送图片消息
    onSendGalleryFiles = (mediaFiles) => {
        /**
         * WARN: This callback will return original image,
         * if insert it directly will high memory usage and blocking UI。
         * You should crop the picture before insert to messageList。
         *
         * WARN: 这里返回的是原图，直接插入大会话列表会很大且耗内存.
         * 应该做裁剪操作后再插入到 messageListView 中，
         * 一般的 IM SDK 会提供裁剪操作，或者开发者手动进行裁剪。
         *
         * 代码用例不做裁剪操作。
         */
        Alert.alert("fas", JSON.stringify(mediaFiles));
        for (let index in mediaFiles) {
            let message = constructNormalMessage();
            if (mediaFiles[index].mediaType == "image") {
                message.msgType = "image";
            } else {
                message.msgType = "video";
                message.duration = mediaFiles[index].duration;
            }

            message.mediaPath = mediaFiles[index].mediaPath;
            message.timeString = "8:00";
            message.status = "send_going";
            AuroraIController.appendMessages([message]);
            AuroraIController.scrollToBottom(true);
        }

        this.resetMenu();
    };

    onSwitchToMicrophoneMode = () => {
        AuroraIController.scrollToBottom(true);
    };

    onSwitchToEmojiMode = () => {
        AuroraIController.scrollToBottom(true);
    };
    onSwitchToGalleryMode = () => {
        AuroraIController.scrollToBottom(true);
    };

    onSwitchToCameraMode = () => {
        AuroraIController.scrollToBottom(true);
    };

    onShowKeyboard = (keyboard_height) => {
    };

    updateLayout(layout) {
        this.setState({inputViewLayout: layout});
    }

    onInitPress() {
        console.log("on click init push ");
        this.updateAction();
    }

    onClickSelectAlbum = () => {
        console.log("on click select album");
    };

    onCloseCamera = () => {
        console.log("On close camera event");
        this.setState({
            inputLayoutHeight: 100,
            messageListLayout: {flex: 1, width: window.width, margin: 0},
            inputViewLayout: {flex: 0, width: window.width, height: 100},
            navigationBar: {height: 64, justifyContent: "center"},
        });
    };

    /**
     * Switch to record video mode or not
     */
    switchCameraMode = (isRecordVideoMode) => {
        console.log("Switching camera mode: isRecordVideoMode: " + isRecordVideoMode);
        // If record video mode, then set to full screen.
        if (isRecordVideoMode) {
            this.setState({
                messageListLayout: {flex: 0, width: 0, height: 0},
                inputViewLayout: {flex: 1, width: window.width, height: window.height},
                navigationBar: {height: 0},
            });
        }
    };


    showMembers = () => {
        console.log('展示队员列表');
    }

    onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }

    render() {
        const incident = this.props.navigation.state.params.data;
        const taskName = incident.task_name;
        const taskId = incident.task_id;
        let navigationBar = <NavigationBar
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            titleView={<Text>taskName</Text>}
            style={styles.header}
            visible={false}
            hide={false}
            rightButton={
                <TouchableOpacity onPress={this.showMembers}>
                    <Icon name='list'/>
                </TouchableOpacity>
            }
        />;
        return (
            <View style={styles.container}>
                {/*{navigationBar}*/}
                <View style={styles.header}>
                    {ViewUtil.getLeftBackButton(() => this.onBack())}
                    <Button
                        style={styles.sendCustomBtn}
                        title={taskName}
                        titleStyle={{color: '#121212'}}
                        onPress={() => console.log('title')}
                    >
                    </Button>
                    <Icon name={'list'}/>
                </View>
                {/*<ActionButton*/}
                {/*    buttonColor="rgba(231,76,60,1)"*/}
                {/*    onPress={() => {*/}
                {/*        alert('你点了我！')*/}
                {/*    }}*/}
                {/*    renderIcon={() => (*/}
                {/*        <View style={styles.actionButtonView}>*/}
                {/*            <Text style={styles.actionButtonText}>*/}
                {/*                新增*/}
                {/*            </Text>*/}
                {/*        </View>)}*/}
                {/*/>*/}
                <View style={styles.placeholder}></View>
                <MessageListView
                    style={this.state.messageListLayout}
                    ref="MessageList"
                    // isAllowPullToRefresh={this.state.isAllowPullToRefresh}
                    onAvatarClick={this.onAvatarClick}
                    onMsgClick={this.onMsgClick}
                    onStatusViewClick={this.onStatusViewClick}
                    onTouchMsgList={this.onTouchMsgList}
                    onTapMessageCell={this.onTapMessageCell}
                    onBeginDragMessageList={this.onBeginDragMessageList}
                    avatarSize={{width: 50, height: 50}}
                    avatarCornerRadius={25}
                    messageListBackgroundColor={"#f3f3f3"}
                    sendBubbleTextSize={18}
                    sendBubbleTextColor={"#000000"}
                    sendBubblePadding={{left: 10, top: 10, right: 15, bottom: 10}}
                    datePadding={{left: 5, top: 5, right: 5, bottom: 5}}
                    dateBackgroundColor={"#F3F3F3"}
                    photoMessageRadius={5}
                    maxBubbleWidth={0.7}
                    videoDurationTextColor={"#ffffff"}
                    dateTextColor={"#666666"}
                    isShowDisplayName={false}
                />
                <InputView style={this.state.inputViewLayout}
                           ref="ChatInput"
                           onSendText={this.onSendText}
                           onTakePicture={this.onTakePicture}
                           onStartRecordVoice={this.onStartRecordVoice}
                           onFinishRecordVoice={this.onFinishRecordVoice}
                           onCancelRecordVoice={this.onCancelRecordVoice}
                           onStartRecordVideo={this.onStartRecordVideo}
                           onFinishRecordVideo={this.onFinishRecordVideo}
                           onSendGalleryFiles={this.onSendGalleryFiles}
                           onSwitchToEmojiMode={this.onSwitchToEmojiMode}
                           onSwitchToMicrophoneMode={this.onSwitchToMicrophoneMode}
                           onSwitchToGalleryMode={this.onSwitchToGalleryMode}
                           onSwitchToCameraMode={this.onSwitchToCameraMode}
                           onShowKeyboard={this.onShowKeyboard}
                           onTouchEditText={this.onTouchEditText}
                           onFullScreen={this.onFullScreen}
                           onRecoverScreen={this.onRecoverScreen}
                           onSizeChange={this.onInputViewSizeChange}
                           closeCamera={this.onCloseCamera}
                           switchCameraMode={this.switchCameraMode}
                           showSelectAlbumBtn={true}
                           showRecordVideoBtn={false}
                           onClickSelectAlbum={this.onClickSelectAlbum}
                           inputPadding={{left: 30, top: 10, right: 10, bottom: 10}}
                           galleryScale={0.6}//default = 0.5
                           compressionQuality={0.6}
                           cameraQuality={0.7}//default = 0.5
                           customLayoutItems={{
                               left: [],
                               right: ['send'],
                               bottom: ['voice', 'gallery', 'emoji', 'camera']
                           }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        ...Layout.flex.horizonVerticalCenter,
        borderWidth: Size.borderWidth,
        borderColor: Color.border,
        ...Size.header,
        backgroundColor: "white",
        justifyContent: 'space-between',
        paddingRight: pxToDp(10),
    },
    placeholder: {
        ...Size.header,
    },
    sendCustomBtn: {
        backgroundColor: "white",
        alignSelf: 'center',
        borderColor: '#121212',
        borderWidth: 0,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputView: {
        backgroundColor: "green",
        width: window.width,
        height: 100,
    },
    btnStyle: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#3e83d7",
        borderRadius: 8,
        backgroundColor: "#3e83d7",
    },
});

export default TestRNIMUI;
