/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { fetchIllustration } from '../firebase/config';
import { useAuth } from './useAuth';

export const useFetchImage = (imageId: string) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchIllustration(() => setLoading(true), user, imageId, setData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user, imageId]);

  return { data, loading, setLoading };
};