export const getMistakesPercentage = (text: string, mistakes: number): string => {
  return ((mistakes / (text.length | 1)) * 100).toFixed(2);
};
