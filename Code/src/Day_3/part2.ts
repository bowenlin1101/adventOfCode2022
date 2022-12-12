import * as fs from 'fs'

// var contents = fs.readFileSync('./src/Day_3/input.txt','utf-8').split("\n")
type letter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' 
| 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' 
| 'y' | 'z' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' 
| 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' 
| 'Y' | 'Z' 
// var contents = fs.readFileSync('./src/Day_3/test.txt','utf-8').split("\n")
var contents = fs.readFileSync('./src/Day_3/input.txt','utf-8').split("\n")


function calculatePoints(letter:letter){
    var alphabet = Array.from("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
    return alphabet.indexOf(letter) + 1;
}

function main(contents:string[]){
    var splitContents = []
    var chunk = []

    for (var i = 0; i < contents.length; i++){
        console.log(chunk)
        chunk.push(contents[i])
        if (chunk.length == 3) {
            splitContents.push(chunk)
            chunk = []
        }
    }

    var points = 0;
    for (var i = 0; i < splitContents.length; i++){
        var string = splitContents[i][0]
        var compare1 = splitContents[i][1]
        var compare2 = splitContents[i][2]
        for (var j = 0; j < string.length; j++){
           if (compare1.includes(string[j]) && compare2.includes(string[j])){
               points += calculatePoints(string[j])
               console.log(string[j])
               break
           }
        }
    }
    console.log(points)
}
main(contents)

