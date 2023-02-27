import AsyncStorage from '@react-native-async-storage/async-storage';

import { EVENT_DETAILS_COLLECTION } from '../storageConfig';
import { IEventDetailsProps } from '../../dto/eventDetails';

export async function getEventDetails() {
  try {
    const eventDetailsStoraged = await AsyncStorage.getItem(EVENT_DETAILS_COLLECTION);

    const eventDetailsStoragedFormatted: IEventDetailsProps = eventDetailsStoraged
      ? JSON.parse(eventDetailsStoraged)
      : {};

    return eventDetailsStoragedFormatted;
  } catch (error) {
    throw error;
  }
}
