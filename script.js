$(document).ready(function(){
	let isCompTurn = true;
	let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	$('.squares').click(function(e){
		if(isCompTurn){
			e.target.innerHTML = "X";
			board[e.target.id] = "X";
		} else {
			e.target.innerHTML = "O";
			board[e.target.id] = "O";
		}
		$(this).off('click');
		isCompTurn = !isCompTurn;

		if(winningComb()){
			$('.squares').off('click');
			console.log('won');
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

})