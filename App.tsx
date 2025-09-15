import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Video from "react-native-video";


export default function App() {
  const [paused, setPaused] = useState(false);

  return (
    <View style={styles.container}>
      <Video
        source={require("./sp7.mp4")}   
        style={styles.video}
        resizeMode="cover"              
        paused={paused}                 
        onEnd={() => setPaused(true)}  
        muted={true}                    
        repeat={false}                 
        controls={false}               
        poster={""}                     
        posterResizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",          // fallback saat video belum kebuka
  },
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
