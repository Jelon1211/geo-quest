// App.tsx
import React, { useEffect } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import * as Linking from "expo-linking";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

const App = () => {
  const superFunkcjaTestowa = async () => {
    let redirect = AuthSession.makeRedirectUri().toString();
    let url = `https://sumptuous-midnight-68-staging.authkit.app`;
    // let url = `sumptuous-midnight-68-staging.authkit.app?response_type=code&client_id=${client_id}&redirect_uri=${redirect}&state=&`;
    let result = await WebBrowser.openAuthSessionAsync(url, redirect);
    console.log(result);
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl mb-6">WorkOS</Text>
      <Button title="Super funkcja testowa" onPress={superFunkcjaTestowa} />
    </View>
  );
};

export default App;
