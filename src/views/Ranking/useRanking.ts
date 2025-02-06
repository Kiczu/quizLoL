import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firebase/firebse";

interface ScoreData {
    userId: string;
    score: number;
}

const useRanking = (selectedGameMode: string) => {
    const [ranking, setRanking] = useState<ScoreData[]>([]);

    useEffect(() => {
        fetchRanking(selectedGameMode).then(setRanking).catch(() => setRanking([]));
    }, [selectedGameMode]);

    return { ranking };
};

const fetchRanking = async (selectedGameMode: string): Promise<ScoreData[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "scores"));
        return processRankingData(querySnapshot.docs, selectedGameMode);
    } catch (error) {
        console.error("Error fetching ranking:", error);
        return [];
    }
};

const processRankingData = (docs: any[], selectedGameMode: string): ScoreData[] => {
    const rankingData: Record<string, number> = {};

    docs.forEach((doc) => {
        const [userId, gameMode] = doc.id.split("_");
        const score = doc.data().score || 0;

        if (selectedGameMode === "TotalScore") {
            rankingData[userId] = (rankingData[userId] || 0) + score;
        } else if (gameMode === selectedGameMode) {
            rankingData[userId] = score;
        }
    });

    return Object.entries(rankingData)
        .map(([userId, score]) => ({ userId, score }))
        .sort((a, b) => b.score - a.score);
};

export default useRanking;
