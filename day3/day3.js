/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
import fs from 'fs';

function setTrueBox(arr, i, j) {
	for (let r = -1; r <= 1; r++) {
		for (let c = -1; c <= 1; c++) {
			const row = i + r;
			const col = j + c;
			if (
				row >= 0 &&
				row < arr.length &&
				col >= 0 &&
				col < arr[row].length
			) {
				arr[row][col] = true;
			}
		}
	}
}

function part1(input) {
	const lines = input.split('\n');
	const chars = new Array(lines.length);
	const isSymbolAdjacent = new Array(lines.length);

	for (let i = 0; i < lines.length; i++) {
		chars[i] = Array.from(lines[i]);
		isSymbolAdjacent[i] = new Array(lines[i].length);
		for (let j = 0; j < chars[i].length; j++) {
			isSymbolAdjacent[i][j] = false;
		}
	}

	// set true for squares adjacent to symbols
	for (let i = 0; i < chars.length; i++) {
		for (let j = 0; j < chars[i].length; j++) {
			const char = chars[i][j];
			if (char !== '.' && isNaN(char)) {
				setTrueBox(isSymbolAdjacent, i, j);
			}
		}
	}

	let sum = 0;
	for (let i = 0; i < chars.length; i++) {
		for (let j = 0; j < chars[i].length; j++) {
			const char = chars[i][j];
			if (!isNaN(char)) {
				// check if any part of the number is valid
				// if yes, add it to the sum
				let valid = false;
				let numStr = '';
				while (j < chars[i].length && !isNaN(chars[i][j])) {
					numStr += chars[i][j];
					if (isSymbolAdjacent[i][j]) {
						valid = true;
					}
					j++;
				}
				if (valid) {
					sum += Number(numStr);
				}
			}
		}
	}
	return sum;
}

function part2(input) {
	const lines = input.split('\n');
	const chars = new Array(lines.length);
	const isGearAdjacent = new Array(lines.length);

	for (let i = 0; i < lines.length; i++) {
		chars[i] = Array.from(lines[i]);
		isGearAdjacent[i] = new Array(lines[i].length);
		for (let j = 0; j < chars[i].length; j++) {
			isGearAdjacent[i][j] = false;
		}
	}

	// set true for squares adjacent to symbols
	for (let i = 0; i < chars.length; i++) {
		for (let j = 0; j < chars[i].length; j++) {
			const char = chars[i][j];
			if (char === '*') {
				setTrueBox(isGearAdjacent, i, j);
			}
		}
	}

	let sum = 0;
	for (let i = 0; i < chars.length; i++) {
		for (let j = 0; j < chars[i].length; j++) {
			const char = chars[i][j];
			if (char === '*') {
				let numAdjacentNums = 0;
				let gearRatio = 1;

				for (let r = -1; r <= 1; r++) {
					for (let c = -1; c <= 1; c++) {
						const row = i + r;
						const col = j + c;
						if (
							row >= 0 &&
							row < chars.length &&
							col >= 0 &&
							col < chars[row].length
						) {
							if (!isNaN(chars[row][col])) {
								numAdjacentNums++;
								let numStr = '';

								// first go left until left edge of number reached (overshoots by 1)
								let lEdge = 0;
								while (
									j + c + lEdge >= 0 &&
									!isNaN(chars[row][j + c + lEdge])
								) {
									lEdge--;
								}
								lEdge++; // go right one to the last numeric character

								// then go right
								while (
									j + c + lEdge < chars[row].length &&
									!isNaN(chars[row][j + c + lEdge])
								) {
									numStr += chars[row][j + c + lEdge];
									// careful here since c++ needs to reflect how far right we've gone from c
									if (lEdge < 0) {
										lEdge++;
									} else {
										c++;
									}
								}
								gearRatio *= Number(numStr);
							}
						}
					}
				}

				if (numAdjacentNums >= 2) {
					sum += gearRatio;
				}
			}
		}
	}
	return sum;
}

const input = fs.readFileSync('input.txt', 'utf-8').trim();

const result1 = part1(input);
console.log(`Part 1: ${result1}`);

const result2 = part2(input);
console.log(`Part 2: ${result2}`);
