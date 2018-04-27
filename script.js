$(document).ready(function(){
	let isCompTurn = true;
	$('.squares').click(function(e){
		if(isCompTurn){
			e.target.innerHTML = "X";
		} else {
			e.target.innerHTML = e.target.id;
		}
		
	})

	let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];


})