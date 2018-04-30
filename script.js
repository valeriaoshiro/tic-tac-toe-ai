$(document).ready(function(){
	let isCompTurn = true;
	let turnCount = 0;
	let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	$('.squares').click(function(e){
		turnCount++;

		if(isCompTurn){
			e.target.innerHTML = 'X';
			board[e.target.id] = 'X';
		} else {
			e.target.innerHTML = 'O';
			board[e.target.id] = 'O';
		}

		if(winningComb()){
			$('.squares').off('click');
			isCompTurn ? $('h1').html('You lost') : $('h1').html('You won');
		} else if(!winningComb() && turnCount === 9){
			$('h1').html("It's a tie");
		}

		$(this).off('click');
		isCompTurn = !isCompTurn;
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

})