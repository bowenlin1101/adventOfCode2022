import * as fs from 'fs'

const contents = fs.readFileSync("./src/Day_1/input.txt",'utf-8').split("\n")
// const contents = fs.readFileSync("test.txt",'utf-8').split("\n")

function findLargest(contents:string[]){
    var bestElves: {index: number, energy: number }[] = [{index: 0, energy:0},{index:0,energy:0},{index:0,energy:0}];

    var totalEnergy = 0;
    var index = 0;
    for (var i = 0; i < contents.length; i++){
        if (contents[i] == ''){
            var least = 999999999;
            var worstElfIndex;
            for (var j = 0; j < bestElves.length; j++){
                if (bestElves[j].energy < least){
                    least = bestElves[j].energy
                    worstElfIndex = j
                }
            }
            if (totalEnergy > bestElves[worstElfIndex].energy){
                bestElves[worstElfIndex].index = index
                bestElves[worstElfIndex].energy = totalEnergy
            }
            index++
            totalEnergy = 0
        } else {
            totalEnergy += parseInt(contents[i])
        }
    }
    var calories = (bestElves.map((object) => object.energy)).reduce((partialCalories, calories) => partialCalories + calories, 0)
    console.log(calories)
    console.log(bestElves)
}   
findLargest(contents)