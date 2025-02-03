import { useEffect, useState } from "react";
import { Scores } from "../../../api/types";
import { scoreService } from "../../../services/scoreService";

export const useScores = (userId: string | undefined) => {
    const [scores, setScores] = useState<Scores[] | null>(null);

    useEffect(() => {
        if (userId) {
            const fetchScores = async () => {
                const scoresArray = await scoreService.getUserScores(userId);
                const groupedScores = scoreService.groupScoresByGame(scoresArray);
                setScores(groupedScores);
            };
            fetchScores();
        }

    }, [userId]);
    return { scores };
}