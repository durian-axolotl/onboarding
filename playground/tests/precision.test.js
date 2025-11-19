import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convert } from "../src/convert.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaults = JSON.parse(
  readFileSync(join(__dirname, "../config/defaults.json"), "utf-8")
);

// Tests for precision defaults in distance and weight converters
// These tests should FAIL initially because distance/weight don't apply precision

test("distance conversion respects precision from config", () => {
  const result = convert("distance", 5, "km", "mi");
  const expected = 3.11; // 5 * 0.621371 = 3.106855, rounded to 2 decimals
  strictEqual(
    result,
    expected,
    `Expected ${expected} (precision: ${defaults.precision}), got ${result}`
  );
});

test("weight conversion respects precision from config", () => {
  const result = convert("weight", 100, "g", "oz");
  const expected = 3.53; // 100 / 28.3495 = 3.5274..., rounded to 2 decimals
  strictEqual(
    result,
    expected,
    `Expected ${expected} (precision: ${defaults.precision}), got ${result}`
  );
});

test("temperature conversion respects precision from config", () => {
  const result = convert("temperature", 37, "C", "F");
  const expected = 98.6; // 37 * 9/5 + 32 = 98.6, already at precision
  strictEqual(
    result,
    expected,
    `Expected ${expected} (precision: ${defaults.precision}), got ${result}`
  );
});

test("precision rounds correctly for rounding up", () => {
  const result = convert("distance", 10, "km", "mi");
  strictEqual(result, 6.21); // 10 * 0.621371 = 6.21371 → 6.21
});

test("precision rounds correctly for rounding down", () => {
  const result = convert("weight", 50, "g", "oz");
  strictEqual(result, 1.76); // 50 / 28.3495 = 1.7637... → 1.76
});

test("precision handles very small numbers", () => {
  const result = convert("weight", 1, "g", "oz");
  strictEqual(result, 0.04); // 1 / 28.3495 = 0.0352... → 0.04
});

test("precision handles very large numbers", () => {
  const result = convert("distance", 1000, "km", "mi");
  strictEqual(result, 621.37); // 1000 * 0.621371 = 621.371 → 621.37
});

test("handles absolute zero temperature with precision", () => {
  const result = convert("temperature", -273.15, "C", "F");
  strictEqual(result, -459.67, "Absolute zero should convert correctly with precision");
});

test("handles very precise input values", () => {
  const result = convert("distance", 1.234567, "km", "mi");
  strictEqual(result, 0.77); // Should round to config precision
});

// Precision tests for new units (K, m, lb)
test("temperature K to C conversion respects precision", () => {
  const result = convert("temperature", 300, "K", "C");
  const expected = 26.85; // 300 - 273.15 = 26.85
  strictEqual(result, expected, `Expected ${expected}, got ${result}`);
});

test("temperature K to F conversion respects precision", () => {
  const result = convert("temperature", 300, "K", "F");
  const expected = 80.33; // (300 - 273.15) * 9/5 + 32 = 80.33
  strictEqual(result, expected, `Expected ${expected}, got ${result}`);
});

test("distance m to km conversion respects precision", () => {
  const result = convert("distance", 1234.567, "m", "km");
  const expected = 1.23; // 1234.567 / 1000 = 1.234567 → 1.23
  strictEqual(result, expected, `Expected ${expected}, got ${result}`);
});

test("distance m to mi conversion respects precision", () => {
  const result = convert("distance", 1000, "m", "mi");
  const expected = 0.62; // 1000 / 1609.344 = 0.621371 → 0.62
  strictEqual(result, expected, `Expected ${expected}, got ${result}`);
});

test("weight lb to g conversion respects precision", () => {
  const result = convert("weight", 1, "lb", "g");
  const expected = 453.59; // 1 * 453.592 = 453.592 → 453.59
  strictEqual(result, expected, `Expected ${expected}, got ${result}`);
});

test("weight lb to oz conversion respects precision", () => {
  const result = convert("weight", 1.5, "lb", "oz");
  const expected = 24; // 1.5 * 16 = 24.00
  strictEqual(result, expected, `Expected ${expected}, got ${result}`);
});
