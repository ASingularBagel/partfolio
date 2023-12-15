/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useAuth } from './useAuth';
import { dbref, rtdb } from '../firebase/config';
import { onValue } from 'firebase/database';

export const useAccountName = () => {
    const { user } = useAuth(); 
    const [accountName, setAccountName] = useState<string | null>(null);
  
    useEffect(() => {
      if(user) {
        const userRef = dbref(rtdb, "users/" + user.uid);
        const unsubscribe = onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
              setAccountName(data.accountName || 'Unknown');
          }
        });
        // Unsubscribe from the database when the component unmounts or user changes
        return () => unsubscribe();
      }
    }, [user]); // useEffect dependency on user
  
    return { accountName };
  };