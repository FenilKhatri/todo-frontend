import { useEffect, useRef } from "react";

function OtpInput({ digits, onChange, wrong = [], allInvalid = false, disabled = false, verified = false }) {
  const refs = useRef([]);
  const latest = useRef(digits);

  useEffect(() => {
    latest.current = digits;
  }, [digits]);

  const focus = (index) => refs.current[Math.max(0, Math.min(digits.length - 1, index))]?.focus();

  const commit = (next) => {
    latest.current = next;
    onChange(next);
  };

  const update = (index, value) => {
    const next = [...latest.current];
    next[index] = value;
    commit(next);
  };

  const handleChange = (index, event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (!value) return update(index, "");
    update(index, value.at(-1));
    focus(index + 1);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !latest.current[index] && index > 0) {
      event.preventDefault();
      update(index - 1, "");
      focus(index - 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focus(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focus(index + 1);
    }
  };

  const handlePaste = (event) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, digits.length);
    if (!pasted) return;
    event.preventDefault();
    commit(digits.map((_, index) => pasted[index] || ""));
    focus(pasted.length);
  };

  const handleFocus = (index, event) => {
    const firstEmpty = latest.current.findIndex((digit) => !digit);
    if (firstEmpty !== -1 && firstEmpty < index) focus(firstEmpty);
    else event.target.select();
  };

  return (
    <div className="flex justify-between gap-2 sm:justify-start sm:gap-3" onPaste={handlePaste}>
      {digits.map((digit, index) => {
        const invalid = allInvalid || wrong.includes(index);
        const state = verified
          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
          : invalid
            ? "border-red-500 bg-red-50 text-red-600 ring-3 ring-red-100"
            : digit
              ? "border-brand-500 bg-white text-ink"
              : "border-slate-200 bg-white text-ink";

        return (
          <input
            key={index}
            ref={(element) => (refs.current[index] = element)}
            value={digit}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onFocus={(event) => handleFocus(index, event)}
            disabled={disabled}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            aria-label={`Digit ${index + 1}`}
            aria-invalid={invalid}
            autoFocus={index === 0}
            className={`h-14 w-12 rounded-xl border-2 text-center text-2xl font-bold outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-100 disabled:opacity-70 sm:h-16 sm:w-14 ${state}`}
          />
        );
      })}
    </div>
  );
}

export default OtpInput;
