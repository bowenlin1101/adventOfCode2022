import * as fs from 'fs'

const contents = fs.readFileSync('./src/Day_10/input.txt','utf-8').split('\n')
// const contents = fs.readFileSync('./src/Day_10/test.txt','utf-8').split('\n')

type addx = {X:number,cycle: number }

var strength = 0;
var cycle = 0;
var X = 1;
var toAdd: addx[] = []

function Instructions(){
    for (var i = 0; i < contents.length; i++){
        if (contents[i] != 'noop'){
            var number = parseInt(contents[i].split(' ')[1])
            toAdd.push({X:number, cycle:cycle+2})
            cycle++
            if (cycle == 20 || cycle == 60 || cycle == 100 || cycle == 140 || cycle == 180 || cycle == 220)
                strength += cycle*X

            for (var j = 0; j < toAdd.length; j++ ){
                if (toAdd[j].cycle == cycle){
                    X += toAdd[j].X
                    toAdd.splice(j,1)
                }
            }
        }
        cycle++
        if (cycle == 20 || cycle == 60 || cycle == 100 || cycle == 140 || cycle == 180 || cycle == 220)
            strength += cycle*X
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
console.log(strength)