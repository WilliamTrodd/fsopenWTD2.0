
/*
type Operation = 'multiply' | 'add' | 'divide';


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


type Result = number;

const calculator = (a: number, b: number, op: Operation): Result => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    default:
      throw new Error('Operation is not multiply, add, or divide!')
  }
}

try {
  console.log(calculator(1,5,'divide'))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += `Error: ${error.message}`
  }
  console.log(errorMessage)
}

console.log(process.argv)
*/