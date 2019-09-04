import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import ProductScanRNCamera from "./src/CameraComp";

export default class App extends Component {
  render() {
    return <ProductScanRNCamera />;
  }
}

const styles = StyleSheet.create({});
