import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firebase/firebse";

interface ScoreData {
    userId: string;
    score: number;
    avatar?: string;
    username?: string;
}

const useRanking = () => {
    const [ranking, setRanking] = useState<ScoreData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRanking = async () => {
            setLoading(true);
            try {
                const scoresRef = collection(db, 'scores');
                const q = query(scoresRef, orderBy('score', 'desc'));
                const querySnapshot = await getDocs(q);

                const rankingData: ScoreData[] = querySnapshot.docs.map((doc) => ({
                    userId: doc.id,
                    score: doc.data().score || 0,
                }));
                console.log(rankingData);
                console.log(ranking);
                setRanking(rankingData);
            } catch (error) {
                console.error('Error fetching ranking:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRanking();
    }, [])

    return { ranking, loading };
}

export default useRanking;