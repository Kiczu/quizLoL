import { colors } from "../../theme/colors";

export const inputStyle = {
    backgroundColor: colors.backgroundSecondary,
    color: colors.textPrimary,
    mb: 2,
};

export const dashboardViewContainer = {
    backgroundColor: colors.background,
    color: colors.textPrimary,
    minHeight: "100vh",
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 600px)": {
        p: 2,
    },
}

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

export const avatarStyle = {
    width: 120,
    height: 120,
    backgroundColor: colors.blue2,
    "@media (max-width: 600px)": {
        width: 80,
        height: 80,
    },
}

export const avatarGridContainer = {
    display: "flex",
    justifyContent: "space-between",
    mb: 4,
    "@media (max-width: 900px)": {
        flexDirection: "column",
        alignItems: "center",
    },
}

export const smallAvatarsGrid = {
    maxWidth: "60%",
    "@media (max-width: 900px)": {
        maxWidth: "100%",
    },
}
export const smallAvatarItem = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

export const smallAvatarStyle = {
    width: 60,
    height: 60,
    backgroundColor: colors.blue1,
    "@media (max-width: 600px)": {
        width: 40,
        height: 40,
    },
}
