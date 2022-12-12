import * as fs from 'fs'

// const contents = fs.readFileSync('./src/Day_9/test2.txt','utf-8').split('\n')
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
    var head: {row:number,col:number} = {row:0,col:0}
    var tail1: {row:number,col:number} = {row:0,col:0}
    var tail2: {row:number,col:number} = {row:0,col:0}
    var tail3: {row:number,col:number} = {row:0,col:0}
    var tail4: {row:number,col:number} = {row:0,col:0}
    var tail5: {row:number,col:number} = {row:0,col:0}
    var tail6: {row:number,col:number} = {row:0,col:0}
    var tail7: {row:number,col:number} = {row:0,col:0}
    var tail8: {row:number,col:number} = {row:0,col:0}
    var tail9: {row:number,col:number} = {row:0,col:0}
    var instructions = expandInstructions()
    for (var i = 0; i < instructions.length; i++){
        head = moveHead(instructions[i],head)
        tail1 = tailFollow(tail1,head)
        tail2 = tailFollow(tail2,tail1)
        tail3 = tailFollow(tail3,tail2)
        tail4 = tailFollow(tail4,tail3)
        tail5 = tailFollow(tail5,tail4)
        tail6 = tailFollow(tail6,tail5)
        tail7 = tailFollow(tail7,tail6)
        tail8 = tailFollow(tail8,tail7)
        tail9 = tailFollow(tail9,tail8)
        positions.push({row:tail9.row,col:tail9.col})
    }
    var uniquePositions = [...new Set(positions.map((object) => JSON.stringify(object)))].map((string) => JSON.parse(string));
    return uniquePositions.length
}

console.log(main())