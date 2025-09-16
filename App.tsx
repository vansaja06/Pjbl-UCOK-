import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Video from "react-native-video";
import Onboard from "./Onboarding"; // pastikan file Onboard.tsx ada

export default function App() {
  const [paused, setPaused] = useState(false);
  const [showOnboard, setShowOnboard] = useState(false);

  return (
    <View style={styles.container}>
      {showOnboard ? (
        <Onboard />
      ) : (
        <Video
          source={require("./splash10.mp4")}
          style={styles.video}
          resizeMode="cover"
          paused={paused}
          onEnd={() => {
            setPaused(true);
            setShowOnboard(true); // setelah video selesai, tampilkan Onboard
          }}
          muted={true}
          repeat={false}
          controls={false}
          poster={""}
          posterResizeMode="cover"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // fallback saat video belum kebuka
  },
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
