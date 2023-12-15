/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { User, getAuth, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { UploadResult, getDownloadURL, getStorage, ref, uploadBytes, updateMetadata, deleteObject } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getDatabase,  ref as dbref, set, onValue, push, get, ThenableReference  } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1qaLQXpTyabgrvBSEytzESHkfe4hT_cc",
  authDomain: "partfolio-project.firebaseapp.com",
  projectId: "partfolio-project",
  storageBucket: "partfolio-project.appspot.com",
  messagingSenderId: "1084826388216",
  appId: "1:1084826388216:web:fdd9a3136e7c7b7d7add0d",
  measurementId: "G-9GC5XVZTPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

let operationsToRollback: { databaseWrites: Array<{ ref: ThenableReference }>, storageUploads : Array<any> } = { databaseWrites: [], storageUploads: [] };

export const provider = new GoogleAuthProvider();
export { auth, storage, db, rtdb, dbref, operationsToRollback };
// const analytics = getAnalytics(app);

export async function updateUserMetadata(user: User | null, role: Array<string>, setLoading: (value: boolean) => void, accountName: string, displayName: string, photo: File | null) {
  setLoading(true);
  if (user) {
    // Get Realtime Database reference for user document
    const userRef = dbref(rtdb, "users/" + user.uid);
    const rolesMetadata = role.map((r) => ({ role: r }));

    // Update user profile
    if (photo) {
      await uploadProfilePicture(photo, "profile-photos", setLoading, user);
    }

    await set(userRef, {
      uid: user.uid,
      displayName: displayName ? displayName : user.uid,
      photoURL: photo ? user.photoURL : null,
      backgroundURL: "",
      accountName: accountName ? "@" + accountName : "@" + user.uid,
      roles: rolesMetadata,
      followers: [""],
      following: [""],
      projects: [""],
      likedProjects: [""],
      likedPosts: [""],
      likedComments: [""],
      comments: [""],
      posts: [""],
      notifications: [""],
      messages: [""],
      chats: [""],
    }).catch((error : Error) => {
      console.log(error);
    });

    // Finally, update user info in Firebase Auth
    await updateProfile(user, { displayName }).catch((error) => {
      console.log(error);
    });
    const dummyFile = new Blob(['dummy content'], { type: 'text/plain' });
    const storageRef = ref(storage, `user-illustration/${user?.uid}/dummy.txt`);
    const storageRef2 = ref(storage, `background-photos/${user?.uid}/dummy.txt`);
    uploadBytes(storageRef, dummyFile).then(() => {console.log('Dummy file 1 uploaded');}).catch((error) => {console.log(error);});
    uploadBytes(storageRef2, dummyFile).then(() => {console.log('Dummy file 2 uploaded');}).catch((error) => {console.log(error);});
  }
  setLoading(false);
}

export async function uploadProfilePicture(file: File, path: string, setLoading: (value: boolean) => void, user: User | null) {
  setLoading(true);
  // Log the correct file extension 
  const fileExtension = file.name.split('.').pop();
  // Find file ref using naming system and file extension
  const storageRef = ref(storage, path +"/"+ user?.uid+ "/" + "profile." + fileExtension);

  // Upload image to storage
  const snapshot = await uploadBytes(storageRef, file).catch((error) => {console.log(error)});
  const photoURL = await getDownloadURL(storageRef);

  // Update user profile
  if(user)updateProfile(user, {photoURL});

  // Update metadata
  const metadata = {
    customMetadata: {
      username: user?.displayName || "",
      title: "profile",
      tag: "profile"
    }
  };
  await updateMetadata(storageRef, metadata);

  setLoading(false);
}


export async function uploadIllustration(file : File, title: string, tags : Array<string>, setLoading : (value : boolean) => void, user : User | null){
  setLoading(true);
  // Generate a random ID
  const id = Math.floor((Math.random() * 100000) + 1).toString();

  // Upload image to storage
  const storageRef = ref(storage, `user-illustration/${user?.uid}/${id}`);


  const snapshot = await uploadBytes(storageRef, file).catch((error) => {console.log(error)});
  const newImage = await getDownloadURL(storageRef);

  // Update metadata
  const metadata = {
    customMetadata: {
      username: user?.displayName || "",
      title: title,
      id : id,
      tag: tags.join(" ")
    }
  };

  await updateMetadata(storageRef, metadata);

  // Update database
  const docRef = dbref(rtdb, `users/${user?.uid}/posts/${id}`);
  await set(docRef, {
    title: title,
    tags: tags,
    image: newImage,
  }).catch((error) => {
    console.log(error);
  });
  setLoading(false);
}

export async function fetchIllustration(setLoading: (value: boolean) => void, user: User | null, id: string, setData : (value : any) => void) {
  setLoading(true);
  const docRef = dbref(rtdb, `users/${user?.uid}/posts/${id}`);
  onValue(docRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      setData(data);
      return data;
    }
  });
  setLoading(false);
}

export async function uploadPost(title: string, tags: Array<string>, user: User, setLoading: (value: boolean) => void) {
  setLoading(true);

  const postRef = dbref(rtdb, `users/${user.uid}/posts`);
  const newPostRef = push(postRef); // Creates a new ref with a unique push ID

  await set(newPostRef, {
    title: title,
    tags: tags,
    images: [],
    thumbnail: "",
  }).catch((error) => {
    console.log(error);
    return; // Exit the function early if the write fails
  });

  // Record the operation for a possible rollback
  operationsToRollback.databaseWrites.push({
    ref: newPostRef,
  });

  setLoading(false);
  return newPostRef.key; // This is the ID of the new post
}

export async function uploadIllustrationsToPost(postId: string, files: File[], user: User, setLoading: (value: boolean) => void) {
  setLoading(true);
  const postRef = dbref(rtdb, `users/${user.uid}/posts/${postId}`);
  const postSnapshot = await get(postRef);

  if (!postSnapshot.exists()) {
    console.log("Post does not exist!");
    setLoading(false);
    return;
  }

  const postData = postSnapshot.val();
  const imagesArray = postData.images || [];

  // Map each file to an upload promise but don't await here
  const uploadPromises = files.map((file) => {
    const imageStorageRef = ref(storage, `user-illustration/${user.uid}/${postId}/${file.name}`);
    return uploadBytes(imageStorageRef, file)
      .then(() => {
        // Record successful storage upload
        operationsToRollback.storageUploads.push({
          path: imageStorageRef.fullPath,
        });
        return getDownloadURL(imageStorageRef);
      })
      .then((url) => imagesArray.push(url))
      .catch((error) => {
        console.log(error);
        throw new Error('Upload failed for file: ' + file.name); // Rethrow to catch in Promise.all
      });
  });

  try {
    await Promise.all(uploadPromises);
  } catch (error) {
    console.error('One or more file uploads failed:', error);

    await rollbackChanges(operationsToRollback, setLoading);
    setLoading(false);
    return; // Exit the function early if any upload fails
  }

   // Once all files are uploaded, update the Realtime Database post entry
   await set(postRef, { ...postData, images: imagesArray, thumbnail: imagesArray[0] }).catch((error) => {
    console.log(error);
    setLoading(false);
    return;
  });

  setLoading(false);
}

export async function rollbackChanges(operations : any, setLoading: (value: boolean) => void) {
  setLoading(true);

  const storageInstance = getStorage();
  const rollbacks = [];

  // Rollback storage uploads
  for (const uploadOp of operations.storageUploads) {
    const deleteRef = ref(storageInstance, uploadOp.path);
    rollbacks.push(deleteObject(deleteRef).catch((error) => {
      console.error('Failed to delete storage object:', error);
    }));
  }

  // Rollback database writes
  for (const writeOp of operationsToRollback.databaseWrites) {
    await set(writeOp.ref, null).catch((error) => {
      console.error('Failed to rollback database write: ', error);
    });
  }

  // Clear the recorded operations after rollback
  operationsToRollback = {
    databaseWrites: [],
    storageUploads: []
  };

  await Promise.all(rollbacks);
  setLoading(false);
}
