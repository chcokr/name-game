export const average = (arr) => {
  if (arr.length === 0) {
    return 0;
  }

  let sum = 0;

  for (let elem of arr) {
    sum += elem;
  }

  return sum / arr.length;
};

export const formatTimeElapsed = (elapsedMillisec) => {
  const min = parseInt(elapsedMillisec / 1000 / 60, 10);
  const sec = parseInt((elapsedMillisec - min * 1000 * 60) / 1000, 10);

  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
};
