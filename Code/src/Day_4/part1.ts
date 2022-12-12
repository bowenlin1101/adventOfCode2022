import * as fs from 'fs'

// var contents = fs.readFileSync('./src/Day_4/test.txt','utf-8').split("\n")
var contents = fs.readFileSync('./src/Day_4/input.txt','utf-8').split("\n")

function calculatePairs(){
    var total = 0
    var splitContents = contents.map((value) => [[parseInt(value.split(",")[0].split('-')[0]),parseInt(value.split(",")[0].split('-')[1])],[parseInt(value.split(",")[1].split('-')[0]),parseInt(value.split(",")[1].split('-')[1])]])
    for (var i = 0; i < splitContents.length; i++){
        console.log(splitContents[i][0])
        if ((splitContents[i][0][0] <= splitContents[i][1][0] && splitContents[i][0][1] >= splitContents[i][1][1])){
            total++
        } else if (splitContents[i][0][0] >= splitContents[i][1][0] && splitContents[i][0][1] <= splitContents[i][1][1]){
            total++
        }
    }
    console.log(total)
}

calculatePairs()