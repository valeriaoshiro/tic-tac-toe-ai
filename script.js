$(document).ready(function(){
	let isCompTurn = true;
	$('.squares').click(function(e){
		if(isCompTurn){
			e.target.innerHTML = "X";
			isCompTurn = !isCompTurn;
			$(this).off('click');
		} else {
			e.target.innerHTML = "O";
			isCompTurn = !isCompTurn;
			$(this).off('click');
		}
		
	})

	let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];


})