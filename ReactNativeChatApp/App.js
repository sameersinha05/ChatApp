import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Chat from './Chat';
import ChatScreenComponent from './Chat/ChatScreen/Component';

export default function App() {
  return (
    <ChatScreenComponent />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
