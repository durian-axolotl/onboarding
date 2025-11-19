import * as temperature from "./lib/temperature.js";
import * as distance from "./lib/distance.js";
import * as weight from "./lib/weight.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaults = JSON.parse(
  readFileSync(join(__dirname, "../config/defaults.json"), "utf-8")
);

function roundToPrecision(value, precision) {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}

function determineType(unit) {
  const distanceUnits = ["km", "mi", "m"];
  const weightUnits = ["g", "oz", "lb"];
  const temperatureUnits = ["C", "F", "K"];

  if (distanceUnits.includes(unit)) return "distance";
  if (weightUnits.includes(unit)) return "weight";
  if (temperatureUnits.includes(unit)) return "temperature";
  throw new Error(`Unknown unit: ${unit}`);
}

export function compare(value1, unit1, value2, unit2) {
  // Validate values
  const numValue1 = Number(value1);
  const numValue2 = Number(value2);
  
  if (isNaN(numValue1) || isNaN(numValue2)) {
    throw new Error("Invalid values: both must be valid numbers");
  }

  // Determine the type from the units
  const type1 = determineType(unit1);
  const type2 = determineType(unit2);

  if (type1 !== type2) {
    throw new Error(`Cannot compare ${type1} (${unit1}) with ${type2} (${unit2})`);
  }

  const type = type1;

  // Convert both values to the same unit (convert second value to first unit)
  const convertedValue2 = convert(type, numValue2, unit2, unit1);

  // Calculate difference
  const diff = numValue1 - convertedValue2;
  const absDiff = Math.abs(diff);

  // Format the comparison result
  const comparison = {
    value1: roundToPrecision(numValue1, defaults.precision),
    unit1: unit1,
    value2: roundToPrecision(convertedValue2, defaults.precision),
    unit2: unit1, // Both are now in unit1
    originalValue2: roundToPrecision(numValue2, defaults.precision),
    originalUnit2: unit2,
    difference: roundToPrecision(absDiff, defaults.precision),
    larger: diff > 0 ? "first" : diff < 0 ? "second" : "equal"
  };

  return comparison;
}

export function convert(type, value, from, to) {
  // Validate value before conversion
  // Reject null, undefined, empty strings, arrays, and objects explicitly
  if (value === null || value === undefined || value === "" ||
      Array.isArray(value) || (typeof value === 'object')) {
    throw new Error("Invalid value: must be a valid number");
  }

  // Validate and convert value to number
  const numValue = Number(value);
  if (isNaN(numValue)) {
    throw new Error("Invalid value: must be a valid number");
  }

  switch (type) {
    case "temperature":
      return roundToPrecision(
        temperature.convertTemperature(
          numValue,
          from !== undefined ? from : defaults.temperature.defaultFrom,
          to !== undefined ? to : defaults.temperature.defaultTo
        ),
        defaults.precision
      );
    case "distance":
      return roundToPrecision(
        distance.convertDistance(numValue, from, to),
        defaults.precision
      );
    case "weight":
      return roundToPrecision(
        weight.convertWeight(numValue, from, to),
        defaults.precision
      );
    default:
      throw new Error("Unknown type " + type);
  }
}
