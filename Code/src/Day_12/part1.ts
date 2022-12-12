import * as fs from 'fs'

const contents = fs.readFileSync('./src/Day_12/input.txt','utf-8').split('\n')
// const contents = fs.readFileSync('./src/Day_12/test.txt','utf-8').split('\n')

const elevationMap = Array.from('SabcdefghijklmnopqrstuvwxyzE')
type point = {row:number, col: number, elevation: string, value: null| number | undefined}
var map:point[] = []

function createMap(){
    for (var i = 0; i < contents.length; i++){
        for (var j = 0; j < contents[i].length; j++){
            map.push({row:i,col:j,elevation:contents[i][j],value:undefined})
        }
    }
}
createMap()
console.log(map)
map[map.findIndex((object) => object.elevation == "E")].value = 0;
function mapValues(depth:number){
    var points = []
    for (var i = 0; i < map.length; i++){
        if (map[i].value == depth){
            points.push(map[i])
        }
    }
    if (map.findIndex((object) => object.elevation == "S" && object.value != undefined) != -1){
        return depth
    }
    for (var i = 0; i < points.length; i++){
        var up = map.findIndex((object) => object.row == points[i].row - 1 && object.col == points[i].col) != -1? map[map.findIndex((object) => object.row == points[i].row - 1 && object.col == points[i].col)] : undefined
        var down = map.findIndex((object) => object.row == points[i].row + 1 && object.col == points[i].col) != -1? map[map.findIndex((object) => object.row == points[i].row + 1 && object.col == points[i].col)] : undefined
        var left = map.findIndex((object) => object.row == points[i].row && object.col == points[i].col - 1) != -1? map[map.findIndex((object) => object.row == points[i].row && object.col == points[i].col - 1)] : undefined
        var right = map.findIndex((object) => object.row == points[i].row && object.col == points[i].col + 1) != -1? map[map.findIndex((object) => object.row == points[i].row && object.col == points[i].col + 1)] : undefined
        var directions = [up,down,left,right]
        for (var j = 0; j < directions.length; j++){
            if (directions[j]){
                if (directions[j].value == undefined && (elevationMap.indexOf(points[i].elevation) - elevationMap.indexOf(directions[j].elevation) == 1||elevationMap.indexOf(points[i].elevation) == elevationMap.indexOf(directions[j].elevation) || elevationMap.indexOf(points[i].elevation) < elevationMap.indexOf(directions[j].elevation))){
                    directions[j].value = depth+1
                }
            }
        }
    }
    return mapValues(depth+1)
}

console.log(mapValues(0))