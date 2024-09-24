import startGame from "../../assets/images/startGame.jpg";

export const startGameContainer = {
    position: "relative",
    backgroundImage: `url(${startGame})`,
    backgroundPosition: "top center",
    backgroundSize: "cover",
    height: "100vh",
}
export const endGameContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    height: "100vh",
    background: "#010A13",
    color: "#F0E6D2",
}
export const deafetGame = {
    maxWidth: "350px",
}
export const victoryGame = {
    maxWidth: "550px",
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


