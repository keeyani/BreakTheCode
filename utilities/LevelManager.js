import { getSymbolByName } from "./MathOperation";

const MINIMUM_LEVEL = 0;
const BEGINNER_LEVEL_1 = 3;
const BEGINNER_LEVEL_2 = 6;
const BEGINNER_LEVEL_3 = 10;
const MID_LEVEL_1 = 20;

export const getLevelOperation = (level) => {
  if (level <= BEGINNER_LEVEL_3) {
    return getSymbolByName("Add");
  }

  return getSymbolByName("Minus");
};

function getRandomLevel(min, max) {
  // min and max included
  let randomLevel = Math.floor(Math.random() * (max - min + 1) + min);
  return randomLevel;
}

export const getSecondOperandLevel = (minLevel, maxLevel) => {
  let minLevelAllowed = minLevel;
  let maxLevelAllowed = maxLevel;
  // if (minLevelAllowed > maxLevelAllowed) {
  //   console.log("swapping");
  //   [minLevelAllowed, maxLevelAllowed] = [maxLevelAllowed, minLevelAllowed]; // swap numbers
  // }

  if (minLevelAllowed <= BEGINNER_LEVEL_1) {
    maxLevelAllowed = Math.min(minLevelAllowed, maxLevelAllowed);
  } else if (minLevelAllowed <= BEGINNER_LEVEL_2) {
    minLevelAllowed = MINIMUM_LEVEL;
    maxLevelAllowed = Math.min(minLevelAllowed + 2, maxLevelAllowed);
  } else if (minLevelAllowed <= BEGINNER_LEVEL_3) {
    minLevelAllowed = MINIMUM_LEVEL;
    maxLevelAllowed = Math.min(minLevelAllowed + 4, maxLevelAllowed);
  } else {
    maxLevelAllowed = Math.min(minLevelAllowed, maxLevelAllowed);
  }
  return getRandomLevel(minLevelAllowed, maxLevelAllowed);
};
