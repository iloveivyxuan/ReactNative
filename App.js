import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraDemo from './camera.js';

export default function App() {

  return (
    <View style={{ flex: 1 }}>
      <CameraDemo />
      </View>
  );
}
