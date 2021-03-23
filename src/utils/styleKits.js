import { Dimensions } from "react-native";



/**
 * 屏幕宽度
 */
export const screenWidth = Dimensions.get("window").width;

/**
 * 屏幕高度
 */
export const screenHeight = Dimensions.get("window").height;

/**
 * 将px转dp
 * 手机中元素的宽度 = 手机屏幕宽度 * 设计稿中元素的宽度 / 设计稿的宽度(设置为375)
 * @param {number} elementPx 元素的宽度或者高度 单位 px
 * @returns {number}
 */
let designWidth = 375;
export const pxToDp = (elementPx) => screenWidth * elementPx / designWidth;



