import * as fs from "fs"
const contents = fs.readFileSync('./src/Day_6/input.txt','utf-8')
// const contents = fs.readFileSync('./src/Day_6/test.txt','utf-8').split('\n')[4]


function check(){
    for (var i = 0; i < contents.length; i++){
        var characters = [contents[i],contents[i+1],contents[i+2],contents[i+3]]
        if (new Set(characters).size == characters.length){
            return (i + 4)
        }
    }
}
console.log(check())