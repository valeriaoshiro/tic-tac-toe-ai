$(document).ready(function(){
	let isCompTurn = false;
	let turnCount = 0;
	let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	function compTurn(){
		turnCount++;
		let spot = availableSpots()[0];
		console.log('spot ', spot);
		$('.squares')[spot].innerHTML = 'O';
		$(`.squares`).off('click', `#${spot}`);
		board[spot] = 'O';
		if(winningComb()){
			$('.squares').off('click');
			isCompTurn ? $('h1').html('You lost') : $('h1').html('You won');
		} else if(!winningComb() && turnCount === 9){
			$('h1').html("It's a tie");
		}
		isCompTurn = !isCompTurn;
	}

	

	$('.squares').click(function(e){
		turnCount++;

		if(!isCompTurn){
			e.target.innerHTML = 'X';
			board[e.target.id] = 'X';
		}

		if(winningComb()){
			$('.squares').off('click');
			isCompTurn ? $('h1').html('You lost') : $('h1').html('You won');
		} else if(!winningComb() && turnCount === 9){
			$('h1').html("It's a tie");
		} else {
			$(this).off('click');
		isCompTurn = !isCompTurn;
		compTurn();
		}


		
	})

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

})