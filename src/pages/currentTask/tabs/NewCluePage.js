import React, { Component } from "react";
import {View, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView, Dimensions} from "react-native";
import {TextInputLayout} from 'rn-textinputlayout';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import NavigationBar from "../../../components/NavigationBar";
import NavigationUtil from "../../../utils/NavigationUtil";
import ViewUtil from '../../../utils/ViewUtil';
import Feather from 'react-native-vector-icons/Feather';

const options = {
  title: '从相册选择或拍摄',
  chooseFromLibraryButtonTitle: '从相册选择',
  takePhotoButtonTitle: '拍摄',
  cancelButtonTitle: '取消',
  includeBase64: true,
  storageOptions: {
    skipBackup: true,
  },
};

const {width, height, scale} = Dimensions.get("window");
export default class NewCluePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* {
          base64 = response.base64;
          fileURI = response.uri;
          fileName = response.fileName || 'cash.jpg';
          fileType = response.type;
      } */
      imageObjs: [

      ]
    };
  }

  render() {
    const {mode} = this.state;
    const EditButton = () => {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
        >
          <Text>{this.state.mode === "edit" ? "完成" : "编辑"}</Text>
        </TouchableOpacity>
      )
    }
    const SummitButton = () => {
      return(
        <TouchableOpacity
          style={styles.button}
        >
          <Text>提交</Text>
        </TouchableOpacity>
      )
    }
    let navigationBar = <NavigationBar
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      rightButton={[<SummitButton key={1}/>]}
      title={"新建线索"}
      style={styles.navigationBar}
    />

    return (
      <View style={styles.container}>
        {navigationBar}
        <View style={styles.textCardContainer}>
          <TextInputLayout
              style={styles.inputLayout}
          >
            <TextInput
                style={styles.textInput}
                placeholder={'线索内容'}
                multiline
                textAlignVertical={'top'}
            />
          </TextInputLayout>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => launchImageLibrary(options, (response) => {
                if (!response.error) {
                  if (response.didCancel) {
                    return;
                  }
                  // console.log(response);
                  const source = {uri: response.uri};
                  this.setState((prevState) => {
                    let imageObjs = prevState.imageObjs;
                    imageObjs.push({
                      base64: response.base64,
                      fileURI: response.uri,
                      fileName: response.fileName || 'cash.jpg',
                      fileType: response.type,
                    });
                    return {imageObjs: imageObjs}
                  }, () => {
                    console.log(this.state.imageObjs);
                  })
                  this.setState({
                    uploadImage: source,
                    showUploadIcon: false,
                  })
                }
              })}>
            <View style={styles.textContainer}>
              <Feather name={"image"} style={{fontSize: 80}}/>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onBack() {
    NavigationUtil.goBack(this.props.navigation);
  }

  onPress = () => {
    this.setState((state) => {
      return {
        mode: state.mode === "edit" ? "" : "edit"
      }
    })
  }

}

const styles = StyleSheet.create({
  container:{
    width,
    height,
    backgroundColor: "#F5FCFF",
  },
  navigationBar: {
    backgroundColor: "#fff",
    elevation: 5,
    height: 50,
  },
  button:{
    padding: 8,
    marginLeft: 10,
    borderRadius: 8,
  },
  textInput: {
    marginTop: 10,
    fontSize: 14,
    height: height / 3,
  },
  inputLayout: {
    margin: 16,
  },
  textCardContainer:{
    backgroundColor: "#fefefe",
    borderBottomWidth: 1 / scale,
    borderColor: "#e8e8e8",
    borderRadius: 10,
    margin: 10,
    // ios的阴影
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    // android的阴影
    elevation: 5,
  },
  imageContainer:{
    width: 100,
    height: 100,
    backgroundColor: "#fefefe",
    borderBottomWidth: 1 / scale,
    borderColor: "#e8e8e8",
    borderRadius: 10,
    marginLeft: 10,
    // ios的阴影
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    // android的阴影
    elevation: 5,
  },
  textContainer:{
    width: 100,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  title:{
    fontWeight: "bold",
    marginRight: 5,
  },
  label:{
    flexDirection: "row",
    alignItems: "center",
  },
  description:{
    color: "#555",
  },
})
