import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD_6SHqYUNm-11WYr9U2vxrWYTj0AF7Rws",
    authDomain: "quiz-lol-21e54.firebaseapp.com",
    projectId: "quiz-lol-21e54",
    storageBucket: "quiz-lol-21e54.appspot.com",
    messagingSenderId: "85626427765",
    appId: "1:85626427765:web:1bb11a9cae9e270c13db3c"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const getJinx = async () => {
    const ref = doc(db, 'champions', 'mQTzrtYjpdVEZDZxWmQ6');
    const champion = await getDoc(ref);

    const ref2 = collection(db, 'champions');
    const champions = await getDocs(ref2);

    champions.forEach(el => {
        console.log(el.data());
    })
} 
