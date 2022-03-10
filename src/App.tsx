import { useState, useCallback, useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { makeStyles } from "./makeStyles";

import "./App.css";

type Align = "left" | "center" | "right";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [timer, setTimer] = useState(100);
  const [isClocking, setIsClocking] = useState(false);
  const [align, setAlign] = useState<Align>("left");

  const { classes, cx } = useStyles({ align });

  useEffect(() => {
    const interval = setInterval(() => {
      if (isClocking) {
        const newTimer = timer - 1;
        setTimer(newTimer);
        if (newTimer <= 0) {
          setIsClocking(false);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer, isClocking]);

  const resetTimer = useCallback(() => {
    if (inputRef.current) {
      setTimer(parseInt(inputRef.current.value));
    }
  }, []);

  const toggleTimer = useCallback(() => {
    setIsClocking((prev) => !prev);
  }, []);

  return (
    <Stack className="App" sx={{ p: 5 }} spacing={4}>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button
          variant={align === "left" ? "contained" : "outlined"}
          onClick={() => setAlign("left")}
        >
          Left
        </Button>
        <Button
          variant={align === "center" ? "contained" : "outlined"}
          onClick={() => setAlign("center")}
        >
          Center
        </Button>
        <Button
          variant={align === "right" ? "contained" : "outlined"}
          onClick={() => setAlign("right")}
        >
          Right
        </Button>
      </ButtonGroup>
      <Box className={cx(classes.root)}>
        <Stack spacing={2} sx={{ maxWidth: 480 }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              disabled={isClocking}
              onClick={toggleTimer}
            >
              Start
            </Button>
            <Button
              variant="outlined"
              disabled={!isClocking}
              onClick={toggleTimer}
            >
              Stop
            </Button>
            <Button variant="outlined" onClick={resetTimer}>
              Reset
            </Button>
          </Stack>
          <TextField
            id="outlined-basic"
            label="Set Time"
            defaultValue={100}
            inputRef={inputRef}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          <Typography variant="h3" color="text.secondary" gutterBottom>
            {timer}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}

const useStyles = makeStyles<{ align: Align }>({
  name: { App },
})((theme, { align }) => ({
  root: {
    display: "flex",
    justifyContent: align,
  },
}));

export default App;
