import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

export default function GenerateScreen() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!destination || !days) return;

    setLoading(true);
    // Simulate AI delay
    setTimeout(() => {
        setLoading(false);
        // Navigate to a "new" itinerary. For demo, we use a static ID 'new' or random.
        router.push(`/itinerary/new?destination=${encodeURIComponent(destination)}&days=${encodeURIComponent(days)}`);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1c1c1e', '#2c2c2e']}
        style={styles.background}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Animated.View entering={FadeInUp.delay(100).duration(800)} style={styles.header}>
          <Text style={styles.title}>Plan Your Trip</Text>
          <Text style={styles.subtitle}>Let AI craft your perfect itinerary.</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(800)} style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Where to?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Kyoto, Japan"
              placeholderTextColor="#8e8e93"
              value={destination}
              onChangeText={setDestination}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>How many days?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 5"
              placeholderTextColor="#8e8e93"
              keyboardType="numeric"
              value={days}
              onChangeText={setDays}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, (!destination || !days) && styles.buttonDisabled]}
            onPress={handleGenerate}
            disabled={loading || !destination || !days}
          >
            <LinearGradient
                colors={loading ? ['#555', '#555'] : ['#34C759', '#30B34D']}
                style={styles.buttonGradient}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Generate Itinerary</Text>
                )}
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8e8e93',
    textAlign: 'center',
    marginTop: 10,
  },
  form: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  button: {
    height: 56,
    borderRadius: 28,
    marginTop: 10,
    overflow: 'hidden',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
