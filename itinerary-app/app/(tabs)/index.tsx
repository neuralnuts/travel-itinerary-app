import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function HomeScreen() {
  const router = useRouter();

  const recentItineraries = [
    { id: '1', title: 'Weekend in Tokyo', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&w=400&q=80' },
    { id: '2', title: 'Paris Getaway', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&w=400&q=80' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.background}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInDown.delay(100).duration(1000)} style={styles.header}>
          <Text style={styles.title}>Your Journeys</Text>
          <Text style={styles.subtitle}>Where to next?</Text>
        </Animated.View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Itineraries</Text>
          {recentItineraries.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(200 + index * 100).duration(800)}
            >
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push(`/itinerary/${item.id}` as any)}
              >
                <ImageBackground source={{ uri: item.image }} style={styles.cardImage} imageStyle={{ borderRadius: 16 }}>
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.cardGradient}
                  >
                    <Text style={styles.cardTitle}>{item.title}</Text>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        <Animated.View entering={FadeInDown.delay(500).duration(1000)} style={styles.ctaContainer}>
            <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/(tabs)/generate')}>
                <LinearGradient
                    colors={['#ff7e5f', '#feb47b']}
                    style={styles.ctaGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.ctaText}>Plan a New Trip ✨</Text>
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 80,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  card: {
    height: 200,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardGradient: {
    padding: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  ctaContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  ctaButton: {
    width: '100%',
    height: 60,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  ctaGradient: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
