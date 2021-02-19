function getMinMax(str) {
  let numbers = str.split(/,| /).filter(item => !isNaN(parseInt(item))).map(item => +item);
  let result = {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
  return result;
}