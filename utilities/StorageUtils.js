import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const btcKeys = [
  "BTCUserId",
  "BTCUserLevel",
  "BTCCurrentLevel",
  "BTCScore",
];

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error storing data with key ${key}:`, error);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(`Error retrieving data for key ${key}:`, error);
    return null;
  }
};

export const storeMultipleData = async (dataObject) => {
  try {
    await AsyncStorage.multiSet(Object.entries(dataObject));
  } catch (error) {
    console.error("Error storing multiple items:", error);
  }
};

export const getMultipleData = async (keys) => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    const dataObject = {};
    values.forEach(([key, value]) => {
      dataObject[key] = value;
    });
    return dataObject;
  } catch (error) {
    console.error("Error retrieving multiple items:", error);
    return null;
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error retrieving data for key ${key}:`, error);
  }
};

export const removeAll = async (keys) => {
  try {
    const confirmation = await new Promise((resolve) => {
      Alert.alert("Confirmation", "Are you sure you want to reset the app?", [
        { text: "Cancel", onPress: () => resolve(false), style: "cancel" },
        { text: "OK", onPress: () => resolve(true) },
      ]);
    });

    if (confirmation) {
      await AsyncStorage.multiRemove(keys);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Error removing all keys.`, error);
  }
};

export const fetchUserInfo = async () => {
  try {
    const dataObject = await getMultipleData(btcKeys);
    const myConfigs = {};
    // Perform null check before assigning values to myConfigs
    if (dataObject) {
      Object.entries(dataObject).forEach(([key, value]) => {
        if (value !== null) {
          myConfigs[key] = value;
        }
      });
    }

    return myConfigs;
  } catch (error) {
    console.error("Error fetching BTC keys:", error);
    return null;
  }
};

export const resetUserInfo = async () => {
  try {
    const success = await removeAll(btcKeys);
    return success;
  } catch (error) {
    console.error("Error resetting user data:", error);
    return false;
  }
};
