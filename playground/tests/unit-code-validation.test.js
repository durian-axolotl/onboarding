import { test } from "node:test";
import { throws } from "node:assert";
import { convert } from "../src/convert.js";

// Tests for unit code validation

// Temperature unit validation
test("rejects lowercase temperature units", () => {
  throws(
    () => convert("temperature", 100, "c", "F"),
    /invalid.*temperature.*unit/i,
    "Should reject lowercase 'c' (case-sensitive)"
  );
});

test("rejects empty temperature unit", () => {
  throws(
    () => convert("temperature", 100, "", "F"),
    /invalid.*temperature.*unit/i,
    "Should reject empty string as unit"
  );
});

test("accepts C to C conversion", () => {
  const result = convert("temperature", 100, "C", "C");
  if (result !== 100) {
    throw new Error(`Expected 100 but got ${result}`);
  }
});

test("accepts F to F conversion", () => {
  const result = convert("temperature", 100, "F", "F");
  if (result !== 100) {
    throw new Error(`Expected 100 but got ${result}`);
  }
});

test("accepts K to K conversion", () => {
  const result = convert("temperature", 300, "K", "K");
  if (result !== 300) {
    throw new Error(`Expected 300 but got ${result}`);
  }
});

test("accepts C to K conversion", () => {
  const result = convert("temperature", 0, "C", "K");
  if (result !== 273.15) {
    throw new Error(`Expected 273.15 but got ${result}`);
  }
});

// Distance unit validation
test("rejects invalid distance 'to' unit", () => {
  throws(
    () => convert("distance", 100, "km", "yards"),
    /invalid.*distance.*unit.*yards/i,
    "Should reject invalid distance unit 'yards'"
  );
});

test("rejects miles spelled out", () => {
  throws(
    () => convert("distance", 100, "km", "miles"),
    /invalid.*distance.*unit/i,
    "Should reject 'miles' (must be 'mi')"
  );
});

test("accepts km to km conversion", () => {
  const result = convert("distance", 100, "km", "km");
  if (result !== 100) {
    throw new Error(`Expected 100 but got ${result}`);
  }
});

test("accepts mi to mi conversion", () => {
  const result = convert("distance", 100, "mi", "mi");
  if (result !== 100) {
    throw new Error(`Expected 100 but got ${result}`);
  }
});

test("accepts m to m conversion", () => {
  const result = convert("distance", 1000, "m", "m");
  if (result !== 1000) {
    throw new Error(`Expected 1000 but got ${result}`);
  }
});

test("accepts km to m conversion", () => {
  const result = convert("distance", 1, "km", "m");
  if (result !== 1000) {
    throw new Error(`Expected 1000 but got ${result}`);
  }
});

// Weight unit validation
test("rejects invalid weight 'from' unit", () => {
  throws(
    () => convert("weight", 100, "kg", "oz"),
    /invalid.*weight.*unit.*kg/i,
    "Should reject invalid weight unit 'kg'"
  );
});

test("rejects grams spelled out", () => {
  throws(
    () => convert("weight", 100, "grams", "oz"),
    /invalid.*weight.*unit/i,
    "Should reject 'grams' (must be 'g')"
  );
});

test("rejects ounces spelled out", () => {
  throws(
    () => convert("weight", 100, "g", "ounces"),
    /invalid.*weight.*unit/i,
    "Should reject 'ounces' (must be 'oz')"
  );
});

test("accepts g to g conversion", () => {
  const result = convert("weight", 100, "g", "g");
  if (result !== 100) {
    throw new Error(`Expected 100 but got ${result}`);
  }
});

test("accepts oz to oz conversion", () => {
  const result = convert("weight", 100, "oz", "oz");
  if (result !== 100) {
    throw new Error(`Expected 100 but got ${result}`);
  }
});

test("accepts lb to lb conversion", () => {
  const result = convert("weight", 10, "lb", "lb");
  if (result !== 10) {
    throw new Error(`Expected 10 but got ${result}`);
  }
});

test("accepts g to lb conversion", () => {
  const result = convert("weight", 453.592, "g", "lb");
  if (result !== 1) {
    throw new Error(`Expected 1 but got ${result}`);
  }
});

// Combined validation - invalid type
test("rejects unknown conversion type", () => {
  throws(
    () => convert("volume", 100, "L", "gal"),
    /unknown.*type/i,
    "Should reject unknown conversion type 'volume'"
  );
});
