// PermissionMessage.js
import { IPermissionMessage } from "@/types/messages";
import React from "react";
import { View, Text } from "react-native";

const PermissionMessage = ({
  permissionDenied,
  errorMessage,
}: IPermissionMessage) => {
  if (!permissionDenied && !errorMessage) {
    return null;
  }

  return (
    <View>
      {permissionDenied && (
        <Text>
          We need GPS for core app functions. Please allow GPS permissions in
          your device settings.
        </Text>
      )}
      {errorMessage && <Text>{errorMessage}</Text>}
    </View>
  );
};

export default PermissionMessage;
