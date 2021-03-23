import React, {Component} from 'react';
import {StyleSheet, Text, Animated, View, TextInput, Easing, Dimensions} from 'react-native';
import Svg, {Circle, Ellipse, G, LinearGradient, RadialGradient, Line, Path, Polygon, Polyline, Rect, Symbol, Use, Defs, Stop} from 'react-native-svg';

const {width, height, scale} = Dimensions.get("window");
let AnimatedPath = Animated.createAnimatedComponent(Path);
let AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default class AwesomeProject extends Component {
    constructor(props) {
        super(props);

        // 动画数组的初始化
        this._lineFillAnimation = new Array(this.props.phaseNumber);
        for(let i = 0; i < this.props.phaseNumber; i++){
            this._lineFillAnimation[i] = new Animated.Value(0);
        }
        this._circleFillAnimation = new Array(this.props.phaseNumber);
        for(let i = 0; i < this.props.phaseNumber; i++){
            this._circleFillAnimation[i] = new Animated.Value(0);
        }

        this.state = {
            lineFillAnimation: this._lineFillAnimation,
            circleFillAnimation: this._circleFillAnimation,
            textValue: "4",
        };
        this.dasharray = [Math.PI * 2 * 7];
        // 这里是动画的映射关系
        this.lineAnimation = [];
        for(let i = 0; i < this.props.phaseNumber - 1; i++){
            this.lineAnimation[i] = this.state.lineFillAnimation[i].interpolate({
                inputRange: [
                    0,
                    100
                ],
                outputRange: [
                    `M${width * 0.9 * 0.9 * i * 0.35 || 5} 16 H${width * 0.9 * 0.9 * i * 0.35}`,
                    `M${width * 0.9 * 0.9 * i * 0.35 || 5} 16 H${width * 0.9 * 0.9 * (i + 1) * 0.34}`,
                ]
            });
        }

        this.circleAnimation = [];
        for(let i = 0; i < this.props.phaseNumber - 1; i++){
            this.circleAnimation[i] = this.state.circleFillAnimation[i].interpolate({
                inputRange: [
                    0,
                    100,
                ],
                outputRange: [
                    this.dasharray[0],
                    0,
                ]
            })
        }
        console.log(this.state.circleFillAnimation);
        console.log(this.circleAnimation);

    }

    static defaultProps = {
        phaseNumber : 4,
    }

    componentDidMount() {
        this.animations = [];
        console.log(typeof this.state.textValue);
        console.log(typeof parseInt(this.state.textValue));
        if(parseInt(this.state.textValue) >= 2){
            this.animations.push(
                Animated.timing(
                    this.state.lineFillAnimation[0],
                    {
                        toValue: 100,
                        duration: 500,
                        easing: Easing.linear,
                    })
            );
            this.animations.push(
                Animated.timing(
                    this.state.circleFillAnimation[0],
                    {
                        toValue: 100,
                        duration: 500,
                        easing: Easing.linear,
                    }),
            );
        }
        if(parseInt(this.state.textValue) >= 3){
            this.animations.push(
                Animated.timing(
                    this.state.lineFillAnimation[1],
                    {
                        toValue: 100,
                        duration: 500,
                        easing: Easing.linear,
                    })
            );
            this.animations.push(
                Animated.timing(
                    this.state.circleFillAnimation[1],
                    {
                        toValue: 100,
                        duration: 500,
                        easing: Easing.linear,
                    }),
            );
        }
        if(parseInt(this.state.textValue) >= 4){
            this.animations.push(
                Animated.timing(
                    this.state.lineFillAnimation[2],
                    {
                        toValue: 100,
                        duration: 500,
                        easing: Easing.linear,
                    })
            );
            this.animations.push(
                Animated.timing(
                    this.state.circleFillAnimation[2],
                    {
                        toValue: 100,
                        duration: 500,
                        easing: Easing.linear,
                    }),
            );
        }
        Animated.sequence(this.animations).start();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text>当前进度</Text>
                </View>
                <Svg height="31" width={width * 0.9}>
                    <G fill="none" stroke="#3d5875">
                        <Path strokeLinecap="round" strokeWidth="4" d={`M5 16 l${width * 0.9 * 0.9} 0`}/>
                    </G>
                    <G fill="none" stroke="#00e0ff">
                        <AnimatedPath strokeLinecap="round" strokeWidth="4" d={this.lineAnimation[0]}/>
                    </G>
                    <G fill="none" stroke="#00e0ff">
                        <AnimatedPath strokeLinecap="round" strokeWidth="4" d={this.lineAnimation[1]}/>
                    </G>
                    <G fill="none" stroke="#00e0ff">
                        <AnimatedPath strokeLinecap="round" strokeWidth="4" d={this.lineAnimation[2]}/>
                    </G>

                    {/*默认的第1个阶段*/}
                    <Circle
                        cx="9" cy="16" r="7" stroke="#00e0ff" strokeWidth="2" fill="#fff"
                    />

                    {/*第2个阶段*/}
                    <Circle
                        cx={width * 0.9 * 0.33} cy="16" r="7" stroke="#3d5875" strokeWidth="2" fill="#fff"
                    />
                    <AnimatedCircle
                        cx={width * 0.9 * 0.33} cy="16" r="7" stroke="#00e0ff" strokeWidth="2" fill="#fff"
                        strokeLinecap="round"
                        origin={`${width * 0.9 * 0.33}, 16`}
                        rotation="180"
                        strokeDasharray={this.dasharray} strokeDashoffset={this.circleAnimation[0]}
                    />

                    {/*第3个阶段*/}
                    <Circle
                        cx={width * 0.9 * 0.62} cy="16" r="7" stroke="#3d5875" strokeWidth="2" fill="#fff"
                    />
                    <AnimatedCircle
                        cx={width * 0.9 * 0.62} cy="16" r="7" stroke="#00e0ff" strokeWidth="2" fill="#fff"
                        strokeLinecap="round"
                        origin={`${width * 0.9 * 0.62}, 16`}
                        rotation="180"
                        strokeDasharray={this.dasharray} strokeDashoffset={this.circleAnimation[1]}
                    />

                    <Circle
                        cx={width * 0.9 - 30} cy="16" r="7" stroke="#3d5875" strokeWidth="2" fill="#fff"
                    />
                    <AnimatedCircle
                        cx={width * 0.9 - 30} cy="16" r="7" stroke="#00e0ff" strokeWidth="2" fill="#fff"
                        strokeLinecap="round"
                        origin={`${width * 0.9 - 30}, 16`}
                        rotation="180"
                        strokeDasharray={this.dasharray} strokeDashoffset={this.circleAnimation[2]}
                    />
                </Svg>
                <View style={styles.textContainer}>
                    <Text>发起</Text>
                    <Text>征集</Text>
                    <Text>搜寻</Text>
                    <Text>完成</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        paddingLeft: 10,
        width: width * 0.9,
    },
    title:{
        alignItems: "center",
    },
    textContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
    }
});
