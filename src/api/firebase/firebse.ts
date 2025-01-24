import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, deleteUser as deleteAuthUser } from 'firebase/auth';

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

export const createUser = async ({ id, ...userData }: any) => {
    await setDoc(doc(db, "users", id), userData);
};

// export const saveUserScore = async (userId: string, gameId: string, score: number) => {
//     const scoresRef = doc(db, "scores", userId);
//     const scoreSnap = await getDoc(scoresRef);

//     let newScore = score;
//     let totalPoints = score;

//     if (scoreSnap.exists()) {
//         const existingScores = scoreSnap.data();

//         if (existingScores[gameId]) {
//             newScore += existingScores[gameId];
//         }
//         totalPoints += existingScores[gameId];
//     }

//     await setDoc(scoresRef, {
//         [gameId]: newScore,
//         totalPoints: totalPoints,
//     }, { merge: true });
// };

// export const getScores = async (userId: string) => {
//     const scoresRef = doc(db, "scores", userId);
//     const userScoresDoc = await getDoc(scoresRef);
//     if (userScoresDoc.exists()) {
//         return userScoresDoc.data();
//     } else {
//         return {};
//     }
// };

export const deleteUser = async () => {
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;

    if (user) {
        try {
            await deleteDoc(doc(db, "users", user.uid));
            await deleteAuthUser(user);
            return true;
        } catch (error) {
            return false;
        }
    }
};