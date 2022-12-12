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

function mapValues(depth:number){
    var AHasValue = map.findIndex((object) => object.elevation == "a" && object.value != undefined) != -1
    if ( AHasValue){
        return depth
    }

    var pointsAtDepth = []
    for (var i = 0; i < map.length; i++){
        if (map[i].value == depth){
            pointsAtDepth.push(map[i])
        }
    }

    for (var i = 0; i < pointsAtDepth.length; i++){
        var pointAbove = map.findIndex((object) => object.row == pointsAtDepth[i].row - 1 && object.col == pointsAtDepth[i].col) != -1? map[map.findIndex((object) => object.row == pointsAtDepth[i].row - 1 && object.col == pointsAtDepth[i].col)] : undefined
        var pointBelow = map.findIndex((object) => object.row == pointsAtDepth[i].row + 1 && object.col == pointsAtDepth[i].col) != -1? map[map.findIndex((object) => object.row == pointsAtDepth[i].row + 1 && object.col == pointsAtDepth[i].col)] : undefined
        var pointLeft = map.findIndex((object) => object.row == pointsAtDepth[i].row && object.col == pointsAtDepth[i].col - 1) != -1? map[map.findIndex((object) => object.row == pointsAtDepth[i].row && object.col == pointsAtDepth[i].col - 1)] : undefined
        var pointRight = map.findIndex((object) => object.row == pointsAtDepth[i].row && object.col == pointsAtDepth[i].col + 1) != -1? map[map.findIndex((object) => object.row == pointsAtDepth[i].row && object.col == pointsAtDepth[i].col + 1)] : undefined
        var pointsAround = [pointAbove,pointBelow,pointLeft,pointRight]
        for (var j = 0; j < pointsAround.length; j++){
            var pointAround = pointsAround[j]
            if (pointAround){
                var pointDepthElevationIndex = elevationMap.indexOf(pointsAtDepth[i].elevation)
                var pointAroundElevationIndex = elevationMap.indexOf(pointAround.elevation)
                if (pointAround.value == undefined && (pointDepthElevationIndex - pointAroundElevationIndex == 1|| pointDepthElevationIndex == pointAroundElevationIndex || pointDepthElevationIndex < pointAroundElevationIndex)){
                    pointAround.value = depth + 1
                }
            }
        }
    }
    return mapValues(depth+1)
}

var endpoint = map[map.findIndex((object) => object.elevation == "E")]
endpoint.value = 0;
console.log(mapValues(0))