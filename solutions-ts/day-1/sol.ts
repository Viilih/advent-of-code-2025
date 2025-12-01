import * as fs from "fs";

const extractInput = (filePath: string): string => {
  return fs.readFileSync(filePath, "utf-8");
};

const solution = () => {
  const textContent = extractInput("./day-1/input.txt");

  const processedContent = textContent.split("\n");

  const partOne = () => {
    let countZeros = 0;

    let position = 50;

    processedContent.forEach((line) => {
      const instruction = line[0];
      const distanceValue = parseInt(line.slice(1), 10);

      if (instruction === "R") {
        position = (position - distanceValue) % 100;
      } else if (instruction === "L") {
        position = (position + distanceValue) % 100;
      }

      if (position === 0) {
        countZeros += 1;
      }
    });
  };

  const partTwo = () => {
    let counter = 0;
    let value = 50;

    processedContent.forEach((line) => {
      const instruction = line[0];
      const distanceValue = parseInt(line.slice(1), 10);
      const previousValue = value;

      if (instruction === "L") {
        value = value - distanceValue;
      } else if (instruction === "R") {
        value = value + distanceValue;
      }

      const start = Math.min(previousValue, value);
      const end = Math.max(previousValue, value);
      const passes = Math.floor(end / 100) - Math.floor((start - 1) / 100);
      counter += passes;

      if (previousValue === 0 || previousValue % 100 === 0) {
        counter -= 1;
      }
    });

    return counter;
  };
};

solution();
