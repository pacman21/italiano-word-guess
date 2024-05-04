import { useCallback, useState, useEffect } from "react";
import "./App.css";
import { wordsList } from "./ItalianWords";
import { Typography, Button, Box } from "@mui/material";

function App() {
  const wordsListCount = wordsList.length;
  const [activeWord, setActiveWord] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timeoutId);
  }, []);

  useEffect(() => {
    if(timer >= 60) {
      setActiveWord("");
    }
  }, [timer]);


  const nextWord = useCallback(() => {
    if(!activeWord) {
      setTimer(0);
    }

    const random = Math.floor(Math.random() * wordsListCount) - 1;
    setActiveWord(wordsList[random]);
  }, [activeWord, wordsListCount]);

  return (
    <div className="App">
      <header className="App-header">
        {!!activeWord && (
          <Typography variant="h3" pb={2} sx={{ fontSize: "1rem" }}>
            Rimangono {60 - timer} Secondi
          </Typography>
        )}
        {!!activeWord && (
          <Typography variant="h2">{activeWord.italian}</Typography>
        )}
        {!!activeWord && (
          <Typography variant="h3" pt={2} sx={{ fontSize: "1.8rem" }}>
            {activeWord.english}
          </Typography>
        )}
        {!activeWord && (
          <Typography>
            Per ricevere una parola, si prega di fare clic sul pulsante qui
            sotto. Avrai 60 secondi.
          </Typography>
        )}
        <Box pt={2}>
          <Button
            variant="contained"
            sx={{ fontSize: "1.1rem" }}
            onClick={nextWord}
          >
            {!activeWord ? "Dammi una Parola" : "Dammi un'altra Parola"}
          </Button>
        </Box>
      </header>
    </div>
  );
}

export default App;
