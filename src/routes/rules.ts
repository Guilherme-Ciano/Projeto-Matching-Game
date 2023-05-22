export function checkAndRemoveMatches(grid: number[][]) {
	const rows = grid.length;
	const cols = grid[0].length;

	let score = 0;

	for (let row = 0; row < rows; row++) {
		let count = 1;
		for (let col = 0; col < cols; col++) {
			if (col === cols - 1 || grid[row][col] !== grid[row][col + 1]) {
				if (count >= 3 && grid[row][col] !== 0) {
					removeMatchesInRow(grid, row, col - count + 1, count);
					score += 100;
				}
				count = 1;
			} else {
				count++;
			}
		}
	}

	for (let col = 0; col < cols; col++) {
		let count = 1;
		for (let row = 0; row < rows; row++) {
			if (row === rows - 1 || grid[row][col] !== grid[row + 1][col]) {
				if (count >= 3 && grid[row][col] !== 0) {
					removeMatchesInColumn(grid, col, row - count + 1, count);
					score += 100;
				}
				count = 1;
			} else {
				count++;
			}
		}
	}

	return score;
}

function removeMatchesInRow(grid: number[][], row: number, startCol: number, count: number) {
	for (let col = startCol; col < startCol + count; col++) {
		grid[row][col] = 0;
	}
}

function removeMatchesInColumn(grid: number[][], col: number, startRow: number, count: number) {
	for (let row = startRow + count - 1; row >= startRow; row--) {
		grid[row][col] = 0;
	}
}

function removeZerosFromArray(grid: number[][]): number[] {
	const rows = grid.length;
	const cols = grid[0].length;
	const newArray: number[] = [];

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			if (grid[row][col] !== 0) {
				newArray.push(grid[row][col]);
			}
		}
	}

	return newArray;
}

function hasThreeOrMoreDuplicates(list: number[]): boolean {
	const frequencyMap: Map<number, number> = new Map();

	for (let i = 0; i < list.length; i++) {
		const num = list[i];
		frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
		if (frequencyMap?.get(num) >= 3) {
			return true;
		}
	}

	return false;
}

export function noMoreRepeats(grid: number[][]): boolean {
	const numbersInGame = removeZerosFromArray(grid);
	return hasThreeOrMoreDuplicates(numbersInGame);
}
