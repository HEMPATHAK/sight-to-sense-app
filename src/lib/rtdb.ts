
import { ref, onValue, set, get, child, DatabaseReference } from 'firebase/database';
import { rtdb } from './firebase';

/**
 * Get data from a specific path in the Realtime Database
 * @param path The path to the data
 */
export const getRtdbData = async (path: string) => {
  const dataRef = ref(rtdb, path);
  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available at path:", path);
      return null;
    }
  } catch (error) {
    console.error("Error getting RTDB data:", error);
    throw error;
  }
};

/**
 * Set data at a specific path in the Realtime Database
 * @param path The path where to set the data
 * @param data The data to set
 */
export const setRtdbData = async (path: string, data: any) => {
  const dataRef = ref(rtdb, path);
  try {
    await set(dataRef, data);
    return true;
  } catch (error) {
    console.error("Error setting RTDB data:", error);
    throw error;
  }
};

/**
 * Subscribe to real-time updates at a specific path
 * @param path The path to listen to
 * @param callback Function to call with the updated data
 * @returns A function to unsubscribe from the updates
 */
export const subscribeToRtdbPath = (path: string, callback: (data: any) => void) => {
  const dataRef = ref(rtdb, path);
  const unsubscribe = onValue(dataRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      callback(null);
    }
  }, (error) => {
    console.error("RTDB subscription error:", error);
  });
  
  // Return unsubscribe function
  return unsubscribe;
};
