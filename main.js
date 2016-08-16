//array to hold all the pairs of letters
//Possibly use objects here with images so game will be 
//to match images instead of letters.  
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

window.addEventListener(
newBoard()); 


//Function to flip two cards and check if there is a match
function memoryFlipTile(tile,val) {
	if(tile.innerHTML == "" && memory_values.length < 2) {
		tile.style.background ='#FFF';
		tile.innerHTML = val;
		//first card flipped
		if(memory_values.length == 0) {
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		//second card flipped	
		} else if(memory_values.length == 1) {
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			//check to see if we have a match
			if(memory_values[0] == memory_values[1]) {
				tiles_flipped +=2;
				//clear both arrays
				memory_values = [];
				memory_tile_ids = [];
				//check to see if the whole board is cleared
				if(tiles_flipped == memory_array.length) {
					alert("Board cleared... generating new board");
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
				}
			} else {
				//no match is made so flip the 2 cards back over
				function flip2Back() {
					var tile_1 = document.getElementById(memory_tile_ids[0]);
					var tile_2 = document.getElementById(memory_tile_ids[1]); 
					tile_1.style.background = 'background-color: blue';
					tile_1.innerHTML = "";
					tile_2.style.background = 'background-color: blue';
					tile_2.innerHTML = "";
					//clear both arrays
					memory_values = [];
					memory_tile_ids = [];
				}
			}
			//sets length of time before cards flipped back.  
			setTimeout(flip2Back, 700);
		}	
	}
}

