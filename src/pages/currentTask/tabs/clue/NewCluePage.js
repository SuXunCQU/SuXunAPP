import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  Image,
  FlatList
} from "react-native";
import {TextInputLayout} from 'rn-textinputlayout';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import NavigationBar from "../../../../components/NavigationBar";
import NavigationUtil from "../../../../utils/NavigationUtil";
import ViewUtil from '../../../../utils/ViewUtil';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from "react-native-vector-icons/AntDesign";
import {Modal, Provider} from "@ant-design/react-native";

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
      successVisible: false,
      imageObjs: [

      ]
    };
  }

  options = {
    includeBase64: true,
    quality: 0.5,
  };

  selectPhoto = (response) => {
    if (!response.error) {
      if (response.didCancel) {
        return;
      }
      // console.log(response);
      const source = {uri: response.uri};
      this.setState((prevState) => {
        let imageObjs = prevState.imageObjs;
        imageObjs.push({
          // base64: response.base64,
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
          onPress={()=>{
            this.setState({
              successVisible: true,
            })
          }}
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
        <Provider>
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

            {/* 已上传的图片 */}
            {this.state.imageObjs.length ? (
                <FlatList
                    style={{width, flexGrow: 0,}}
                    contentContainerStyle={{justifyContent: "center"}}
                    numColumns={3}
                    data={this.state.imageObjs}
                    renderItem={(item, index) => {
                      return (
                          <View style={styles.imageContainer}>
                            <View style={styles.textContainer} >
                              <Image source={{uri: item.item.fileURI}} style={{width: "100%", height: "100%"}}/>
                            </View>
                          </View>
                      )
                    }}
                    keyExtractor={(item, index) => index}
                />
            ) : null}

            {/* 上传图片按钮 */}
            <View style={styles.imageContainer}>
              <TouchableOpacity
                  onPress={() => launchImageLibrary(this.options, this.selectPhoto)}
              >
                <View style={styles.textContainer}>
                  <Feather name={"image"} style={{fontSize: 80, width: "100%", height: "100%", textAlign: "center"}}/>
                </View>
              </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                visible={this.state.successVisible}
                transparent
                style={{backgroundColor: "transparent"}}

            >
              <View style={styles.modalView}>
                <View style={styles.textContainer}>
                  <AntDesign name={"checkcircleo"} style={{color: "green", fontSize: 32, marginRight: 16}}/>
                  <Text>提交成功</Text>
                </View>

                <View style={{...styles.buttonContainer, marginVertical: 0}}>
                  <TouchableOpacity
                      style={{ ...styles.openButton, backgroundColor: "#2196F3", flex: 1 }}
                      onPress={() => {
                        this.setState((prevState) => ({
                          successVisible: false
                        }))
                      }}
                  >
                    <Text style={styles.textStyle}>确认</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </Provider>
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
    marginBottom: 10,
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
    padding: 10,
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
  uploadImagesContainer:{
    width: "100%"
  },
  buttonContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalView: {
    backgroundColor: "#fefefe",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    width: "100%",
    backgroundColor: "#1890ff",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  phoneCardContainer:{
    width: 0.7 * width,
    height: 50,
    backgroundColor: "#fefefe",
    borderWidth: 1 / scale,
    borderColor: "#e8e8e8",
    borderRadius: 10,
    marginBottom: 10,
    // ios的阴影
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    // android的阴影
    elevation: 5,
  },
})
