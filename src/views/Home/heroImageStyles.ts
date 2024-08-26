import heroImage from "../../assets/images/hero.jpg";

export const heroImageContainer = {
    position: "relative",
    backgroundImage: `url(${heroImage})`,
    backgroundPosition: "top center",
    backgroundSize: "cover",
    height: "100vh",
}

export const overlayHeroImage = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    background: "linear-gradient(180deg, rgba(0,0,0,0), black);",
}