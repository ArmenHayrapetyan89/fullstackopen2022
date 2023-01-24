const calculateBmi = (height: number, weight: number): string => {
  const result = weight / ((height / 100) * (height / 100));

  console.log("RESULT: ", result);
  switch (true) {
    case result < 16:
      return "Severe Thinness";
    case result < 18.5:
      return "Moderate Thinness";
    case result < 25:
      return "Normal";
    case result < 30:
      return "Overweight";
    case result < 35:
      return "Obese Class I";
    case result < 40:
      return "Obese Class II";
    case result > 40:
      return "Obese Class III";
    default:
      throw new Error("wrong parameters");
  }
};

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

if (isNaN(height) || isNaN(weight) || height === 0) {
  console.log("Please enter a valid number!");
} else {
  console.log(calculateBmi(height, weight));
}
