import { useEffect } from 'react';
import notificationService from '../services/notificationService';

const useNotification = () => {
  useEffect(() => {
    // setup listeners if needed
    return () => {
      // cleanup
    };
  }, []);
};

export default useNotification;
