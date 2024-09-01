const getHangmanElementVisibility = (
  wrongGuesses: number,
  elementIndex: number
) => {
  if (wrongGuesses >= elementIndex) {
    return "visible";
  }
  return "hidden";
};

const hangmanContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  padding: "20px",
};

const HangmanSvg = ({ wrongGuesses }: any) => {
  return (
    <div style={hangmanContainerStyle}>
      <svg
        width="150"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlSpace="preserve"
      >
        <style>
          {`
          .hangman-part {
            transition: opacity 0.5s ease-in-out;
            opacity: 0;
          }
          .hangman-part.visible {
            opacity: 1;
          }
          .rope {
            stroke: #8B4513;
          }
          .ground {
            stroke: #654321;
            stroke-width: 6;
          }
          .gallows {
            stroke: #000000;
            stroke-width: 6;
          }
          .body-part {
            stroke: #ff0000;
            stroke-width: 4;
          }
        `}
        </style>
        <g>
          {/* GALLOWS */}
          <line className="ground" x1="10" y1="180" x2="100" y2="180" />
          <line className="gallows" x1="50" y1="20" x2="50" y2="180" />
          <line className="gallows" x1="50" y1="20" x2="120" y2="20" />
          <line className="gallows" x1="50" y1="60" x2="90" y2="20" />
          <line className="rope" x1="120" y1="20" x2="120" y2="60" />

          {/* BODY */}
          <ellipse
            cx="120"
            cy="75"
            rx="15"
            ry="15"
            className={`hangman-part body-part ${getHangmanElementVisibility(
              wrongGuesses,
              1
            )}`}
          />
          <line
            x1="120"
            y1="90"
            x2="120"
            y2="140"
            className={`hangman-part body-part ${getHangmanElementVisibility(
              wrongGuesses,
              2
            )}`}
          />
          <line
            x1="120"
            y1="110"
            x2="150"
            y2="100"
            className={`hangman-part body-part ${getHangmanElementVisibility(
              wrongGuesses,
              3
            )}`}
          />
          <line
            x1="120"
            y1="110"
            x2="90"
            y2="100"
            className={`hangman-part body-part ${getHangmanElementVisibility(
              wrongGuesses,
              4
            )}`}
          />
          <line
            x1="120"
            y1="140"
            x2="140"
            y2="170"
            className={`hangman-part body-part ${getHangmanElementVisibility(
              wrongGuesses,
              5
            )}`}
          />
          <line
            x1="120"
            y1="140"
            x2="100"
            y2="170"
            className={`hangman-part body-part ${getHangmanElementVisibility(
              wrongGuesses,
              6
            )}`}
          />
        </g>
      </svg>
    </div>
  );
};

export default HangmanSvg;
