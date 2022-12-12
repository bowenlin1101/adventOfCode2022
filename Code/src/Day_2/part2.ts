import * as fs from 'fs'

type move = "A" | "B" | "C" | null;
type LoseDrawWin = "X" | "Y" | "Z" | null;

// const contents = fs.readFileSync("./src/Day_2/input.txt",'utf-8').split("\n")
const contents = fs.readFileSync("./src/Day_2/test.txt",'utf-8').split("\n") as [string,string]

function score(){
    var totalPoints = 0;
    for (var i = 0; i < contents.length; i++){
        var tuple = contents[i].split(" ") as [move,LoseDrawWin]
        totalPoints += points(tuple[0],tuple[1])
    }
    console.log(totalPoints)
}

function points(opponentMove:move, LoseDrawWin:LoseDrawWin){
    var points = 0;
    switch (LoseDrawWin){
        case "X":
            break
        case "Y":
            points += 3
            break
        case "Z":
            points +=6
            break
    }
    points += signPoints(whatToPlay(opponentMove,LoseDrawWin))
    return(points)
}

function whatToPlay(opponentMove:move, outcome:LoseDrawWin){
    var signs = ["A","B","C"]
    if (outcome == "X"){
        return(signs[(signs.indexOf(opponentMove)-1+3)%3] as move)
    } else if (outcome == "Y") {
        return opponentMove
    } else {
        return (signs[(signs.indexOf(opponentMove)+1)%3] as move)
    }

}

function signPoints(ourMove:move){
    switch (ourMove) {
        case "A":
            return 1
        case "B":
            return 2
        case "C":
            return 3
    }
}

score()