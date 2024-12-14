import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
  useCodeScanner,
  useCameraDevices,
} from 'react-native-vision-camera';

const App = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  console.log(device);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
    },
  });
  React.useEffect(() => {
    requestPermission();
  }, []);

  if (device == null)
    return (
      <View>
        <Text>No Found</Text>
      </View>
    );

  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
};

export default App;