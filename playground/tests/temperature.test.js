import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convertTemperature } from "../src/lib/temperature.js";

test("converts Celsius to Fahrenheit", () => {
  strictEqual(convertTemperature(0, "C", "F"), 32);
  strictEqual(convertTemperature(100, "C", "F"), 212);
});

test("converts Fahrenheit to Celsius", () => {
  strictEqual(convertTemperature(32, "F", "C"), 0);
  strictEqual(convertTemperature(212, "F", "C"), 100);
});

test("converts Celsius to Kelvin", () => {
  strictEqual(convertTemperature(0, "C", "K"), 273.15);
  strictEqual(convertTemperature(100, "C", "K"), 373.15);
  strictEqual(convertTemperature(-273.15, "C", "K"), 0);
});

test("converts Kelvin to Celsius", () => {
  strictEqual(convertTemperature(273.15, "K", "C"), 0);
  strictEqual(convertTemperature(373.15, "K", "C"), 100);
  strictEqual(convertTemperature(0, "K", "C"), -273.15);
});

test("converts Fahrenheit to Kelvin", () => {
  strictEqual(convertTemperature(32, "F", "K"), 273.15);
  strictEqual(convertTemperature(212, "F", "K"), 373.15);
  // -459.67°F to K results in a very small number close to 0 (floating point precision)
  const result = convertTemperature(-459.67, "F", "K");
  if (Math.abs(result - 0) > 0.001) {
    throw new Error(`Expected ~0 but got ${result}`);
  }
});

test("converts Kelvin to Fahrenheit", () => {
  strictEqual(convertTemperature(273.15, "K", "F"), 32);
  strictEqual(convertTemperature(373.15, "K", "F"), 212);
  // 0 K to F should be -459.67, but floating point gives -459.66999999999996
  const result = convertTemperature(0, "K", "F");
  if (Math.abs(result - (-459.67)) > 0.01) {
    throw new Error(`Expected ~-459.67 but got ${result}`);
  }
});

test("converts Kelvin to Kelvin", () => {
  strictEqual(convertTemperature(300, "K", "K"), 300);
});
