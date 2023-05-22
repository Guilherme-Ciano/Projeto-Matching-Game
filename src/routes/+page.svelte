<script lang="ts">
	import { onMount } from 'svelte';
	import { handleDragStart, handleDragOver, handleDrop } from './dragDropRules';
	import { generateGrid, observeMatrix, shuffleNumbers } from './matrizUtils';
	import { checkAndRemoveMatches, noMoreRepeats } from './rules';

	let grid: number[][] = [];
	let userScore = 0;
	let userMovements = 0;
	let isGameOver = false;

	function onCellDrop(updatedGrid: number[][]) {
		userMovements += 1;

		const score = checkAndRemoveMatches(updatedGrid);
		userScore += score;
		grid = updatedGrid;

		// Verifica se o jogo acabou
		isGameOver = !noMoreRepeats(updatedGrid);
	}

	onMount(() => {
		const numRows = 8; // Número desejado de linhas
		const numCols = 8; // Número desejado de colunas

		// Gera um novo grid e verifica se é válido
		do {
			grid = generateGrid(numRows, numCols);
		} while (!observeMatrix(grid));
	});
</script>

<h1 style="font-weight: 700;">Triplet Quest</h1>

<div class="mainInfo">
	<h3>Movements: {userMovements}</h3>
	<h1>Score: {userScore}</h1>
	<button
		on:click={(_) => {
			userMovements = userMovements + 1;
			grid = shuffleNumbers(grid);
		}}
		disabled={userMovements === 15 && userScore < 1500}>Shuffle</button
	>
</div>

<div
	class="gameOver"
	style={userMovements === 10 && userScore < 800
		? 'display: flex; z-index: 99;'
		: 'display: none important; z-index: -10;'}
>
	<h1>Game Over</h1>
	<h2>You didn't reach 1500 in 15 moves!</h2>
	<h2>Final score: {userScore}</h2>

	<button
		on:click={(_) => {
			userMovements = 0;
			userScore = 0;
			grid = generateGrid(8, 8);
		}}
	>
		Try again
	</button>
</div>

<div
	class="gameOverWinning"
	style={isGameOver ? 'display: flex; z-index: 99;' : 'display: none important; z-index: -10;'}
>
	<h1>You Win!</h1>
	<h2>Total moves: {userMovements}</h2>
	<h2>Final score: {userScore}</h2>

	<button
		on:click={(_) => {
			userMovements = 0;
			userScore = 0;
			grid = generateGrid(8, 8);
			isGameOver = false;
		}}
	>
		Try again
	</button>
</div>

<div class="insuficiente">
	<h1>Sorry, at the moment, this game is only available to PCs</h1>
</div>

<div class="grid">
	{#each grid as row, rowIndex}
		{#each row as cell, colIndex}
			<div
				class="cell cell-{cell}"
				draggable="true"
				data-row={rowIndex}
				data-col={colIndex}
				on:dragstart={(event) => handleDragStart(event, grid, rowIndex, colIndex)}
				on:dragover={(event) => handleDragOver(event)}
				on:drop={(event) => handleDrop(event, grid, onCellDrop)}
			>
				{cell}
			</div>
		{/each}
	{/each}
</div>

<style>
	.insuficiente {
		display: none;
	}

	.gameOver,
	.gameOverWinning {
		position: absolute;

		flex-direction: column;

		width: 61rem;
		height: 32rem;

		gap: 4px;
		background-color: #ffffffd5;
		backdrop-filter: blur(10px);

		justify-content: center;
		align-items: center;

		padding: 8px;
		border-radius: 8px;

		bottom: 50%;
		top: 22.5%;
	}

	.mainInfo {
		display: flex;
		flex-direction: row;

		width: 100%;
		justify-content: space-between;
		align-items: baseline;

		text-align: center;
	}

	.mainInfo h3 {
		padding-top: 0px;
		margin-top: 0px;
	}

	.mainInfo button {
		width: 10rem;
		height: 3rem;

		border: 1px solid #d3d3d3;
		border-radius: 8px;
	}

	.grid {
		position: relative;
		display: grid;
		grid-template-columns: repeat(8, minmax(60px, 1fr));
		gap: 4px;
		background-color: #333;
		padding: 8px;
		border-radius: 8px;
	}

	.cell {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		border-radius: 4px;
		color: #333;
		font-weight: bold;
		font-size: 24px;
		height: 60px;
		cursor: move;
	}

	.cell-1 {
		background-color: #e53935;
		color: #fff;
	}

	.cell-2 {
		background-color: #fb8c00;
		color: #fff;
	}

	.cell-3 {
		background-color: #ffb300;
		color: #fff;
	}

	.cell-4 {
		background-color: #7cb342;
		color: #fff;
	}

	.cell-5 {
		background-color: #1976d2;
		color: #fff;
	}

	@media screen and (max-width: 480px) {
		.insuficiente {
			height: 100vh;
			width: 100vw;

			display: flex;
			flex-direction: column;

			justify-content: center;
			align-items: center;

			top: 0;
			left: 0;

			z-index: 90;

			position: absolute;
			background-color: black;
		}

		.insuficiente h1 {
			font-size: 1rem;
			color: white;
		}

		.mainInfo {
			justify-content: space-between;
		}

		.mainInfo button {
			width: 5rem;

			border: 2px solid #333;
		}

		.grid {
			grid-template-columns: repeat(4, minmax(60px, 1fr));
		}
	}

	@media screen and (min-width: 481px) and (max-width: 1024px) {
		.insuficiente {
			height: 100vh;
			width: 100vw;

			display: flex;
			flex-direction: column;

			justify-content: center;
			align-items: center;

			top: 0;
			left: 0;

			z-index: 90;

			position: absolute;
			background-color: black;
		}

		.insuficiente h1 {
			font-size: 1rem;
			color: white;
		}

		.mainInfo {
			justify-content: space-between;
		}

		.mainInfo button {
			width: 5rem;

			border: 2px solid #333;
		}

		.grid {
			grid-template-columns: repeat(6, minmax(60px, 1fr));
		}
	}
</style>
