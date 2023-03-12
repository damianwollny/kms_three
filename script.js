// global variables
const grid = document.getElementById("grid");
let red_array = [];
var x = [];
let glob_level = 4;
let difficulty = 5;

// event listeners
document.getElementById("restart_button").addEventListener("click", init)
document.getElementById("test_button").addEventListener("click", function(){compareArrays(x, red_array);})

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

// automatically color random grid items
function color_in(dim, frac){
    for (let i = 0; i < (dim ** 2)/frac; i++) {
        var ran_num = Math.floor(Math.random() * (dim ** 2) + 1);
        // reduce probability that a number appears multiple times in array
        // needs to be improved
        if (x.includes(ran_num)) {
            var other_num = Math.floor(Math.random() * (dim ** 2) + 1);
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
    for (let i = 1; i <= dim ** 2; i++) {
        document.getElementById(i).style.backgroundColor = "#fff";
    }
}

// attach event listener to every grid item
function grid_item_listener(dim){
    for (let i = 1; i <= (dim ** 2); i++) {
        document.getElementById(i).addEventListener("click", function(){colorbyuser(i)});
    }
}

// color grid items upon user click
function colorbyuser(elem){
    document.getElementById(elem).style.backgroundColor = "red";
    red_array.push(elem);
    console.log("red=", red_array)
}

// compare random grid colors with user choice
function compareArrays(a, b){
    console.log(a.sort())
    console.log(b.sort())
    if (JSON.stringify(a.sort()) === JSON.stringify(b.sort())){
        next_level(glob_level++);
    }else{
        alert("Leider falsch")
        init();
    }
    red_array = [];
    
};

// clear all divs
function remove_divs(classname){
    const elements = document.getElementsByClassName(classname);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

// game initialization
function init(){
    remove_divs("grid_item");
    set_grid_dimensions(3);
    make_grid_items(3);
    color_in(3, difficulty)
    setTimeout(function(){clear_grid_items(3)},3000);
    grid_item_listener(3);
}

// game loop
function next_level(level){
    remove_divs("grid_item");
    set_grid_dimensions(level);
    make_grid_items(level);
    color_in(level, difficulty)
    setTimeout(function(){clear_grid_items(level)},3000);
    grid_item_listener(level);
}

init();