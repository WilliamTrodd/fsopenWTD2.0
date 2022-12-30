interface exerciseVals {
  dailyHours: number[];
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExercise = (args: Array<string>): exerciseVals => {
  if (args.length < 4) throw new Error("Not enough args");

  const hours: number[] = args.slice(3).map((h) => Number(h));
  const target: number = Number(args[2]);

  if (hours.includes(NaN) || isNaN(target)) {
    throw new Error("Provided values were not numbers");
  } else {
    return {
      dailyHours: hours,
      target: target,
    };
  }
};

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const total: number = dailyHours.length;
  const trained: number = dailyHours.filter((h) => h > 0).length;
  const avg: number = dailyHours.reduce((s, d) => s + d, 0) / total;

  let rating: number = 1;

  if (avg - target < -2) {
    rating = 3;
  } else if (avg - target < 0) {
    rating = 2;
  }

  let desc: string;
  switch (rating) {
    case 1:
      desc = "Great job";
      break;
    case 2:
      desc = "not too bad but could be better";
      break;
    case 3:
      desc = "oof let's get those numbers up";
      break;
    default:
      throw new Error("Rating is not 1 2 or 3.");
  }

  return {
    periodLength: total,
    trainingDays: trained,
    success: avg >= target,
    rating: rating,
    ratingDescription: desc,
    target: target,
    average: avg,
  };
};

try {
  const { dailyHours, target } = parseExercise(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (e: unknown) {
  let errorMessage = "Something went wrong.";
  if (e instanceof Error) {
    errorMessage += " Error: " + e.message;
  }
  console.log(errorMessage);
}
