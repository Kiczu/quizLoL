import { colors } from "../../../theme/colors";

export const scoreCard = {
    backgroundColor: colors.backgroundSecondary,
    color: colors.textPrimary,
    textAlign: "center",
    p: 2,
    "@media (max-width: 900px)": {
        fontSize: "0.875rem",
        p: 1,
    },
}

export const totalScoreCard = {
    backgroundColor: colors.gold3,
    color: colors.primary,
    textAlign: "center",
    p: 2,
    "@media (max-width: 900px)": {
        fontSize: "0.875rem",
        p: 1,
    },
}