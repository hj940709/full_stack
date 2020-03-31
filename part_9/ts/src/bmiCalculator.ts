const parseBMIArguments = (args: Array<string>): {value1: number; value2: number} => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};


export const BMICalculator = (a: number, b: number): string => {
    const index = b / Math.pow(a / 100, 2);
    let cat: string;
    if(index < 15) cat = 'Very severely underweight';
    else if(index < 16) cat = 'Severely underweight';
    else if(index < 18.5) cat = 'Underweight';
    else if(index < 25) cat = 'Normal (healthy weight)';
    else if(index < 30) cat = 'Overweight';
    else if(index < 35) cat = 'Obese Class I (Moderately obese)';
    else if(index < 40) cat = 'Obese Class II (Severely obese)';
    else cat = 'Obese Class III (Very severely obese)';
    return cat;
};


try {
  const { value1, value2 } = parseBMIArguments(process.argv);
  console.log(BMICalculator(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
