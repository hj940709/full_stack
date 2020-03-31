type Operation = 'multiply' | 'add' | 'divide';
type Result = string | number | undefined;

const calculator = (a: number, b: number, op: Operation): Result => {
    if (op === 'multiply') {
      return a * b;
    } else if (op === 'add') {
      return a + b;
    } else if (op === 'divide') {
      if (b === 0) return 'can\'t divide by 0!';
      return a / b;
    }
    else return NaN;
};

const a = Number(process.argv[2]);
const b = Number(process.argv[3]);
const op = 'divide';

try {
    console.log(calculator(a, b, op));
} catch (e) {
    console.log('Something went wrong, error message: ', e.message);
}