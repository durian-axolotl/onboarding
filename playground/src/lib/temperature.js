const VALID_UNITS = ["C", "F", "K"];

export function convertTemperature(value, from, to) {
  // Validate unit codes
  if (!VALID_UNITS.includes(from)) {
    throw new Error(`Invalid temperature unit: ${from}`);
  }
  if (!VALID_UNITS.includes(to)) {
    throw new Error(`Invalid temperature unit: ${to}`);
  }

  if (from === "C" && to === "F") {
    return value * (9 / 5) + 32;
  }
  if (from === "F" && to === "C") {
    return (value - 32) * (5 / 9);
  }

  // Conversions with Kelvin
  if (from === "C" && to === "K") {
    return value + 273.15;
  }
  if (from === "K" && to === "C") {
    return value - 273.15;
  }
  if (from === "F" && to === "K") {
    return (value - 32) * (5 / 9) + 273.15;
  }
  if (from === "K" && to === "F") {
    return (value - 273.15) * (9 / 5) + 32;
  }

  // If from and to are the same, return the value
  if (from === to) {
    return value;
  }

  throw new Error(`Unsupported temperature conversion: ${from} to ${to}`);
}
