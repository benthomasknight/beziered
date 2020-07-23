import {List} from 'immutable'

// Convert the balue to between 0 and 1
const normalize = (max) => current => current / max;

// Get the bionomial coefficient
const binomialCoefficient = (row, index) =>
  index === 0 ? 1 : (row * binomialCoefficient(row - 1, index - 1)) / index;

// Binomial coefficient, except for the first point which is always 1
const bezierCoefficient = (time, index, points) =>
  index === 0 ? 1 : binomialCoefficient(points - 1, index) * Math.pow(time, index);

// Bezier term for point at index
const term = (time, index, points) => Math.pow(1 - time, points - 1 - index)


const bezier = (maxTime) => {
  const norm = normalize(maxTime);

  return (time, ...points) => {
    const normalized = norm(time);

    return points.reduce((total, point, index, array) =>
      total + bezierCoefficient(normalized, index, array.length) * term(normalized, index, array.length) * point
      , 0);
  }
}
const b = bezier(1);
b(0.5,0.125,0.25,0.375,0.5,0.75,1)//?
// (1 - 0.5) ^ 5 * 0.125
// 5 * 0.5 * (1 - 0.5) ^ 4 * 0.25



const list = new List([
  [0,1],
  [0,0],
  [1,0]
]);
