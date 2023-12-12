/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { storage } from '../firebase/config'
import { FirebaseStorage, ref, listAll, getDownloadURL, list } from 'firebase/storage';

const useDisplayGallery = (path: string, listAllBoolean: (value: boolean) => false, amount: number) => {
    const [listRef, setListRef] = useState<[FirebaseStorage, string | null]>([storage, null]);

    if (listAllBoolean(true)) {
        // Use ref 
        setListRef([storage, path]);

        // List all prefixes under path
        const storageRef = ref(listRef[0], listRef[1] || undefined); // Add a null check and convert null to undefined

        const getListItems = async () => {
            try {
                const res = await listAll(storageRef);
                res.items.forEach(async (itemRef) => {
                    // For all items under list ref path, get the download URL
                    const image = await getDownloadURL(itemRef);
                });
            } catch (error) {
                console.log(error);
            }
        };

        getListItems();
    }

    // Else get the number of elements specified by amount
    const getPageItems = async () => {
        setListRef([storage, path]);
        const storageRef = ref(listRef[0], listRef[1] || undefined);

        const firstPage = await list(storageRef, { maxResults: amount });

        processItems(firstPage.items);
        await updateDisplay();
    };

    // TODO : Handle call to refresh display
    const updateDisplay = async () => {
        const processItems = (items: any[]) => {
            
            console.log(items);
        };

    };

    // Return any values or functions that you want to expose
    return {
        listRef,
        setListRef
    };
};

export default useDisplayGallery;
