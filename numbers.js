module.exports.clamp = (min, number, max) => {
  if (!number) return;
  if (number < min) return min;
  if (number > max) return max;
  return number;
};
