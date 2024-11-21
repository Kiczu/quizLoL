import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";

const db = getFirestore();

const get = async (userId: string) => {
    const scoresRef = query(collection(db, "scores"), where("userId", "==", userId));
    const querySnapshot = await getDocs(scoresRef);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

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
};