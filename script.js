// global variables
const grid = document.getElementById("grid");

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
    for (let i = 0; i < dim/frac; i++) {
        x = Math.floor(Math.random() * (dim + 1))
        console.log(x)
    }
}

set_grid_dimensions(3);
make_grid_items(3);
color_in(9, 3)