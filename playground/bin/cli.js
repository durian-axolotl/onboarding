#!/usr/bin/env node
import { convert, compare } from "../src/convert.js";

const [,, command, ...args] = process.argv;

if (!command) {
  console.error("Usage: convert <type> <value> [from] [to]");
  console.error("   or: convert compare <value1> <unit1> <value2> <unit2>");
  process.exit(1);
}

if (command === "compare") {
  const [value1, unit1, value2, unit2] = args;
  
  if (!value1 || !unit1 || !value2 || !unit2) {
    console.error("Usage: convert compare <value1> <unit1> <value2> <unit2>");
    console.error("Example: convert compare 5 km 3 mi");
    process.exit(1);
  }

  try {
    const result = compare(value1, unit1, value2, unit2);
    
    // Format the comparison output
    if (result.larger === "equal") {
      console.log(`${result.value1} ${result.unit1} = ${result.originalValue2} ${result.originalUnit2}`);
    } else if (result.larger === "first") {
      console.log(`${result.value1} ${result.unit1} > ${result.originalValue2} ${result.originalUnit2} (difference: ${result.difference} ${result.unit1})`);
    } else {
      console.log(`${result.value1} ${result.unit1} < ${result.originalValue2} ${result.originalUnit2} (difference: ${result.difference} ${result.unit1})`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
} else {
  const [value, from, to] = args;
  
  if (!value) {
    console.error("Usage: convert <type> <value> [from] [to]");
    process.exit(1);
  }

  try {
    const result = convert(command, Number(value), from, to);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
