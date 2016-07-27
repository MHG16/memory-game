//array to hold all the pairs of letters
var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L']

var memory_values = [];
//holds the unique id for each tile
var memory_tile_ids = [];
//initially no tiles are flipped yet
var tiles_flipped = 0;


/* this Array prototype performs the shuffle of the memory_array.
three variables are used: the length of the array, a random number 
between 1 and the length of the array, and a temporary variable.  While
i is greater than 0, the random number is selected.  Then, a swap is performed 
between the values at i and j, using the temporary variable.  
*/
Array.prototype.memory_tile_shuffle = function () {
	var i = this.length;
	var j; 
	var temp;

	while (--i > 0) {
		j = Math.floor(Math.random() * (i + 1));
		temp = this[j];
		this[j] = this[i];
		this[i] = temp;
	}
}

/* function to create a new game board of cards.  
The shuffle function is first called on the array.  Then the card divs are dynamically created, with each card
having an onclick event listener that will call the memoryFliptile function when clicked.  
*/
function newBoard() {
	tiles_flipped = 0;
	var output = '';
	memory_array.memory_tile_shuffle();
	for (var i = 0; i < memory_array.length; i++) {
		output += '<div id = "tile_'+i+'"onclick = "memoryFlipTile(this, \''+memory_array[i]+'\')"></div>'
	}
	document.getElementById('memory_board').innerHTML = output;

}

newBoard();  


