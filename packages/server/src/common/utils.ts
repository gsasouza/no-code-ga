export const sanitizeUpdate = obj =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (!value) return acc;
    return { ...acc, [key]: value };
  }, {});

export const randomFloatBetween = (min, max) => min + Math.floor((max - min) * Math.random());
export const randomIntBetween = (min, max) => Math.abs(randomFloatBetween(min, max));
export const distinctRandomBetween = (min, max, distinctNumber) => {
  const number = randomIntBetween(min, max);
  return number === distinctNumber ? distinctRandomBetween(min, max, distinctNumber) : number;
};
