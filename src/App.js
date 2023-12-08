import './App.css';
import firebase from './firebase';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router-dom';

firebase.initializeApp({ 
  apiKey: "AIzaSyA1qaLQXpTyabgrvBSEytzESHkfe4hT_cc",
  authDomain: "partfolio-project.firebaseapp.com",
  projectId: "partfolio-project",
  storageBucket: "partfolio-project.appspot.com",
  messagingSenderId: "1084826388216",
  appId: "1:1084826388216:web:fdd9a3136e7c7b7d7add0d",
  measurementId: "G-9GC5XVZTPZ"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      {/* If user not logged in, show sign in prompt; otherwise show main page. */}
      <section>
        {user ? <Main /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  // Sign in with Google
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}

function SignOut() {
  // Sign out
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function Main() {
  const history = useHistory();

  const goToMainPage = () => {
    history.push('/main');
  };

  return (
    goToMainPage()
  );
}
export default App;
