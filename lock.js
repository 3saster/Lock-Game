// Codelength and size
const codeLength = 4;
const size = 9;
var inputLength = 0;

// Declare "grid" as a 1-dimensional array
var grid = new Array(size);

// Randomize the presses
var presses;
randomizePresses();

function clickCell(n, doc = false) {
    if(inputLength < codeLength) {
        grid = clampvector(addvector(grid,presses[inputLength][n]),0,1);
        for (var i=0; i<size; i++) {
            if( doc && presses[inputLength][n][i] == 1 ) {
                document.getElementById("cell_"+i).style.color = "#00FFE7";
            }
            else {
                document.getElementById("cell_"+i).style.color = "#000000";
            }
        }
        inputLength++;
    }
    if(inputLength >= codeLength) {
        // Success
        if(Math.min(...grid) >= 1) {
            for (var i=0; i<size; i++) {
                grid[i] = 3;
            }
            if(doc) {
                document.getElementById("Title").innerText = "Access Granted";
                for (var i=0; i<size; i++) {
                    document.getElementById("cell_"+i).style.color = "#000000";
                }
            }
        }
        // Failure
        else {
            for (var i=0; i<size; i++) {
                if(grid[i] == 1)
                grid[i] = 2;
            }
            if(doc) {
                document.getElementById("Title").innerText = "Wrong passcode, try again";
                setTimeout(function(){
                    document.getElementById("Title").innerText = "";
                    reset(true);
                }, 2000); 
            }
        }
    }
    if(doc) {
        updateCells();
    }
}

function updateCells() {
    for (var i=0; i<size; i++) {
        switch(grid[i]) {
        case 0: // White
            document.getElementById("cell_"+i).style.background = "#FFFFFF"; break;
        case 1: // Yellow
            document.getElementById("cell_"+i).style.background = "#FFFF00"; break;
        case 2: // Red (Failure)
            document.getElementById("cell_"+i).style.background = "#FF0000"; break;
        case 3: // Green (Success)
            document.getElementById("cell_"+i).style.background = "#00FF00"; break;
        }
    }
}

function reset(doc = false) {
    for (var i=0; i<size; i++) {
        grid[i] = 0;
    }
    inputLength = 0;
    if(doc) {
        updateCells();
        for (var i=0; i<size; i++) {
            document.getElementById("cell_"+i).style.color = "#000000";
        }
    }
}

function solve()
{
    var sol = [];
    reset();
    for (var i=0; i<=8888; i++) {
        var dig = [Math.floor(i/1000)%10, Math.floor(i/100)%10, Math.floor(i/10)%10, Math.floor(i/1)%10];
        if(dig.includes(size)) {
            continue;
        }
        for (var a=0; a<=codeLength; a++) {
            clickCell(dig[a]);
        }
        if(Math.min(...grid) == 3) {
            sol.push(i+1111);
        }
        reset();
    }
    return sol;
}

function toggleSolutions()
{
    if(document.getElementById("Solutions").innerText == "") {
        sol = solve();
        for (var i=0; i<sol.length; i++) {
            document.getElementById("Solutions").innerText += sol[i] + "\r\n";
        }
    }
    else {
        document.getElementById("Solutions").innerText = "";
    }
}

function randomizePresses(s = -1)
{
    do {
        if(s == -1) {
            seed = Math.floor(Math.random() * (4294967296 + 1));
        }
        else {
            seed = s;
        }
        presses = Randomizer(codeLength,size,size, seed );
    } while(solve().length == 0)
    document.getElementById("Seed").innerText = "Seed = " + (seed).toString();
    if(document.getElementById("Solutions").innerText != "") {
        document.getElementById("Solutions").innerText = ""
    }
    reset(true);
}

function customSeed()
{
    var seed = prompt("Input a custom seed", "");
    seed = Number(seed);
    if(seed > 0) {
        randomizePresses(seed);
    }
}