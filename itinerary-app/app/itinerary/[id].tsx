import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';

// Mock AI Service Stub
const fetchMockItinerary = async (id: string, destination?: string, days?: string) => {
    // In a real app, this would call an AI API
    return new Promise((resolve) => {
        setTimeout(() => {
            if (id === 'new') {
                resolve({
                    title: `Trip to ${destination}`,
                    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&w=400&q=80',
                    days: Array.from({ length: parseInt(days || '3') }, (_, i) => ({
                        day: i + 1,
                        activities: [
                            { time: '09:00 AM', title: 'Breakfast at Local Cafe', description: 'Start your day with local delicacies.' },
                            { time: '11:00 AM', title: 'Visit Historical Landmark', description: 'Explore the rich history of the area.' },
                            { time: '01:00 PM', title: 'Lunch', description: 'Enjoy a meal at a recommended restaurant.' },
                            { time: '03:00 PM', title: 'Museum Tour', description: 'See the famous art and artifacts.' },
                            { time: '07:00 PM', title: 'Dinner & Nightlife', description: 'Experience the vibrant city at night.' },
                        ]
                    }))
                });
            } else if (id === '1') {
                 resolve({
                    title: 'Weekend in Tokyo',
                    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&w=400&q=80',
                    days: [
                        {
                            day: 1,
                            activities: [
                                { time: '10:00 AM', title: 'Shibuya Crossing', description: 'See the famous scramble crossing.' },
                                { time: '01:00 PM', title: 'Sushi Lunch', description: 'Best sushi in Tsukiji.' },
                            ]
                        }
                    ]
                });
            } else {
                 resolve({
                    title: 'Paris Getaway',
                    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&w=400&q=80',
                    days: [
                        {
                            day: 1,
                            activities: [
                                { time: '09:00 AM', title: 'Eiffel Tower', description: 'Morning view from the top.' },
                                { time: '12:00 PM', title: 'Louvre Museum', description: 'See the Mona Lisa.' },
                            ]
                        }
                    ]
                });
            }
        }, 1000);
    });
};

export default function ItineraryScreen() {
  const { id, destination, days } = useLocalSearchParams();
  const [itinerary, setItinerary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMockItinerary(id as string, destination as string, days as string).then(data => {
        setItinerary(data);
        setLoading(false);
    });
  }, [id, destination, days]);

  if (loading) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Curating your experience...</Text>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: itinerary.title, headerBackTitle: 'Back', headerTransparent: true, headerTintColor: '#fff' }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroImageContainer}>
            <Image source={{ uri: itinerary.image }} style={styles.heroImage} />
            <LinearGradient
                colors={['transparent', '#1c1c1e']}
                style={styles.heroGradient}
            />
            <Animated.Text entering={FadeInUp.delay(200).duration(800)} style={styles.heroTitle}>
                {itinerary.title}
            </Animated.Text>
        </View>

        <View style={styles.itineraryContainer}>
            {itinerary.days.map((day: any, index: number) => (
                <View key={index} style={styles.dayContainer}>
                    <Text style={styles.dayTitle}>Day {day.day}</Text>
                    {day.activities.map((activity: any, actIndex: number) => (
                        <Animated.View
                            key={actIndex}
                            entering={FadeInRight.delay(400 + (index * 200) + (actIndex * 100)).duration(600)}
                            style={styles.activityCard}
                        >
                            <View style={styles.timeContainer}>
                                <Text style={styles.timeText}>{activity.time}</Text>
                            </View>
                            <View style={styles.activityContent}>
                                <Text style={styles.activityTitle}>{activity.title}</Text>
                                <Text style={styles.activityDesc}>{activity.description}</Text>
                            </View>
                        </Animated.View>
                    ))}
                </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroImageContainer: {
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
  },
  heroTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  itineraryContainer: {
    padding: 20,
  },
  dayContainer: {
    marginBottom: 30,
  },
  dayTitle: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  timeContainer: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityContent: {
    padding: 15,
    flex: 1,
  },
  activityTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityDesc: {
    color: '#aaa',
    fontSize: 14,
  },
});
