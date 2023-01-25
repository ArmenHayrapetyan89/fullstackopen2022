interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const exerciseCalculator = (
  hours: Array<number>,
  target: number
): Result => {
  hours.map((hour) => {
    if (isNaN(Number(hour))) {
      throw new Error("Provided values were not numbers!");
    }
  });

  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const average =
    hours.reduce((accumulator, value) => accumulator + value, 0) / periodLength;
  const success = average >= target;

  let rating = 0;

  let ratingDescription = "";

  switch (true) {
    case average >= target * 1.2:
      rating = 3;
      ratingDescription = "fantastic";
      break;
    case average >= target:
      rating = 2;
      ratingDescription = "not too bad but could be better";
      break;
    default:
      rating = 1;
      ratingDescription = "train harder";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

/*try {
  const target = Number(process.argv[2]);
  const inputArguments = process.argv.slice(3);
  const training = inputArguments.map((exercise) => Number(exercise));
  console.log(exerciseCalculator(training, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
*/
