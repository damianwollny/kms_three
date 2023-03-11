// global variables
const grid = document.getElementById("grid");

// event listeners
document.getElementById("restart_button").addEventListener("click", game_loop)

// change the dimensions of the grid
function set_grid_dimensions(dim){
    grid.style.gridTemplateColumns = "repeat("+dim+", 1fr)";
    grid.style.gridTemplateRows = "repeat("+dim+", 1fr)";
}

// generate new divs in the grid container
function make_grid_items(col_row_num){
    //remove_divs("grid-item");
    for(let i = 0; i < (col_row_num ** 2); i++){
        const item = document.createElement("div");
        item.setAttribute("class", "grid_item");
        item.setAttribute("id", i+1);
        grid.appendChild(item);
        console.log(item)
    }
}

// color random grid items
function color_in(dim, frac){
    var x = [];
    for (let i = 0; i < dim/frac; i++) {
        var ran_num = Math.floor(Math.random() * dim + 1);
        // reduce probability that a number appears multiple times in array
        // needs to be improved
        if (x.includes(ran_num)) {
            var other_num = Math.floor(Math.random() * dim + 1);
            x[i] = other_num;
            // color grid item blue
            document.getElementById(x[i]).style.backgroundColor = "#219ebc"
        }else{
            x[i] = ran_num;
            // color grid item blue
            document.getElementById(x[i]).style.backgroundColor = "#219ebc"
        }
    }

}

// remove colors
function clear_grid_items(dim){
    for (let i = 1; i <= dim; i++) {
        document.getElementById(i).style.backgroundColor = "#fff";
    }
}


function game_loop(){
    set_grid_dimensions(3);
    make_grid_items(3);
    color_in(9, 3)
    setTimeout(function(){clear_grid_items(9)},3000);
}

game_loop();