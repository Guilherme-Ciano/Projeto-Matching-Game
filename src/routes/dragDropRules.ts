import { checkAndRemoveMatches } from './rules';

export function handleDragStart(event: DragEvent, grid: number[][], row: number, col: number) {
	if (grid[row][col] !== 0) {
		event.dataTransfer?.setData('text/plain', JSON.stringify({ row, col }));
	}
}

export function handleDragOver(event: DragEvent) {
	event.preventDefault();
}

export function handleDrop(event: DragEvent, grid: number[][], onCellDrop: Function) {
	const draggedCell = JSON.parse(event.dataTransfer?.getData('text/plain') || '{}');
	const { row: draggedRow, col: draggedCol } = draggedCell;

	if (draggedRow !== undefined && draggedCol !== undefined) {
		const row = Number(event.currentTarget?.getAttribute('data-row'));
		const col = Number(event.currentTarget?.getAttribute('data-col'));

		const rowDiff = Math.abs(row - draggedRow);
		const colDiff = Math.abs(col - draggedCol);

		// Verifica se a célula está sendo movida apenas uma casa na horizontal ou vertical
		if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
			const draggedValue = grid[draggedRow][draggedCol];
			if (draggedValue !== 0) {
				grid[draggedRow][draggedCol] = grid[row][col];
				grid[row][col] = draggedValue;

				{
					checkAndRemoveMatches;
				}
				grid;
				onCellDrop(grid);
			}
		}
	}
}
