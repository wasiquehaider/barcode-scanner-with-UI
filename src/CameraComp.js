import React, { Component } from "react";
import { Button, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { RNCamera } from "react-native-camera";
import BarcodeMask from "react-native-barcode-mask";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

class ProductScanRNCamera extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto
      },
      barCodeType: "",
      barcodeData: ""
    };
  }

  onBarCodeRead = scanResult => {
    // console.warn(scanResult.type);
    // console.warn(scanResult.data);
    this.setState({
      barCodeType: scanResult.type,
      barcodeData: scanResult.data
    });
    // if (scanResult.data != null) {
    //   if (!this.barcodeCodes.includes(scanResult.data)) {
    //     this.barcodeCodes.push(scanResult.data);
    //     console.warn("onBarCodeRead call");
    //   }
    // }
    return;
  };

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "lightgreen",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }

  render() {
    const { barCodeType, barcodeData } = this.state;
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          defaultTouchToFocus
          flashMode={this.state.camera.flashMode}
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          style={styles.preview}
          type={this.state.camera.type}
        />
        <BarcodeMask
          edgeColor={"#62B1F6"}
          width={250}
          height={400}
          showAnimatedLine={true}
          animatedLineColor="orange"
          animatedLineHeight={5}
          // lineAnimationDuration={1500}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
          <Text
            style={styles.scanScreenMessage}
          >{`Data: ${barcodeData} and type ${barCodeType}`}</Text>
        </View>

        <View style={[styles.overlay, styles.bottomOverlay]}>
          <TouchableOpacity
            onPress={() => {
              console.log("scan clicked");
            }}
            style={styles.btnStyle}
          >
            <Text style={[styles.text, styles.white]}>SCAN</Text>
          </TouchableOpacity>
        </View>
        {/*<View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={this.toggleScanEnable}
            title={"Scan"}
            style={styles.btnStyle}
          >
            <Text style={[styles.text, styles.white]}>SCAN</Text>
          </TouchableOpacity>
          </View> */}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  overlay: {
    position: "absolute",
    padding: 16,
    right: 0,
    left: 0
    // alignItems: "center"
  },
  topOverlay: {
    top: 0,
    flex: 1
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center"
  },
  bottomOverlay: {
    bottom: 0,
    // backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: "black",
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  white: {
    color: "#fff"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  },
  btnStyle: {
    width: WIDTH - 50,
    height: 40,
    borderRadius: 50,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center"
  }
};

export default ProductScanRNCamera;
