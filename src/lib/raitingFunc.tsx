export const setClassForRaiting = (raiting: number | undefined) => {
  let style: string = "";
  if (raiting) {
    if (raiting >= 7) {
      style = "raitingNumberGreen";
    }
    if (raiting < 7 && raiting >= 4) {
      style = "raitingNumberYellow";
    }
    if (raiting < 4) {
      style = "raitingNumberRed";
    }
  }
  return style;
};
