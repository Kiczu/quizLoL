import { doc, setDoc, increment, collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../api/firebase/firebse";
import { Scores } from "../api/types";

const saveGameScore = async (userId: string, gameId: string, points: number) => {
    const scoreDoc = doc(db, "scores", `${userId}_${gameId}`);
    await setDoc(scoreDoc, {
        userId,
        gameId,
        score: increment(points),
        timestamp: new Date().toISOString(),
    }, { merge: true });
};

const getUserScores = async (userId: string): Promise<Scores[]> => {
    const scoresRef = collection(db, "scores");
    const userScoresQuery = query(scoresRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(userScoresQuery);

    return querySnapshot.docs.map(doc => ({
        gameId: doc.data().gameId,
        score: doc.data().score,
    }));
};

// const getGameLeaderboard = async (gameId: string) => {
//     const scoresRef = collection(db, "scores");
//     const leaderboardQuery = query(
//         scoresRef,
//         where("gameId", "==", gameId),
//         orderBy("score", "desc")
//     );
//     const querySnapshot = await getDocs(leaderboardQuery);

//     return querySnapshot.docs.map(doc => doc.data());
// };

const groupScoresByGame = (scores: Scores[]): Scores[] => {
    const grouped: Record<string, number> = {};

    scores.forEach(({ gameId, score }) => {
        if (!grouped[gameId]) {
            grouped[gameId] = 0;
        }
        grouped[gameId] += score;
    });

    return Object.entries(grouped).map(([gameId, score]) => ({
        gameId,
        score,
    }));
};

export const scoreService = {
    saveGameScore,
    getUserScores,
    // getGameLeaderboard,
    groupScoresByGame,
};