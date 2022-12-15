import * as fs from 'fs'

const contents = fs.readFileSync('./src/Day_13/input.txt','utf-8').split('\n')
// const contents = fs.readFileSync('./src/Day_13/test.txt','utf-8').split('\n')
var packets = [];
var sortedGroup = [];
function processPairs(){
    for (var i = 0; i < contents.length; i++){
        if (contents[i] != ''){
            packets.push(JSON.parse(contents[i]))
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
    var firstPacket = packets.pop()
    sortedGroup.push(firstPacket)
    // console.log(packets)
    for (var i = 0; i < packets.length; i++){
        // console.log(packets[i])
        for (var j = 0; j < sortedGroup.length; j++){
            // console.log(sortedGroup)
            if (!compare(sortedGroup[j],packets[i])){
                sortedGroup.splice(j, 0, packets[i])
                break
            } else if (j == sortedGroup.length-1){
                sortedGroup.push(packets[i])
            }
        }
    }
    var index1 = 0;
    var index2 = 0;
    for (var i = 0; i < sortedGroup.length; i++){
        // console.log(JSON.stringify(sortedGroup[i]) == '[[2]]')
        if (JSON.stringify(sortedGroup[i]) == '[[2]]'){
            index1 = i+1
            console.log(index1)
        } else if (JSON.stringify(sortedGroup[i]) == '[[6]]'){
            index2 = i+1
            console.log(index2)
        }
    }
    return index1*index2
}
console.log(main())
