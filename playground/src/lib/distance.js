const VALID_UNITS = ["km", "mi", "m"];

export function convertDistance(value, from, to) {
  // Validate unit codes
  if (!VALID_UNITS.includes(from)) {
    throw new Error(`Invalid distance unit: ${from}`);
  }
  if (!VALID_UNITS.includes(to)) {
    throw new Error(`Invalid distance unit: ${to}`);
  }

  if (from === "km" && to === "mi") return value * 0.621371;
  if (from === "mi" && to === "km") return value / 0.621371;

  // Conversions with meters
  if (from === "km" && to === "m") return value * 1000;
  if (from === "m" && to === "km") return value / 1000;
  if (from === "mi" && to === "m") return value * 1609.344;
  if (from === "m" && to === "mi") return value / 1609.344;

  // If from and to are the same, return the value
  if (from === to) return value;

  throw new Error(`Unsupported distance conversion: ${from} to ${to}`);
}
