import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert
} from "react-native";


const { width } = Dimensions.get("window");

export default function Onboard() {
  const [page, setPage] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Selamat Datang 🎉",
      desc: "Aplikasi ini membantu kamu mengelola aktivitas dengan mudah.",
    },
    {
      id: 2,
      title: "Cepat & Praktis ⚡",
      desc: "Nikmati fitur-fitur menarik untuk mendukung produktivitasmu.",
    },
  ];

  const handleSkip = () => {
    // sementara, nanti ganti ke navigation.navigate("Login")
   Alert.alert("Lewati ditekan", "Nanti masuk ke Login/Register");

  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const pageNumber = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setPage(pageNumber);
        }}
        scrollEventThrottle={16}
      >
        {slides.map((item) => (
          <View key={item.id} style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skip}>Lewati</Text>
        </TouchableOpacity>
        <Text style={styles.page}>
          {page + 1}/{slides.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  desc: {
    fontSize: 18,
    textAlign: "center",
    color: "#555",
    paddingHorizontal: 20,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    alignItems: "center",
  },
  skip: { fontSize: 16, color: "blue" },
  page: { fontSize: 16 },
});
