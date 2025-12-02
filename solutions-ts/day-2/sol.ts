import * as fs from "fs";

const extractInput = (filePath: string): string => {
  return fs.readFileSync(filePath, "utf-8");
};

const solution = () => {
  let count = 0;
  const input = extractInput("./inpux.txt").trim();
  const ranges = input.split(",");
  const range = ranges.map((r) => r.split("-").map((num) => parseInt(num, 10)));

  const partOne = () => {
    range.forEach((r) => {
      for (let i = r[0]!; i <= r[1]!; i++) {
        const str = i.toString();
        const maxLengthOfSubstring = Math.round(str.length / 2);
        const firstHalf = str.slice(0, maxLengthOfSubstring);
        const secondHalf = str.slice(maxLengthOfSubstring);

        if (firstHalf === secondHalf) {
          count += Number.parseInt(str);
        }
      }
    });
  };

  const partTwo = () => {
    let count = 0;
    range.forEach((r) => {
      const [start, end] = r;

      for (let i = start!; i <= end!; i++) {
        const str = i.toString();
        const maxLengthOfSubstring = Math.floor(str.length / 2);

        if (recursiveCheckForSequence(str, maxLengthOfSubstring)) {
          count += i;
        }
      }
    });
    return count;
  };

  const recursiveCheckForSequence = (
    str: string,
    maxLengthOfSubstring: number
  ): boolean => {
    if (maxLengthOfSubstring <= 0) return false;

    if (str.length % maxLengthOfSubstring !== 0) {
      return recursiveCheckForSequence(str, maxLengthOfSubstring - 1);
    }

    const pattern = str.slice(0, maxLengthOfSubstring);

    for (let i = 0; i < str.length; i++) {
      const patternIndex = i % maxLengthOfSubstring;
      if (str[i] !== pattern[patternIndex]) {
        return recursiveCheckForSequence(str, maxLengthOfSubstring - 1);
      }
    }

    return true;
  };
  console.log(partTwo());
};

solution();
