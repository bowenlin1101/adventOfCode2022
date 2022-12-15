import * as fs from 'fs'

const contents = fs.readFileSync('./src/Day_13/input.txt','utf-8').split('\n')
// const contents = fs.readFileSync('./src/Day_13/test.txt','utf-8').split('\n')
var pairs = [];
var total = 0;
function processPairs(){
    var pair = []
    for (var i = 0; i < contents.length; i++){
        if (contents[i] != ''){
            pair.push(JSON.parse(contents[i]))
        } else {
            pairs.push(pair)
            pair = []
        }
    }
}
processPairs()

function compare(left: any[] | number, right: any[] | number){
    if (typeof(left) == 'object' && typeof(right) == 'object'){
        var fewestNumbers = left.length < right.length ? left : right
        var results = []
        for (var i = 0; i < fewestNumbers.length; i++){
            results.push(compare(left[i],right[i]))
        }
        var nonUndefinedResults = results.filter((value) => value != undefined)
        if (nonUndefinedResults.length > 0){
            return nonUndefinedResults[0]
        } else {
            if (left.length < right.length){
                return true
            } else if (left.length > right.length) {
                return false
            } else {
                return
            }
        }
    }
    if (typeof(left) == 'object' && typeof(right) == 'number'){
        if (left[0] == undefined){
            return true
        } else {
            return compare(left,[right])
        }
    }
    if (typeof(left) == 'number' && typeof(right) == 'object'){
        if (right[0] == undefined){
            return false
        } else {
            return compare([left],right)
        }
    }
    if (typeof(left) == 'number' && typeof(right) == 'number'){
        if (left > right){
            return false
        } else if (right > left){
            return true
        } else {
            return
        }
    }
}

function main(){
    for (var i = 0; i < pairs.length; i++){
        var inOrder = compare(pairs[i][0],pairs[i][1])
        if (inOrder){
            total += i + 1
        }
        console.log(inOrder)
    }

}
main()
console.log(total)