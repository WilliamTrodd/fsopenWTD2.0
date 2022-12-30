interface BmiVals {
  h: number;
  w: number;
}

const parseBmi = (args: Array<string>): BmiVals => {
  if (args.length < 4) throw new Error("Not enough args");
  if (args.length > 4) throw new Error("Too many args");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      h: Number(args[2]),
      w: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

const calculateBmi = (h: number, w: number) => {
  const bmi = w / (h / 100) ** 2;

  if (bmi >= 40) {
    console.log("Obese (Class III)");
  } else if (bmi >= 35) {
    console.log("Obese (Class II)");
  } else if (bmi >= 30) {
    console.log("Obese (Class I)");
  } else if (bmi >= 25) {
    console.log("Overweight (Pre-obese");
  } else if (bmi >= 18.5) {
    console.log("Normal (healthy weight)");
  } else if (bmi >= 17) {
    console.log("Underweight (Mild thinness)");
  } else if (bmi >= 16) {
    console.log("Underweight (Moderate thinness)");
  } else {
    console.log("Underweight (Severe thinness)");
  }
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
