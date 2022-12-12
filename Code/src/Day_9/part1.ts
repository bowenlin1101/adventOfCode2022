import * as fs from 'fs'

// const contents = fs.readFileSync('./src/Day_9/test.txt','utf-8').split('\n')
const contents = fs.readFileSync('./src/Day_9/input.txt','utf-8').split('\n')
var positions = []

type Direction = "U" | "D" | "L" | "R"

function tailFollow(tailPosition:{row:number, col:number}, headPosition:{row:number, col:number}){
    var rowSeperated = Math.abs(tailPosition.row - headPosition.row) > 1
    var colSeperated = Math.abs(tailPosition.col - headPosition.col) > 1
    var headIsAbove = (headPosition.row - tailPosition.row) > 0
    var headIsToRight = (headPosition.col - tailPosition.col) > 0

    if (rowSeperated && tailPosition.col == headPosition.col){
        if (headIsAbove){
            tailPosition.row += 1
        } else {
            tailPosition.row -= 1
        }
    }

    if (colSeperated && tailPosition.row == headPosition.row){
        if (headIsToRight){
            tailPosition.col += 1
        } else {
            tailPosition.col -= 1
        }
    }

    if ((rowSeperated || colSeperated) && tailPosition.row != headPosition.row && tailPosition.col != headPosition.col){
        if (headIsToRight && headIsAbove){
            tailPosition.col += 1
            tailPosition.row += 1
        } else if (headIsToRight && !headIsAbove){
            tailPosition.col += 1
            tailPosition.row -= 1
        } else if (!headIsToRight && headIsAbove){
            tailPosition.col -= 1
            tailPosition.row += 1
        } else {
            tailPosition.col -= 1
            tailPosition.row -= 1
        }
    }
    positions.push({row:tailPosition.row,col:tailPosition.col})
    return tailPosition
}

function moveHead(instruction:Direction, head:{row:number,col:number}){
    if (instruction == "U"){
        head.row += 1
    } else if (instruction == "D"){
        head.row -= 1

    } else if (instruction == "L"){
        head.col -= 1

    } else if (instruction == "R"){
        head.col += 1
    }
    return head
}

function expandInstructions(){
    var instructions: Direction[] = []
    for (var i = 0; i < contents.length; i++){
        var direction = contents[i].split(' ')[0]
        var number = parseInt(contents[i].split(' ')[1])
        for (var j = 0; j < number; j++){
            instructions.push(direction as Direction)
        }
    }
    return instructions
}

function main(){
    var tail: {row:number,col:number} = {row:0,col:0}
    var head: {row:number,col:number} = {row:0,col:0}
    var instructions = expandInstructions()
    for (var i = 0; i < instructions.length; i++){
        head = moveHead(instructions[i],head)
        tail = tailFollow(tail,head)
    }
    var uniquePositions = [...new Set(positions.map((object) => JSON.stringify(object)))].map((string) => JSON.parse(string));
    return uniquePositions.length
}

console.log(main())