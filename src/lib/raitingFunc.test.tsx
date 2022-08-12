import { setClassForRaiting } from "./raitingFunc";

describe("testing setClassForRaiting", () => {
  test("testing raitingFunc width value < 4", () => {
    const result = setClassForRaiting(3);
    expect(result).toBe("raitingNumberRed");
  });

  test("testing raitingFunc width value >4,but <7", () => {
    const result = setClassForRaiting(5);
    expect(result).toBe("raitingNumberYellow");
  });
  test("testing raitingFunc width value =4", () => {
    const result = setClassForRaiting(4);
    expect(result).toBe("raitingNumberYellow");
  });

  test("testing raitingFunc width value >7", () => {
    const result = setClassForRaiting(8);
    expect(result).toBe("raitingNumberGreen");
  });

  test("testing raitingFunc width value = 7", () => {
    const result = setClassForRaiting(7);
    expect(result).toBe("raitingNumberGreen");
  });
});
