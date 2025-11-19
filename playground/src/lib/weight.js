const VALID_UNITS = ["g", "oz", "lb"];

export function convertWeight(value, from, to) {
  // Validate unit codes
  if (!VALID_UNITS.includes(from)) {
    throw new Error(`Invalid weight unit: ${from}`);
  }
  if (!VALID_UNITS.includes(to)) {
    throw new Error(`Invalid weight unit: ${to}`);
  }

  if (from === "g" && to === "oz") return value / 28.3495;
  if (from === "oz" && to === "g") return value * 28.3495;

  // Conversions with pounds
  if (from === "g" && to === "lb") return value / 453.592;
  if (from === "lb" && to === "g") return value * 453.592;
  if (from === "oz" && to === "lb") return value / 16;
  if (from === "lb" && to === "oz") return value * 16;

  // If from and to are the same, return the value
  if (from === to) return value;

  throw new Error(`Unsupported weight conversion: ${from} to ${to}`);
}
