import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const CameraDemo = () => {
  const [permission, setPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
  };

  const switchCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      MediaLibrary.saveToLibraryAsync(uri);
    }
  };

  if (permission === null) {
    return <View />;
  } else if (permission === false) {
    return <Text>No access to camera and/or camera roll</Text>;
  } else {
    const buttonStyle = {
      alignSelf: "flex-end",
      alignItems: "center",
      backgroundColor: "transparent"
    };
    const iconStyle = { color: "#fff", fontSize: 40 };
    return (
      <Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 20
          }}
        >
          <TouchableOpacity style={buttonStyle} onPress={pickImage}>
            <Ionicons name="ios-photos" style={iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity style={buttonStyle} onPress={takePicture}>
            <FontAwesome name="camera" style={iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity style={buttonStyle} onPress={switchCamera}>
            <MaterialCommunityIcons name="camera-switch" style={iconStyle} />
          </TouchableOpacity>
        </View>
      </Camera>

    );
  }
}


export default CameraDemo
