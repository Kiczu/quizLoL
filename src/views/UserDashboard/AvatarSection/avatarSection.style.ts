import { colors } from "../../../theme/colors"

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
    width: 80,
    height: 80,
    backgroundColor: colors.blue1,
    "@media (max-width: 600px)": {
        width: 40,
        height: 40,
    },
}

export const avatarStyle = {
    width: 200,
    height: 200,
    backgroundColor: colors.blue2,
    "@media (max-width: 600px)": {
        width: 80,
        height: 80,
    },
}
