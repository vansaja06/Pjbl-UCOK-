import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Video from "react-native-video";
import Onboard from "./Onboarding";

export default function App() {
  const [showOnboard, setShowOnboard] = useState(false);

  const handleVideoEnd = () => {
    setShowOnboard(true); // setelah video selesai, langsung tampil Onboarding
  };

  return (
    <View style={styles.container}>
      {showOnboard ? (
        <Onboard />
      ) : (
        <Video
          source={require("./splash10.mp4")}
          style={styles.video}
          resizeMode="cover"
          paused={false}
          onEnd={handleVideoEnd}
          muted={true}
          repeat={false}
          controls={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  video: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
