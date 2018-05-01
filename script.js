$(document).ready(function(){
	let isCompTurn = false;
	let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	var compTurn = () => {
		let spot = availableSpots()[0]; //temporary
		$('.squares')[spot].innerHTML = 'O';
		board[spot] = 'O';
		$(`.squares`).off('click', `#${spot}`);
		isItDone();
	}	

	var isItDone = () => {
		if(winningComb()){
			$('.squares').off('click');
			isCompTurn ? $('h1').html('You lost') : $('h1').html('You won');
			return true;
		} else if(!winningComb() && availableSpots().length === 0){
			$('h1').html("It's a tie");
			return true;
		}
		isCompTurn = !isCompTurn;
		return false;
	}

	var winningComb = () => {
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

	var availableSpots = () => {
		return board.filter(i => i != 'X' && i != 'O');
	}

	/****** EVENT LISTENERS ******/
	$('.squares').click(function(e){
		if(!isCompTurn){
			e.target.innerHTML = 'X';
			board[e.target.id] = 'X';
			$(this).off('click');
		}
		if(!isItDone()) compTurn();
	})

})