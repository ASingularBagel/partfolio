/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { User, getAuth, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { UploadResult, getDownloadURL, getStorage, ref, uploadBytes, updateMetadata } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getDatabase,  ref as dbref, set  } from "firebase/database";
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

export const provider = new GoogleAuthProvider();
export { auth, storage, db, rtdb };
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


export async function uploadIllustration(file : File, path : string, setLoading : (value : boolean) => void, user : User | null){
  const storageRef = ref (storage, path +"/"+ user?.uid+ "/" + file.name)

  setLoading(true);

  const snapshot = await uploadBytes(storageRef, file).catch((error) => {console.log(error)});
  const newImage = await getDownloadURL(storageRef);
}
