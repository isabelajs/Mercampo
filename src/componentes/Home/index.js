export { default as AboutUsSection } from "./AboutUsSection";
export { default as HowItWorksSection } from "./HowItWorksSection";
export { default as ImpactSection } from "./ImpactSection";
export { default as IntroSection } from "./IntroSection";
export { default as NewsSection } from "./NewsSection";
export { default as OurGoalSection } from "./OurGoalSection";

const list = [2, 4, 0, 1];

const solution = (lista) => {
  const newList = lista.map(() => 0);

  let counter = 0;

  list.forEach((element) => {
    if (element !== 0) {
      newList[counter] = element;
      counter++;
    }
  });

  return newList;
};

console.log(solution(list));
