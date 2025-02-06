import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firebase/firebse";

interface ScoreData {
    userId: string;
    score: number;
}

const useRanking = (selectedGameMode: string) => {
    const [ranking, setRanking] = useState<ScoreData[]>([]);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const scoresRef = collection(db, "scores");
                const rankingQuery = query(scoresRef);
                const querySnapshot = await getDocs(rankingQuery);

                const rankingData = calculateRanking(querySnapshot.docs, selectedGameMode);
                setRanking(rankingData);
            } catch (error) {
                console.error("Error fetching ranking:", error);
                setRanking([]);
            }
        };

        fetchRanking();
    }, [selectedGameMode]);

    return { ranking };
};

const calculateRanking = (docs: any[], selectedGameMode: string): ScoreData[] => {
    let rankingData: Record<string, number> = {};

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
