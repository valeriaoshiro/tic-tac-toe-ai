$(document).ready(function(){
	let isCompTurn, board;

	let init = () => {
		turn = 'X';
		board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		console.log('initial board', board);
		$('.squares').html('');
		$('h1').html('');
		$('.squares').off('click');

		$('.squares').on('click', function(e){
			if(turn === 'X'){
				e.target.innerHTML = turn;
				board[e.target.id] = turn;
				$(this).off('click');
			}
			console.log('user', board);
			if(!isItDone(board, turn)) compTurn();
		});
	}

	let compTurn = () => {
		let spot = minimax(board, turn).index;
		$('.squares')[spot].innerHTML = 'O';
		board[spot] = 'O';
		$(`.squares`).off('click', `#${spot}`);
		console.log('comp', board);
		isItDone(board, turn);
	}	

	let isItDone = (newBoard, newTurn) => {
		if(winningComb(newBoard, newTurn)){
			$('.squares').off('click');
			if(newTurn === 'X'){
				$('h1').html('You won');
			} else if (turn === 'O'){
				$('h1').html('You lost');
			}
			return true;
		} else if(!winningComb(newBoard, newTurn) && availableSpots(newBoard).length === 0){
			$('h1').html("It's a tie");
			return true;
		}
		if(turn === 'X'){
			turn = 'O';
		} else if (turn === 'O'){
			turn = 'X';
		}
		return false;
	}

	let winningComb = (newBoard, newTurn) => {
		if(newBoard[0] === newBoard[1] && newBoard[0] === newBoard[2] && newBoard[0] === newTurn ||
		   newBoard[3] === newBoard[4] && newBoard[3] === newBoard[5] && newBoard[3] === newTurn ||
		   newBoard[6] === newBoard[7] && newBoard[6] === newBoard[8] && newBoard[6] === newTurn || 
		   newBoard[0] === newBoard[3] && newBoard[0] === newBoard[6] && newBoard[0] === newTurn ||
		   newBoard[1] === newBoard[4] && newBoard[1] === newBoard[7] && newBoard[1] === newTurn ||
		   newBoard[2] === newBoard[5] && newBoard[2] === newBoard[8] && newBoard[2] === newTurn ||
		   newBoard[0] === newBoard[4] && newBoard[0] === newBoard[8] && newBoard[0] === newTurn ||
		   newBoard[2] === newBoard[4] && newBoard[2] === newBoard[6] && newBoard[2] === newTurn){
			return true;
		} else {
			return false;
		}
	}

	let availableSpots = (newBoard) => {
		return newBoard.filter(i => i != 'X' && i != 'O');
	}

	let minimax = (reboard, player) => {	
   		let array = availableSpots(reboard);
  		if (winningComb(reboard, 'X')) {
    		return {
      			score: -10
    		};
  		} else if (winningComb(reboard, 'O')) {
    		return {
      			score: 10
    		};
  		} else if (array.length === 0) {
    		return {
      			score: 0
    		};
  		}

  		var moves = [];
  		for (var i = 0; i < array.length; i++) {
    		var move = {};
    		move.index = reboard[array[i]];
    		reboard[array[i]] = player; 

    		if(player == 'O'){
    			var g = minimax(reboard, 'X');
      			move.score = g.score;
    		} else {
    			var g = minimax(reboard, 'O');
      			move.score = g.score;
    		}
    		reboard[array[i]] = move.index;
    		moves.push(move);
  		}

  		var bestMove;
  		if (player == 'O') {
    		var bestScore = -10000;
    		for (var i = 0; i < moves.length; i++) {
      			if (moves[i].score > bestScore) {
        			bestScore = moves[i].score;
        			bestMove = i;
      			}
    		}
  		} else {
    		var bestScore = 10000;
    		for (var i = 0; i < moves.length; i++) {
      			if (moves[i].score < bestScore) {
        			bestScore = moves[i].score;
        			bestMove = i;
      			}
    		}
  		}
  		// console.log('moves[bestMove]', moves[bestMove])
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
