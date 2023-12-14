/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { storage } from '../firebase/config'
import { FirebaseStorage, ref, listAll, getDownloadURL, list, StorageReference } from 'firebase/storage';

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

        const firstPage = await list(storageRef, { maxResults: amount }); // Get list of first 100 elements

        const processedItems = await processItems(firstPage.items); // Process the first 100 elements to get their URL forms
        await UpdateDisplay(processedItems); // Once fetche, update the display
        
    };

    function processItems(items: StorageReference[]): Promise<string[]> {
        const urls: string[] = [];

        const promises = items.map((item) =>
            getDownloadURL(item).then((url) => {
                urls.push(url);
            })
        );

        return Promise.all(promises).then(() => urls);
    }

    // TODO : Handle call to refresh display
    const UpdateDisplay = async (processedItems : Array<string> | null) => {
        if(processedItems === null) getPageItems();
        // Update display by setting the state
        const [url, setUrl] = useState<string | null>(null);
    };

    // Return any values or functions that you want to expose
    return {
        listRef,
        setListRef
    };
};

export default useDisplayGallery;