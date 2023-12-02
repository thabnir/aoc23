import fs from 'fs';

// What is the sum of the IDs of those games?
// note: info can be in any order, and doesn't need all colors e.g. "r,b; g,b,r; b; r, g"
function solve(input, numRed, numGreen, numBlue, part) {
	const lines = input.split('\n');
	let idSum = 0;
	for (const line of lines) {
		const idSplit = line.split(':'); // ["Game n", "--game data--"]
		const id = Number(idSplit[0].split(' ')[1]); // game id
		// i should've just counted up but whatever it's too late now

		// min possible in a given bag / game given the information at hand
		let knownRed = 0;
		let knownGreen = 0;
		let knownBlue = 0;

		const rounds = idSplit[1].split(';'); // game data split by round

		for (const round of rounds) {
			// ex: "5 blue, 1 green"
			const data = round.split(','); // ex: ["5 blue", "1 green"]
			for (const colordat of data) {
				// ex: "5 blue"
				const sp = colordat.split(' '); // leading space produces '' as first item
				const num = Number(sp[1]);
				const color = sp[2];
				if (color === 'red' && num > knownRed) {
					knownRed = num;
				} else if (color === 'green' && num > knownGreen) {
					knownGreen = num;
				} else if (color === 'blue' && num > knownBlue) {
					knownBlue = num;
				}
			}
		}

		if (
			part === 1 &&
			knownRed <= numRed &&
			knownGreen <= numGreen &&
			knownBlue <= numBlue
		) {
			idSum += id;
		} else if (part === 2) {
			idSum += knownRed * knownGreen * knownBlue;
		}
	}
	return idSum;
}

const input = fs.readFileSync('input.txt', 'utf-8').trim();

const result1 = solve(input, 12, 13, 14, 1); // 12 red cubes, 13 green cubes, and 14 blue cubes, part 1
console.log(`Part 1: ${result1}`);
const result2 = solve(input, -1, -1, -1, 2); // part 2
console.log(`Part 2: ${result2}`);
