import * as fs from 'fs'
import { totalmem } from 'os';

// const contents = fs.readFileSync('./src/Day_8/test.txt','utf-8').split('\n')
const contents = fs.readFileSync('./src/Day_8/input.txt','utf-8').split('\n')

type directions = {up: number[], down: number[],left: number[],right: number[]}

var totalTreeScores = []

function getTreeScore(trees: number[], tree:number){
    console.log(trees)
    var score = 0;
    if (trees.length == 0){
        return 0
    }
    for (var i = 0; i < trees.length; i++){
        if (tree > trees[i]){
            score++
        } else {
            score++
            break
        }
    }
    console.log(score)
    return score
}

function countTrees(){
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
            var topScore:number = getTreeScore(directionalTrees.up,tree)
            var bottomScore:number = getTreeScore(directionalTrees.down,tree)
            var leftScore:number = getTreeScore(directionalTrees.left,tree)
            var rightScore:number = getTreeScore(directionalTrees.right,tree)
            var finalScore:number = topScore*bottomScore*leftScore*rightScore
            totalTreeScores.push(finalScore)
        }
    }
    console.log(totalTreeScores)
    var bestTreeScore = totalTreeScores.reduce((bestTree,tree) => (tree > bestTree) ? tree : bestTree, 0)
    return bestTreeScore
}
console.log(countTrees())