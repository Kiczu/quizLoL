import { colors } from "./colors";

export const typography = {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 14,
    h1: {
        fontSize: "2.5rem",
        fontWeight: 400,
        lineHeight: 1.2,
        color: `${colors.gold2}`,
    },
    h2: {
        fontSize: "2rem",
        fontWeight: 500,
        lineHeight: 1.3,
    },
    h3: {
        fontSize: "1.75rem",
        fontWeight: 500,
        lineHeight: 1.35,
    },
    body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
    },
    body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.43,
    },
    button: {
        fontSize: "0.875rem",
        fontWeight: 700,
        textTransform: "uppercase",
    },
};
