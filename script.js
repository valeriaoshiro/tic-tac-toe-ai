$(document).ready(function(){
	let isCompTurn, board;

	let init = () => {
		isCompTurn = false;
		board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		console.log('initial board', board);
		$('.squares').html('');
		$('h1').html('');
		$('.squares').off('click');

		$('.squares').on('click', function(e){
			if(!isCompTurn){
				e.target.innerHTML = 'X';
				board[e.target.id] = 'X';
				$(this).off('click');
			}
			console.log('user ', board)
			if(!isItDone()) compTurn();
		});
	}

	let compTurn = () => {
		let spot = minimax(board, isCompTurn); //temporary
		$('.squares')[spot].innerHTML = 'O';
		board[spot] = 'O';
		console.log(minimax(board, 0, isCompTurn));
		$(`.squares`).off('click', `#${spot}`);
		isItDone();
		console.log('comp', board)
	}	

	let isItDone = () => {
		if(winningComb()){
			$('.squares').off('click');
			isCompTurn ? $('h1').html('You lost') : $('h1').html('You won');
			return true;
		} else if(!winningComb() && availableSpots(board).length === 0){
			$('h1').html("It's a tie");
			return true;
		}
		isCompTurn = !isCompTurn;
		return false;
	}

	let winningComb = () => {
		if(board[0] === board[1] && board[0] === board[2] ||
		   board[3] === board[4] && board[3] === board[5] ||
		   board[6] === board[7] && board[6] === board[8] || 
		   board[0] === board[3] && board[0] === board[6] ||
		   board[1] === board[4] && board[1] === board[7] ||
		   board[2] === board[5] && board[2] === board[8] ||
		   board[0] === board[4] && board[0] === board[8] ||
		   board[2] === board[4] && board[2] === board[6] ){
			return true;
		} else {
			return false;
		}
	}

	let availableSpots = (board) => {
		return board.filter(i => i != 'X' && i != 'O');
	}

	let minimax = (board, isComp) => {
		let availSpots = availableSpots(board);

		if(winningComb() && isComp){
			return {score: 1};
		} else if(winningComb() && !isComp){
			return {score: -1};
		} else if(availSpots.length === 0){
			return {score: 0};
		}

		var moves = [];

		availSpots.forEach(spot => {
			let move = {};
			move.index = spot;
			board[spot] = isComp;
			let result = minimax(board, !isComp);
			move.score = result.score;
			board[spot] =  move.index;
			moves.push(move);
		});

		let bestMove;

		if(isComp){
			let bestValue = -1000;
			moves.forEach((move, i) => {
				bestValue = Math.max(move.score, bestValue);
				bestMove = i;
			});
		} else {
			let bestValue = 1000;
			moves.forEach((move, i) => {
				bestValue = Math.min(move.score, bestValue);
				bestMove = i
			});
		}
		return moves[bestMove];
	}

	$('button').on('click', function(e){
		init();
	});

	/****** START GAME ******/
	init();

})

/* minimax pseudocode from wikipedia

01 function minimax(node, depth, maximizingPlayer)
02     if depth = 0 or node is a terminal node
03         return the heuristic value of node

04     if maximizingPlayer
05         bestValue := −∞
06         for each child of node
07             v := minimax(child, depth − 1, FALSE)
08             bestValue := max(bestValue, v)
09         return bestValue

10     else    (* minimizing player *)
11         bestValue := +∞
12         for each child of node
13             v := minimax(child, depth − 1, TRUE)
14             bestValue := min(bestValue, v)
15         return bestValue

*/
