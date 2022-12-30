interface BmiVals {
  h: number;
  w: number;
}

export const parseBmi = (args: Array<string>): BmiVals => {
  if (args.length < 2) throw new Error("Not enough args");
  if (args.length > 2) throw new Error("Too many args");

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      h: Number(args[0]),
      w: Number(args[1]),
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

export const calculateBmi = (h: number, w: number) => {
  const bmi = w / (h / 100) ** 2;
  let bmiStr: string;

  if (bmi >= 40) {
    bmiStr = "Obese (Class III)";
  } else if (bmi >= 35) {
    bmiStr = "Obese (Class II)";
  } else if (bmi >= 30) {
    bmiStr = "Obese (Class I)";
  } else if (bmi >= 25) {
    bmiStr = "Overweight (Pre-obese";
  } else if (bmi >= 18.5) {
    bmiStr = "Normal (healthy weight)";
  } else if (bmi >= 17) {
    bmiStr = "Underweight (Mild thinness)";
  } else if (bmi >= 16) {
    bmiStr = "Underweight (Moderate thinness)";
  } else {
    bmiStr = "Underweight (Severe thinness)";
  }

  return { weight: w, height: h, bmi: bmiStr };
};

try {
  const { h, w } = parseBmi(process.argv);
  calculateBmi(h, w);
} catch (e: unknown) {
  let errorMessage = "Something went wrong.";
  if (e instanceof Error) {
    errorMessage += " Error: " + e.message;
  }
  console.log(errorMessage);
}
