function addvector(a,b){
    return a.map((e,i) => (e + b[i])%2);
}
function clampvector(a,min,max){
    return a.map((e,i) => Math.min(Math.max(e,min),max));
}

function makeArray(d1, d2, d3) {
    var arr = [];
    for(let i = 0; i < d1; i++) {
        var arr2 = [];
        for(let j = 0; j < d2; j++) {
        arr2.push(new Array(d3));
        }
        arr.push(arr2);
    }
    return arr;
}

function Randomizer(d1,d2,d3,seed) {
    randomSeed(seed);
    presses = makeArray(d1,d2,d3);
    for (var i=0; i<d1; i++) {
        for (var j=0; j<d2; j++) {
            for (var k=0; k<d3; k++) {
                presses[i][j][k] = random() < 0.5 ? 1 : 0;
            }
        }
    }
    return presses;
}

var m_w = 123456789;
var m_z = 987654321;
var mask = 0xffffffff;

// Takes any integer
function randomSeed(i) {
    m_w = (123456789 + i) & mask;
    m_z = (987654321 - i) & mask;
}

// Returns number between 0 (inclusive) and 1.0 (exclusive),
// just like Math.random().
function random()
{
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
}