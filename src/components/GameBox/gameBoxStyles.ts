import startGame from "../../assets/images/startGame.jpg";

export const gameBoxContainer = {
    position: "relative",
    backgroundImage: `url(${startGame})`,
    backgroundPosition: "top center",
    backgroundSize: "cover",
    height: "100vh",
}

export const overlayGameBox = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    background: "rgba(1, 10, 19, 0.7)",
}

