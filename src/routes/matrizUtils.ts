// Gera um número aleatório entre 1 e 5
function generateRandomNumber(): number {
	return Math.floor(Math.random() * 5) + 1;
}

export function observeMatrix(matrix: number[][]): number[][] | null {
	const numRows = matrix.length;
	const numCols = matrix[0].length;

	for (let i = 0; i < numRows; i++) {
		for (let j = 0; j < numCols - 2; j++) {
			if (matrix[i][j] === matrix[i][j + 1] && matrix[i][j] === matrix[i][j + 2]) {
				return null;
			}
		}
	}

	for (let j = 0; j < numCols; j++) {
		for (let i = 0; i < numRows - 2; i++) {
			if (matrix[i][j] === matrix[i + 1][j] && matrix[i][j] === matrix[i + 2][j]) {
				return null;
			}
		}
	}

	return matrix;
}

export function generateGrid(numRows: number, numCols: number): number[][] {
	const grid: number[][] = [];

	for (let i = 0; i < numRows; i++) {
		const row: number[] = [];
		for (let j = 0; j < numCols; j++) {
			row.push(generateRandomNumber());
		}
		grid.push(row);
	}

	return grid;
}

export function shuffleNumbers(grid: number[][]) {
	const rows = grid.length;
	const cols = grid[0].length;
	const numbers: number[] = [];

	// Armazena as posições das células com números diferentes de zero
	const nonZeroPositions: { row: number; col: number }[] = [];

	// Armazena os números diferentes de zero em um array e as posições das células
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			if (grid[row][col] !== 0) {
				numbers.push(grid[row][col]);
				nonZeroPositions.push({ row, col });
			}
		}
	}

	// Embaralha os números apenas se houver posições possíveis para o shuffle
	if (nonZeroPositions.length > 1) {
		for (let i = nonZeroPositions.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[nonZeroPositions[i], nonZeroPositions[j]] = [nonZeroPositions[j], nonZeroPositions[i]];
		}

		// Atualiza as células com os números embaralhados
		for (let i = 0; i < numbers.length; i++) {
			const { row, col } = nonZeroPositions[i];
			grid[row][col] = numbers[i];
		}
	}

	return grid;
}
