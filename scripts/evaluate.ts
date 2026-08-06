import cases from "@/evaluation/cases.json";
import { retrieve } from "@/lib/retrieve";

const failures = cases.filter(({ question, source }) => retrieve(question, 1).at(0)?.id !== source);

if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log(`Retrieval recall at one: 1.00 across ${cases.length} evaluation cases.`);
