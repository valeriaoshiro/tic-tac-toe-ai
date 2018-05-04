$(document).ready(function(){
	let isCompTurn, board;

	let init = () => {
		turn = 'X';
		board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		$('.squares').html('');
		$('h2').html('');
		$('.squares').off('click');

		$('.squares').on('click', function(e){
			if(turn === 'X'){
				e.target.innerHTML = turn;
				board[e.target.id] = turn;
				$(this).off('click');
			}
			if(!isItDone(board, turn)) compTurn();
		});
	}

	let compTurn = () => {
		let spot = minimax(board, turn).index;
		setTimeout(()=>{
			$('.squares')[spot].innerHTML = 'O';
			board[spot] = 'O';
			$(`.squares`).off('click', `#${spot}`);
			isItDone(board, turn);
		}, 500);
	}	

	let isItDone = (newBoard, newTurn) => {
		if(winningComb(newBoard, newTurn)){
			$('.squares').off('click');
			newTurn === 'X' ? $('h2').html('You won') : $('h2').html('You lost');
			return true;
		} else if(!winningComb(newBoard, newTurn) && availableSpots(newBoard).length === 0){
			$('h2').html("It's a tie");
			return true;
		}
		turn = turn === 'X' ? 'O' : 'X';
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

	let minimax = (newBoard, newTurn) => {	
   		let availSpots = availableSpots(newBoard);
  		if (winningComb(newBoard, 'X')) {
    		return {score: -10};
  		} else if (winningComb(newBoard, 'O')) {
    		return {score: 10};
  		} else if (availSpots.length === 0) {
    		return {score: 0};
  		}

  		var moves = [];
  		availSpots.forEach(spot => {
  			var move = {};
    		move.index = newBoard[spot];
    		newBoard[spot] = newTurn; 

    		if(newTurn == 'O'){
    			var g = minimax(newBoard, 'X');
      			move.score = g.score;
    		} else {
    			var g = minimax(newBoard, 'O');
      			move.score = g.score;
    		}
    		newBoard[spot] = move.index;
    		moves.push(move);
  		});

  		var bestMove;
  		if (newTurn == 'O') {
    		var bestScore = -10000;
    		moves.forEach((move, i) => {
    			if (move.score > bestScore) {
        			bestScore = move.score;
        			bestMove = i;
      			}
    		});
  		} else {
    		var bestScore = 10000;
    		moves.forEach((move, i) => {
    			if (move.score < bestScore) {
        			bestScore = move.score;
        			bestMove = i;
      			}
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
