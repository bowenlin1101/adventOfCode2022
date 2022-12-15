import * as fs from 'fs'

// const contents = fs.readFileSync('./src/Day_14/test.txt', 'utf-8').split('\n')
const contents = fs.readFileSync('./src/Day_14/input.txt', 'utf-8').split('\n')
type blocks = {row: number, col:number}
var stationaryBlocks:blocks[] = []

function createInitialBlocks(){
    var structures:blocks[][] = []
    for (var i = 0; i < contents.length; i++){
        var structure:blocks[] = []
        var points = contents[i].replace(/ /g,"").split('->')
        for (var j = 0; j < points.length; j++){
            var row = parseInt(points[j].split(',')[1])
            var col = parseInt(points[j].split(',')[0])
            structure.push({row:row,col:col})
        }
        structures.push(structure)
    }
    for (var h = 0; h < structures.length; h++){
        var structure = structures[h]
        for (var i = 1; i < structure.length; i++){
            var drawInitial = 1;
            if (i == 1){
                drawInitial = 0;
            }
            if (structure[i].row == structure[i-1].row){
                var increasing = (structure[i].col - structure[i-1].col) > 0
                var addOrSubtract = increasing ? 1 : -1
                var numRows = Math.abs(structure[i].col - structure[i-1].col)
                for (var j = drawInitial; j < numRows + 1; j++){
                    stationaryBlocks.push({row:structure[i].row,col:structure[i-1].col + j*addOrSubtract})
                }
            } else {
                var increasing = (structure[i].row - structure[i-1].row) > 0
                var addOrSubtract = increasing ? 1 : -1
                var numCols = Math.abs(structure[i].row - structure[i-1].row)
                for (var j = drawInitial; j < numCols + 1; j++){
                    stationaryBlocks.push({row:structure[i-1].row + j*addOrSubtract, col: structure[i].col})
                }
            }
        }
    }
}
createInitialBlocks()

function findFloorPosition(){
    var heighestPoint = 0
    for (var i = 0; i < stationaryBlocks.length; i++){
        if (heighestPoint < stationaryBlocks[i].row){
            heighestPoint = stationaryBlocks[i].row
        }
    }
    return heighestPoint + 2
}
var groundRow = findFloorPosition()

function simulateSand(position: blocks){
    var below = {row:position.row + 1, col:position.col}
    var diagLeft = {row:position.row + 1, col:position.col-1}
    var diagRight = {row:position.row + 1, col:position.col+1}

    var isBelow = stationaryBlocks.some((stationaryBlock) => stationaryBlock.row  == below.row && stationaryBlock.col == below.col)
    var isDiagLeft = stationaryBlocks.some((stationaryBlock) => stationaryBlock.row  == diagLeft.row && stationaryBlock.col == diagLeft.col)
    var isDiagRight = stationaryBlocks.some((stationaryBlock) => stationaryBlock.row  == diagRight.row && stationaryBlock.col == diagRight.col)

    if (stationaryBlocks.some((value) => value.row == 0 && value.col == 500)){
        return "No more room"
    }

    if (position.row == groundRow-1){
        stationaryBlocks.push(position)
        return "Set in place"
    }

    if (!isBelow){
        return simulateSand({row:position.row + 1,col:position.col})
    } else if (isBelow && !isDiagLeft){
        return simulateSand({row:position.row + 1,col:position.col-1})
    } else if (isBelow && isDiagLeft && !isDiagRight){
        return simulateSand({row:position.row + 1,col:position.col+1})
    } else if (isBelow && isDiagLeft && isDiagRight){
        stationaryBlocks.push(position)
        return "Set in place"
    }
}

function main(){
    var output = ''
    var total = 0;
    while (output != "No more room"){
        output = simulateSand({row:0,col:500})
        total++
    }
    console.log(total-1)
}

main()