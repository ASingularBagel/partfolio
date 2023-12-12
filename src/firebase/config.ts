/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { User, getAuth, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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

export const provider = new GoogleAuthProvider();
export { auth, storage };
// const analytics = getAnalytics(app);

export async function uploadProfilePicture(file: File, path: string, setLoading: (value: boolean) => void, user: User | null) {
  const fileExtension = file.name.split('.').pop();
  const storageRef = ref(storage, path +"/"+ user?.uid+ "/" + "profile." +fileExtension);

  setLoading(true);

  const snapshot = await uploadBytes(storageRef, file).catch((error) => {console.log(error)});
  const photoURL = await getDownloadURL(storageRef);

  if(user)updateProfile(user, {photoURL});

  setLoading(false);
}


export async function uploadIllustration(file : File, path : string, setLoading : (value : boolean) => void, user : User | null){
  const storageRef = ref (storage, path +"/"+ user?.uid+ "/" + file.name)

  setLoading(true);

  const snapshot = await uploadBytes(storageRef, file).catch((error) => {console.log(error)});
  const newImage = await getDownloadURL(storageRef);
}
