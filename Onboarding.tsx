import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Animated,
  Easing,
  Alert,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Onboarding() {
  const scrollRef = useRef<ScrollView>(null);
  const [page, setPage] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Kerjakan Ujian Tepat Waktu",
      desc: "Dengan menggunakan UCOK, ujian kamu akan terlaksana sesuai jadwal, lho!",
    },
    {
      id: 2,
      title: "Pantau Nilai dengan Mudah",
      desc: "Lihat hasil ujianmu kapan saja, langsung dari aplikasi.",
    },
    {
      id: 3,
      title: "Belajar Lebih Efektif",
      desc: "Dapatkan tips belajar dan progress report setiap minggu.",
    },
  ];

  // Animasi floating
  const floatAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 10,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  const handleNext = () => {
    if (page < slides.length - 1) {
      scrollRef.current?.scrollTo({ x: width * (page + 1), animated: true });
      setPage(page + 1);
    } else {
      Alert.alert("Selesai", "Masuk ke Login/Register");
    }
  };

  const handleSkip = () => {
    Alert.alert("Lewati ditekan", "Nanti masuk ke Login/Register");
  };

  return (
    <View style={styles.container}>
      {/* Floating Gambar */}
      <Animated.View
        style={[
          styles.imageWrapper,
          { transform: [{ translateY: floatAnim }] },
        ]}
      >
        <Image
          source={require("./Onboarding.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Floating Lingkaran biru */}
      <Animated.View
        style={[styles.circle, { top: 100, left: 40, transform: [{ translateY: floatAnim }] }]}
      />
      <Animated.View
        style={[styles.circle, { top: 200, right: 30, transform: [{ translateY: floatAnim }] }]}
      />
      <Animated.View
        style={[styles.circle, { bottom: 150, left: 60, transform: [{ translateY: floatAnim }] }]}
      />

      {/* Indikator (pindah ke atas, di bawah gambar) */}
      <View style={styles.dotsWrapper}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { opacity: page === i ? 1 : 0.3 },
            ]}
          />
        ))}
      </View>

      {/* Scroll untuk teks */}
      <ScrollView
        ref={scrollRef}
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
        style={styles.textSlider}
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
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipText}>Lewati</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A5DB00",
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrapper: {
    position: "absolute",
    top: height * 0.1,
    alignSelf: "center",
  },
  image: {
    width: width * 0.7,
    height: height * 0.35,
  },
  circle: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#004aad",
    opacity: 0.7,
    elevation: 20,
    
  },
  dotsWrapper: {
    position: "absolute",
    top: height * 0.55,
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#004aad", // biru yang kamu minta
    marginHorizontal: 5,
    
  },
  textSlider: {
    position: "absolute",
    bottom: 250, // teks lebih ke atas
  },
  slide: {
    width,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 26, // lebih besar
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 12,
  },
  desc: {
    fontSize: 18, // lebih besar
    textAlign: "center",
    color: "#333",
  },
  footer: {
    position: "absolute",
    bottom: 50,
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  skipBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 20,
    opacity: 0.8,
  },
  skipText: { color: "#000", fontSize: 16 },
  nextBtn: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#1E40AF",
    alignItems: "center",
    justifyContent: "center",
    
  },
  arrow: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    marginTop: -10,
  },
});
