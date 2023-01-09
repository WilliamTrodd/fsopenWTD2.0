type Operation = "multiply" | "add" | "divide";

/*
const calculator = (a: number, b: number, op: Operation): number => {
  if (op === 'multiply') {
    return a * b;
  } else if (op === 'add') {
    return a + b;
  } else if (op === 'divide') {
    if (b === 0) return 'can\'t divide by 0';
    return a / b;
  }
}
*/

type Result = number;

export const calculator = (a: number, b: number, op: Operation): Result => {
  switch (op) {
    case "multiply":
      return a * b;
    case "add":
      return a + b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    default:
      throw new Error("Operation is not multiply, add, or divide!");
  }
};

try {
  const a = Number(process.argv[2]);
  const b = Number(process.argv[3]);
  const op = process.argv[4] as Operation;
  console.log(calculator(a, b, op));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += `Error: ${error.message}`;
  }
  console.log(errorMessage);
}
