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
        grid = clampvector(addvector(grid,presses[inputLength][n]),0,3);
        for (var i=0; i<size; i++) {
            if( doc && presses[inputLength][n][i] == 1 ) {
                document.getElementById("cell_"+i).style.color = "#00FFFF";
            }
            else {
                document.getElementById("cell_"+i).style.color = "#000000";
            }
        }
        inputLength++;
    }
    if(inputLength >= codeLength && doc) {
        // Success
        if(Math.min(...grid) == 3) {
            document.getElementById("Title").innerText = "Access Granted";
            for (var i=0; i<size; i++) {
                document.getElementById("cell_"+i).style.color = "#000000";
            }
        }
        // Failure
        else {
            document.getElementById("Title").innerText = "Wrong passcode, try again";
            setTimeout(function(){
                document.getElementById("Title").innerText = "";
                reset(true);
            }, 2000); 
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
            document.getElementById("cell_"+i).style.background = "#FF0000"; break;
        case 2: // Orange
            document.getElementById("cell_"+i).style.background = "#FFB100"; break;
        case 3: // Green
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
    for (var i=0; i<=Math.pow(size,codeLength)-1; i++) {
        for (var a=codeLength-1; a>=0; a--) {
            clickCell(Math.floor(i/Math.pow(size,a))%size);
        }
        if(Math.min(...grid) == 3) {
            sol.push( Number(i.toString(size)) + (Math.pow(10,codeLength)-1)/9 );
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
            document.getElementById("Solutions").innerText += sol.length>0 ? sol[i] + "\r\n" : "No Solutions!\r\n";
        }
    }
    else {
        document.getElementById("Solutions").innerText = "";
    }
}

function randomizePresses(s = -1)
{
    seed = s;
    if(s<1) {
        do {
            seed = Math.floor(Math.random() * (4294967296 + 1));
            randomSeed(seed);
            presses = Randomizer(codeLength,size,size, seed );
        } while(solve().length != 1)
    }
    else
    {
        randomSeed(seed);
        presses = Randomizer(codeLength,size,size, seed );
    }
    document.getElementById("Seed").innerText = "Seed = " + (seed).toString();
    if(document.getElementById("Solutions").innerText != "") {
        document.getElementById("Solutions").innerText = ""
    }
    reset(true);
    resetButtons();
}

function customSeed()
{
    var seed = prompt("Input a custom seed", "");
    seed = Number(seed);
    if(seed > 0) {
        randomizePresses(seed);
    }
}

function fillButtons()
{
    for (var turn=0; turn<codeLength; turn++) {
        for (var pos=0; pos<size; pos++) {
            for (var num=0; num<size; num++) {
                var box = document.getElementById("turn"+turn+"_"+pos+"_"+num);
                box.style.border = "1px solid #000000";
                if( presses[turn][num][pos] == 1) {
                    box.style.background = "#FF0000";
                }
            }
        }
    }
}

function resetButtons()
{
    for (var turn=0; turn<codeLength; turn++) {
        for (var pos=0; pos<size; pos++) {
            for (var num=0; num<size; num++) {
                var box = document.getElementById("turn"+turn+"_"+pos+"_"+num);
                box.style.border = "0px solid #000000";
                box.style.background = "#FFFFFF";
            }
        }
    }
}