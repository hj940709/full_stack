interface Output {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number; 
}
  
const parseExerciseArguments = (args: Array<string>): {target: number; value: number[]} => {
    if (args.length < 2) throw new Error('Not enough arguments');
    let target = 0.000001;
    const value: Array<number> = [];
    for(let i = 2; i < args.length; i++){
        const temp = Number(args[i]);
        if(!isNaN(temp)){
            if(i==2) target = Math.max(temp, target);
            else value.push(temp);
            
        }
        else throw new Error('Provided values were not numbers!');
    }
    return { target, value };
};

export const ExerciseCalculator = (target: number, value: number[]): Output => {
    const periodLength = value.length;
    const trainingDays = value.filter(x=>x>0).length;
    const average = value.reduce((a , b) => a+b) / periodLength;
    const success = average > target;
    const rating = Math.floor(Math.min(average/target, 1) * 3);
    let ratingDescription: string;
    if(rating<=1) ratingDescription = 'not completed';
    else if(rating<=2) ratingDescription = 'not too bad but could be better';
    else ratingDescription = 'Completed';
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};


try {
  const { target, value } = parseExerciseArguments(process.argv);
  console.log(ExerciseCalculator(target, value));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

