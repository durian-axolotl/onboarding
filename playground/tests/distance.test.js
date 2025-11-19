import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convertDistance } from "../src/lib/distance.js";

test("converts kilometers to meters", () => {
  strictEqual(convertDistance(1, "km", "m"), 1000);
  strictEqual(convertDistance(5, "km", "m"), 5000);
  strictEqual(convertDistance(0.5, "km", "m"), 500);
});

test("converts meters to kilometers", () => {
  strictEqual(convertDistance(1000, "m", "km"), 1);
  strictEqual(convertDistance(5000, "m", "km"), 5);
  strictEqual(convertDistance(500, "m", "km"), 0.5);
});

test("converts miles to meters", () => {
  strictEqual(convertDistance(1, "mi", "m"), 1609.344);
  strictEqual(convertDistance(5, "mi", "m"), 8046.72);
});

test("converts meters to miles", () => {
  strictEqual(convertDistance(1609.344, "m", "mi"), 1);
  strictEqual(convertDistance(8046.72, "m", "mi"), 5);
});

test("converts meters to meters", () => {
  strictEqual(convertDistance(1000, "m", "m"), 1000);
});

test("converts kilometers to miles", () => {
  strictEqual(convertDistance(5, "km", "mi"), 3.106855);
});

test("converts miles to kilometers", () => {
  strictEqual(convertDistance(3.106855, "mi", "km"), 5);
});
