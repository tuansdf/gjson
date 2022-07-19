module.exports.clamp = (min, number, max) => {
  number = Number(number);
  if (!number && number !== 0) return;
  if (number < min) return min;
  if (number > max) return max;
  return number;
};
