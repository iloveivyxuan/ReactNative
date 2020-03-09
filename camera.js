import React, { useState, useEffect, useRef } from "react";
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Text, View, TouchableOpacity } from "react-native";

const CameraDemo = () => {
  const [permission, setPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    const askPermissions = async () => {
      const cameraRollPermission = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      );
      const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
      setPermission(
        cameraRollPermission.status === "granted" &&
        cameraPermission.status === "granted"
      );
    };
    askPermissions();
  }, []);

  if (permission === null) {
    return <View />;
  } else if (permission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.cameraType}>

          </Camera>
      </View>
    );
  }
}

export default CameraDemo;
