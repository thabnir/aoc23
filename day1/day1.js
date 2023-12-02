/* eslint-disable no-restricted-globals */
/* eslint-disable guard-for-in */
import fs from 'node:fs';

function part1(input) {
	const lines = input.split('\n');
	let sum = 0;
	lines.forEach((line) => {
		const digits = line.split('').filter((char) => !isNaN(char)); // convert to array and filter out non-numbers

		const lineSum = digits[0] + digits[digits.length - 1]; // concatenate char digits
		sum += Number(lineSum); // add numeric value of concatenated digits to running sum
	});

	return sum;
}

// since each first and last letter might be part of another word-digit
// just tack em back on in case they're needed for that
// "eightwoneight" -> eight, two, one, eight -> "8218"
// matches 1 first, "eightwooneight" -> "eightwo1eight"
// "eightwo1eight" -> "eight2o1eight" -> "e8t2o1e8t"
// this is a horrific hack but it should produce identical results to doing it "right"
// since the number blocks any additions from making letter combinations that previously didn't exist from popping up
// i.e. it has no possibility of recursive stuff-adding
function part2(input) {
	const lines = input.split('\n');
	const digitMap = {
		zero: 'z0o',
		one: 'o1e',
		two: 't2o',
		three: 't3e',
		four: 'f4r',
		five: 'f5e',
		six: 's6x',
		seven: 's7n',
		eight: 'e8t',
		nine: 'n9e',
	};

	let sum = 0;

	for (const line of lines) {
		let l = line;

		for (const word in digitMap) {
			l = l.replaceAll(word, digitMap[word]);
		}

		const digits = l.split('').filter((char) => !isNaN(char));
		const lineSum = Number(digits[0].concat(digits[digits.length - 1])); // concatenate char digits, make num
		sum += lineSum; // add numeric value of catted digits to running sum
	}
	return sum;
}

const input = fs.readFileSync('input.txt', 'utf-8').trim();

console.log(`Part 1: ${part1(input)}`);
console.log(`Part 2: ${part2(input)}`);
