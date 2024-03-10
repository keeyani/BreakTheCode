let numbersArrayBeginner = [];
let numbersArrayIntermediate = [];
let numbersArrayExpert = [];
let currentCodes = [];
const MINIMUM_LEVEL = 0;
const BEGINNER_LEVEL_1 = 3;
const BEGINNER_LEVEL_2 = 6;
const BEGINNER_LEVEL_3 = 10;
const MID_LEVEL_1 = 20;

function getRandomNumber(min, max) {
  // min and max included
  let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomLevel;
}

const getRandomNumbers = () => {
  let nums = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
};

const alphaNumbers = [
  { text: "A", numberValue: 1 },
  { text: "B", numberValue: 2 },
  { text: "C", numberValue: 3 },
  { text: "D", numberValue: 4 },
  { text: "E", numberValue: 5 },
  { text: "F", numberValue: 6 },
  { text: "G", numberValue: 7 },
  { text: "H", numberValue: 8 },
  { text: "I", numberValue: 9 },
  { text: "J", numberValue: 10 },
];

const alphaNumbersDynamic = [
  { text: "A", numberValue: 1 },
  { text: "B", numberValue: 2 },
  { text: "C", numberValue: 3 },
  { text: "D", numberValue: 4 },
  { text: "E", numberValue: 5 },
  { text: "F", numberValue: 6 },
  { text: "G", numberValue: 7 },
  { text: "H", numberValue: 8 },
  { text: "I", numberValue: 9 },
  { text: "J", numberValue: 10 },
  { text: "K", numberValue: 11 },
  { text: "L", numberValue: 12 },
  { text: "M", numberValue: 13 },
  { text: "N", numberValue: 14 },
  { text: "O", numberValue: 15 },
  { text: "P", numberValue: 16 },
  { text: "Q", numberValue: 17 },
  { text: "R", numberValue: 18 },
  { text: "S", numberValue: 19 },
  { text: "T", numberValue: 20 },
  { text: "U", numberValue: 21 },
  { text: "V", numberValue: 22 },
  { text: "W", numberValue: 23 },
  { text: "X", numberValue: 24 },
  { text: "Y", numberValue: 25 },
  { text: "Z", numberValue: 26 },
];

const getAlphaNumbers = (min, max, maxRandomValue) => {
  // Filter the numberArray based on the numberValue falling within the specified range
  let filteredArray = alphaNumbersDynamic.filter(
    ({ numberValue }) => numberValue >= min && numberValue <= max
  );

  // todo: ensure uniqueness

  // If maxRandomValue is provided, randomize numberValue within the range of numberValue and numberValue + 5
  if (maxRandomValue) {
    filteredArray = filteredArray.map(({ text, numberValue }) => {
      const randomValue =
        Math.floor(Math.random() * (maxRandomValue - numberValue + 1)) +
        numberValue;
      return { text, numberValue: randomValue };
    });
  }

  return filteredArray;
};

const getRandomAlphaNumbers = (numberOfElements, maxValue) => {
  const numElements = parseInt(numberOfElements) || 10; // Number of random elements to select
  const selectedElements = new Set();
  const maxElementsToInclude = Math.min(
    numElements + maxValue,
    alphaNumbersDynamic.length
  );

  // Select numElements random elements
  while (selectedElements.size < numElements) {
    const randomIndex = Math.floor(Math.random() * maxElementsToInclude);
    const randomElement = alphaNumbersDynamic[randomIndex];

    // Add the random element to the set
    selectedElements.add(randomElement);
  }

  // Convert the Set to an array and return
  return Array.from(selectedElements);
};

export const initializeCodes = async (level) => {
  if (level < 10) {
    currentCodes = getAlphaNumbers(1, 10, 0);
  } else if (level < 20) {
    currentCodes = getRandomAlphaNumbers(10, 5);
  } else {
    currentCodes = getAlphaNumbers(1, 10, 5);
  }
};

export const getCodes = () => {
  if (currentCodes.length === 0) {
    currentCodes = getAlphaNumbers(1, 10, 0);
  }

  return currentCodes;
};

export const getBegginnerCodes = () => {
  return alphaNumbers;
};
