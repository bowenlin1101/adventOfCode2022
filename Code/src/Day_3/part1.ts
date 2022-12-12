import * as fs from 'fs'

type letter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' 
| 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' 
| 'y' | 'z' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' 
| 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' 
| 'Y' | 'Z' 
const contents = fs.readFileSync('./src/Day_3/input.txt','utf-8').split("\n")
// const contents = fs.readFileSync('./src/Day_3/test.txt','utf-8').split("\n")


function calculatePoints(letter:letter){
    var alphabet = Array.from("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
    return alphabet.indexOf(letter) + 1;
}

function main(contents:string[]){
    var splitContents = contents.map((string) => [string.slice(0,string.length/2),string.slice(string.length/2)])
    var points = 0;
    for (var i = 0; i < splitContents.length; i++){
        for (var j = 0; j < splitContents[i][0].length; j++){
            var string = splitContents[i][0][j]
            if (splitContents[i][1].includes(string)){
                points += calculatePoints(string as letter)
                break
            }
        }
    }
    console.log(points)
}

main(contents)

