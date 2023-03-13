// global variables
const grid = document.getElementById("grid");
let red_array = [];
var blue_array = [];
let points_counter = 0;
let glob_level = 4;
let difficulty = 8;

// event listeners
document.getElementById("restart_button").addEventListener("click", init)
document.getElementById("test_button").addEventListener("click", function(){compareArrays(blue_array, red_array);})

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
    }
}

// automatically color random grid items
function color_in(dim, frac){
    for (let i = 0; i < (dim ** 2)/frac; i++) {
        var ran_num = Math.floor(Math.random() * (dim ** 2) + 1);
        // reduce probability that a number appears multiple times in array
        // needs to be improved
        if (blue_array.includes(ran_num)) {
            var other_num = Math.floor(Math.random() * (dim ** 2) + 1);
            blue_array[i] = other_num;
            // color grid item blue
            document.getElementById(blue_array[i]).style.backgroundColor = "#219ebc"
        }else{
            blue_array[i] = ran_num;
            // color grid item blue
            document.getElementById(blue_array[i]).style.backgroundColor = "#219ebc"
        }
    }
    console.log("blue_array= ", blue_array)
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
    var clicked_item = document.getElementById(elem)
    // get current color of grit item
    style = window.getComputedStyle(clicked_item);
    circ_bg = style.getPropertyValue("background-color");
    if (circ_bg == "rgb(255, 255, 255)") {
        clicked_item.style.backgroundColor = "#d00000";
        // add grid item to array
        red_array.push(elem);
    }else if (circ_bg == "rgb(208, 0, 0)"){
        clicked_item.style.backgroundColor = "white";
        // remove grid item from array
        red_array = red_array.filter(function(item) {return item !== elem}) 
    }
    console.log("red_array=", red_array)
}

// compare random grid colors with user choice
function compareArrays(a, b){
    if (JSON.stringify(a.sort()) === JSON.stringify(b.sort())){
        glob_level = glob_level + 0.3
        next_level(Math.floor(glob_level));
        document.getElementById("title").innerHTML = "PUNKTE: " + (++points_counter)
    }else{
        // show the mistake
        for (let k = 0; k < blue_array.length; k++) {
            document.getElementById(blue_array[k]).style.backgroundColor = "#219ebc";
        }
    }
    red_array = [];
};

// clear all divs
function remove_divs(classname){
    const elements = document.getElementsByClassName(classname);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    blue_array = [];
}

// game initialization
function init(){
    glob_level = 4;
    points_counter = 0;
    document.getElementById("title").innerHTML = "PUNKTE: " + points_counter
    remove_divs("grid_item");
    set_grid_dimensions(3);
    make_grid_items(3);
    color_in(3, difficulty)
    setTimeout(function(){clear_grid_items(3)},3000);
    grid_item_listener(3);
}

// game loop
function next_level(level){
    console.log(glob_level);
    remove_divs("grid_item");
    set_grid_dimensions(level);
    make_grid_items(level);
    color_in(level, difficulty)
    setTimeout(function(){clear_grid_items(level)},3000);
    grid_item_listener(level);
}

init();