# 一、可能会遇到的错误
## 1. 编译时，> Task :react-native-push-notification:compileDebugJavaWithJavac FAILED
解决方案：
1. npm i react-native-push-notification@latest
2. 在 android/build.gradle 中，添加
```
buildscript {
    ext {
         //  ...
        firebaseMessagingVersion = '21.1.0'
    }
}
```
