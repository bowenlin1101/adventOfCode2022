import * as fs from 'fs'
import { totalmem } from 'os';

// const contents = fs.readFileSync('./src/Day_8/test.txt','utf-8').split('\n')
const contents = fs.readFileSync('./src/Day_8/input.txt','utf-8').split('\n')

type directions = {up: number[], down: number[],left: number[],right: number[]}


function countTrees(){
    var total = 0;
    for (var i = 0; i < contents.length; i++){
        for (var j = 0; j < contents[i].length; j++){
            var tree = parseInt(contents[i][j]);
            // console.log(tree)
            var directionalTrees: directions = {up:[],down:[],left:[],right:[]}
            //right
            for (var k = j+1; k < contents[j].length; k++){
                var blockingtree = parseInt(contents[i][k])
                directionalTrees.right.push(blockingtree)
            }
            //left
            for (var k = j-1; k >=0; k--){
                var blockingtree = parseInt(contents[i][k])
                directionalTrees.left.push(blockingtree)
            }
            //up
            for (var k = i-1; k>=0; k--){
                var blockingtree = parseInt(contents[k][j])
                directionalTrees.up.push(blockingtree)
            }
            //down
            for (var k = i+1; k < contents.length; k++){
                var blockingtree = parseInt(contents[k][j])
                directionalTrees.down.push(blockingtree)
            }
     
            if (!(directionalTrees.up.filter((number) => number >= tree).length > 0) || !(directionalTrees.down.filter((number) => number >= tree).length > 0) || !(directionalTrees.left.filter((number) => number >= tree).length > 0) || !(directionalTrees.right.filter((number) => number >= tree).length > 0)){
                total++
            }
        }
    }
    return total
}
console.log(countTrees())