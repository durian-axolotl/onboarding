import { test } from "node:test";
import { throws } from "node:assert";
import { convert } from "../src/convert.js";

// Tests for numeric value validation

test("rejects string that is not a number", () => {
  throws(
    () => convert("temperature", "hello", "C", "F"),
    /invalid.*value.*number/i,
    "Should reject non-numeric string"
  );
});

test("rejects NaN explicitly", () => {
  throws(
    () => convert("temperature", NaN, "C", "F"),
    /invalid.*value.*number/i,
    "Should reject NaN"
  );
});

test("rejects undefined value", () => {
  throws(
    () => convert("temperature", undefined, "C", "F"),
    /invalid.*value.*number/i,
    "Should reject undefined"
  );
});

test("rejects null value", () => {
  throws(
    () => convert("temperature", null, "C", "F"),
    /invalid.*value.*number/i,
    "Should reject null (null converts to 0 but we want explicit numbers)"
  );
});

test("rejects empty string", () => {
  throws(
    () => convert("temperature", "", "C", "F"),
    /invalid.*value.*number/i,
    "Should reject empty string"
  );
});

test("rejects object", () => {
  throws(
    () => convert("temperature", {}, "C", "F"),
    /invalid.*value.*number/i,
    "Should reject object"
  );
});

test("rejects array", () => {
  throws(
    () => convert("temperature", [100], "C", "F"),
    /invalid.*value.*number/i,
    "Should reject array"
  );
});

test("accepts valid numeric string", () => {
  // Should convert string to number successfully
  const result = convert("temperature", "100", "C", "F");
  if (result !== 212) {
    throw new Error(`Expected 212 but got ${result}`);
  }
});

test("accepts integer", () => {
  const result = convert("temperature", 100, "C", "F");
  if (result !== 212) {
    throw new Error(`Expected 212 but got ${result}`);
  }
});

test("accepts float", () => {
  const result = convert("temperature", 37.5, "C", "F");
  if (result !== 99.5) {
    throw new Error(`Expected 99.5 but got ${result}`);
  }
});

test("accepts negative number", () => {
  const result = convert("temperature", -40, "C", "F");
  if (result !== -40) {
    throw new Error(`Expected -40 but got ${result}`);
  }
});

test("accepts zero", () => {
  const result = convert("temperature", 0, "C", "F");
  if (result !== 32) {
    throw new Error(`Expected 32 but got ${result}`);
  }
});
