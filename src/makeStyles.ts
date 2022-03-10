import { createMakeStyles } from "tss-react";

const theme = {};

function useTheme(){
  return theme;
}

export const { 
  makeStyles, 
  useStyles
} = createMakeStyles({ useTheme })