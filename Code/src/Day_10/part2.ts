import * as fs from 'fs'

const contents = fs.readFileSync('./src/Day_10/input.txt','utf-8').split('\n')
// const contents = fs.readFileSync('./src/Day_10/test.txt','utf-8').split('\n')

type addx = {X:number,cycle: number }

var painting = ""
var cycle = -1;
var X = 1;
var toAdd: addx[] = []

function Instructions(){
    for (var i = 0; i < contents.length; i++){
        if (contents[i] != 'noop'){
            var number = parseInt(contents[i].split(' ')[1])
            toAdd.push({X:number, cycle:cycle+2})
            cycle++
            var CRTPosition = cycle % 40;
            console.log(CRTPosition)
            if (CRTPosition == X || CRTPosition == X+1 || CRTPosition == X-1){
                painting += "#"
            } else {
                painting += "."
            }
            if (cycle == 39 || cycle == 79 || cycle == 119 || cycle == 160-1 || cycle == 200-1 || cycle == 240-1)
                painting += "\n"

            for (var j = 0; j < toAdd.length; j++ ){
                if (toAdd[j].cycle == cycle){
                    X += toAdd[j].X
                    toAdd.splice(j,1)
                }
            }
        }
        cycle++
        var CRTPosition = cycle % 40;
        console.log(CRTPosition)

        if (CRTPosition == X || CRTPosition == X+1 || CRTPosition == X-1){
            painting += "#"
        } else {
            painting += "."
        }
        if (cycle == 39 || cycle == 79 || cycle == 119 || cycle == 160-1 || cycle == 200-1 || cycle == 240-1)
        painting += "\n"
        for (var j = 0; j < toAdd.length; j++ ){
            if (toAdd[j].cycle == cycle){
                X += toAdd[j].X
                toAdd.splice(j,1)
            }
        }
    }
    return ([cycle, X])
}

console.log(Instructions())
console.log(painting)