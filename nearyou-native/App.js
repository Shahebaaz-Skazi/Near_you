import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

// EDIT THIS URL: Replace with your actual Vercel deployment URL
const VERCEL_URL = 'https://near-you-gold.vercel.app';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#080808" />
      <WebView 
        source={{ uri: VERCEL_URL }} 
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#D4A843" />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },
  webview: {
    flex: 1,
    backgroundColor: '#080808',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#080808',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
