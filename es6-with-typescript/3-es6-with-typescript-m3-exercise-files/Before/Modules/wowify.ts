
/**
*  Returns the same data, but with WOW!!!!
*/
function wowify(...thatWhichShouldBeWowed: string[]) {
  thatWhichShouldBeWowed.forEach((item, index) => {
      thatWhichShouldBeWowed[index] = `${item} WOW!!!!`;
  });
  return thatWhichShouldBeWowed;
}

/**
*  Returns the same data, but meh!!!!
*/
function mehify(...thatWhichShouldBeMeh: string[]) {
  thatWhichShouldBeMeh.forEach((item, index) => {
      thatWhichShouldBeMeh[index] = `${item} meh...`;
  });
  return thatWhichShouldBeMeh;
}

export {wowify as default, mehify}; // wowify as superWowify  rename
