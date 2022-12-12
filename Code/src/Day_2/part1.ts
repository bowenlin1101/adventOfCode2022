import * as fs from 'fs'

type opponentMove = "A" | "B" | "C" | null;
type ourMove = "X" | "Y" | "Z" | null;

const contents = fs.readFileSync("./src/Day_2/input.txt",'utf-8').split("\n")
// const contents = fs.readFileSync("./src/Day_2/test.txt",'utf-8').split("\n") as [string,string]

function score(){
    var totalPoints = 0;
    for (var i = 0; i < contents.length; i++){
        var tuple = contents[i].split(" ") as [opponentMove,ourMove]
        totalPoints += winLose(tuple[0],tuple[1])
    }
    console.log(totalPoints)
}

function winLose(opponentMove:opponentMove, ourMove:ourMove){
    var points = 0;
    var convertedMove: opponentMove;
    switch (ourMove){
        case "X":
            convertedMove = "A"
            points += 1
            break;
        case "Y":
            convertedMove = "B"
            points += 2
            break;
        case "Z":
            convertedMove = "C"
            points += 3
        default:
            console.log("bruh")
    }

    if (convertedMove == opponentMove){
        points += 3
    } else if (convertedMove == "A" && opponentMove == "C"){
        points += 6
    } else if (convertedMove == "B" && opponentMove == "A"){
        points += 6
    } else if (convertedMove == "C" && opponentMove == "B"){
        points += 6
    }
    return points
}

score()