import * as fs from "fs"
const contents = fs.readFileSync('./src/Day_6/input.txt','utf-8')
// const contents = fs.readFileSync('./src/Day_6/test.txt','utf-8').split('\n')[3]


function check(){
    for (var i = 0; i < contents.length; i++){
        var characters = [contents[i],contents[i+1],contents[i+2],contents[i+3],contents[i+4],contents[i+5],contents[i+6],contents[i+7],contents[i+8],contents[i+9],contents[i+10],contents[i+11],contents[i+12],contents[i+13]]
        if (new Set(characters).size == characters.length){
            return (i + 14)
        }
    }
}
console.log(check())