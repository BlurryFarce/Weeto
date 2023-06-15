const MAX_ID = 999;

export const getRandomCharID: (notThisOne?: number) => number = (
  notThisOne
) => {
  const charID = Math.floor(Math.random() * MAX_ID) + 1;

  if (charID  !== notThisOne) return charID ;
  return getRandomCharID(notThisOne);
};

export const getOptionsForVote = () => {
  const firstId = getRandomCharID();
  const secondId = getRandomCharID(firstId);

  return [firstId, secondId];
};