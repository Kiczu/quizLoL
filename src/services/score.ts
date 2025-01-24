import { addDoc, collection, doc, getDoc, getDocs, getFirestore, increment, query, updateDoc, where } from "firebase/firestore";

const db = getFirestore();

const get = async (userId: string) => {
    // const scoresRef = query(collection(db, "scores"), where("userId", "==", userId));
    // const querySnapshot = await getDocs(scoresRef);

    // return querySnapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    // }));
    const userDoc = doc(db, "users", userId);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

const update = async (userId: string, gameId: string, score: number) => {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, {
        [`scores.${gameId}`]: increment(score),
        totalPoints: increment(score),
    });
}

const add = async (userId: string, gameId: string, score: number) => {
    await addDoc(collection(db, "scores"), {
        userId,
        gameId,
        score,
    });
}

export const scoreService = {
    get,
    add,
    update,
};