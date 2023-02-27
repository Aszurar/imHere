import AsyncStorage from '@react-native-async-storage/async-storage';

import { EVENT_DETAILS_COLLECTION } from '../storageConfig';

export async function deleteEventDetails() {
  try {
    await AsyncStorage.removeItem(EVENT_DETAILS_COLLECTION);
  } catch (error) {
    throw error;
  }
}
