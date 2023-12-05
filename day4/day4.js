import fs from 'node:fs';

function part1(input) {
	const lines = input.split('\n');
	let sum = 0;

	for (const line of lines) {
		const [winners, mine] = line.split(' | ').filter((x) => x !== '');
		// split into strings, discard empty strings and "Card x:", convert to numbers
		const spWins = winners
			.split(' ')
			.filter((x) => x !== '')
			.slice(2)
			.map((x) => Number(x));

		const spMine = mine
			.split(' ')
			.filter((x) => x !== '')
			.map((x) => Number(x));
		const intersection = spMine.filter((num) => spWins.includes(num));
		if (intersection.length > 0) {
			sum += 2 ** (intersection.length - 1);
		}
	}
	return sum;
}

function part2(input) {
	const lines = input.split('\n');
	let sum = 0;
	const numDupes = Array(lines.length).fill(1); // 1 of each card starting out

	for (let i = 0; i < lines.length; i++) {
		const [winners, mine] = lines[i].split(' | ').filter((x) => x !== '');
		const spWins = winners
			.split(' ')
			.filter((x) => x !== '') // remove empty strings
			.slice(2) // remove "Card x:"
			.map((x) => Number(x));

		const spMine = mine
			.split(' ')
			.filter((x) => x !== '')
			.map((x) => Number(x));

		const intersection = spMine.filter((num) => spWins.includes(num));
		const matches = intersection.length;

		for (let k = 1; k < matches + 1; k++) {
			if (i + k >= numDupes.length) {
				break;
			}
			// n dupes of card i with k matches per card
			// => n more of cards i + 1 through i + k (inclusive)
			numDupes[i + k] += numDupes[i];
		}

		sum += numDupes[i];
	}
	return sum;
}
const input = fs.readFileSync('input.txt', 'utf-8').trim();

const result1 = part1(input);
console.log(`Part 1: ${result1}`);

const result2 = part2(input);
console.log(`Part 2: ${result2}`);
