export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) * (height / 100));
  //let answer = "";

  switch (true) {
    case bmi < 16:
      /*answer = "Severe Thinness";
      break;*/
      return "Severe Thinness";
    case bmi < 18.5:
      /*answer = "Moderate Thinness";
      break;*/
      return "Moderate Thinness";
    case bmi < 25:
      /*answer = "Normal";
      break;*/
      return "Normal";
    case bmi < 30:
      /* answer = "Overweight";
      break;*/
      return "Overweight";
    case bmi < 35:
      /*answer = "Obese Class I";
      break;*/
      return "Obese Class I";
    case bmi < 40:
      /*answer = "Obese Class II";
      break;*/
      return "Obese Class II";
    case bmi > 40:
      /*answer = "Obese Class III";
      break;*/
      return "Obese Class III";
    default:
      throw new Error("wrong parameters");
  }
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

if (isNaN(height) || isNaN(weight) || height === 0) {
  console.log("Please enter a valid number!");
} else {
  console.log(calculateBmi(height, weight));
}
