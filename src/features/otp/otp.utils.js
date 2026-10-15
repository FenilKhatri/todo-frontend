const ordinal = (n) => `${n}${["th", "st", "nd", "rd"][n] || "th"}`;

export const wrongDigits = (digits, expected) =>
  digits.reduce((wrong, digit, index) => {
    if (digit && expected && digit !== expected[index]) wrong.push(index);
    return wrong;
  }, []);

export const otpMessage = (wrong) =>
  wrong.length === 0
    ? ""
    : wrong.length === 1
      ? `The ${ordinal(wrong[0] + 1)} digit is incorrect.`
      : `Digits ${wrong.map((index) => index + 1).join(", ")} are incorrect.`;
