export const sanitizeUpdate = obj =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (!value) return acc;
    return { ...acc, [key]: value };
  }, {});
