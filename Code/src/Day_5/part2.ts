import * as fs from 'fs'

const contents = fs.readFileSync('./src/Day_5/input.txt','utf-8').split('\n')
// const contents = fs.readFileSync('./src/Day_5/test.txt','utf-8').split('\n')

var map = contents
const instructions = map.splice(contents.indexOf(""),contents.length - contents.indexOf("")).filter((value) => value != "")
type instruction = [number:number,from:number,to:number]
var stack = createStack()
var parsedInstructions:instruction[] = parseInstructions()

function sort(){
    for (var i = 0; i < parsedInstructions.length; i++){
        var number = parsedInstructions[i][0]
        var from = parsedInstructions[i][1]
        var to = parsedInstructions[i][2]
        var toReverse = []
        for (var j = 0; j < number; j++){
            var letter = stack[from].pop()
            toReverse.push(letter)
        }
        var reversed = toReverse.reverse()
        for (var j = 0; j < toReverse.length; j++){
            stack[to].push(reversed[j])
        }
    }
    var top = []
    for (var i = 0; i < stack.length; i++){
        top.push(stack[i][stack[i].length-1])
    }
    console.log(top)
}


function createStack(){
    const columnHeadings = map[map.length-1]
    var indices = columnHeadings.split(" ").filter((value) => value != "").map((value,index) => columnHeadings.indexOf(String(index+1)))
    var stack = []
    for (var i = 0; i < indices.length; i++){
        var column = []
        for (var j = map.length-2; j >= 0; j--){
            if (map[j][indices[i]] != " ")
            column.push(map[j][indices[i]])
        }
        stack.push(column)
    }
    return(stack)
}

function parseInstructions(){
    var parsed = []
    for (var i = 0; i < instructions.length; i++){
        var bits = instructions[i].split(" ")
        parsed.push([parseInt(bits[1]),parseInt(bits[3])-1,parseInt(bits[5])-1])
    }
    return parsed
}

sort()