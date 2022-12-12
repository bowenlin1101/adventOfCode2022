import * as fs from 'fs'

const contents = fs.readFileSync('./src/Day_7/input.txt','utf-8').split('\n')
// const contents = fs.readFileSync('./src/Day_7/test.txt','utf-8').split('\n')
var folderSizes = []

class TreeNode {
    name:string
    size:number
    descendants: any[]
    constructor(name,size) {
      this.name = name;
      this.size = size
      this.descendants = [];
    }
    push(node: any[] | TreeNode){
        this.descendants.push(node)
    }
} 

var root:TreeNode[] = [new TreeNode("/",0)];
var pwdIndices:number[] = [0]

function parseCommands(){
    var commands: string[][] = []
    var commandAndOuput = []
    for (var i = 0; i < contents.length; i++){
        if (contents[i][0] == "$" && commandAndOuput.length != 0){
            commands.push(commandAndOuput)
            commandAndOuput = []
        }
        commandAndOuput.push(contents[i])
        if (i == contents.length-1){
            commands.push(commandAndOuput)
        }
    }
    return commands
}

function mapTree(){
    const commands = parseCommands()
    for (var i = 0; i < commands.length; i++){
        if (commands[i].length == 1) {
            var directory = commands[i][0].split(' ')[2]
            if (directory == ".."){
                pwdIndices.pop()
            } else {
                var currentChildren = getCurrentNode(root[0],0).descendants
                var element = currentChildren.find(object => object.name == directory)
                if (element == undefined){
                    getCurrentNode(root[0], 0).push(new TreeNode(directory,0))
                }
                element = currentChildren.find(object => object.name == directory)
                var index = getCurrentNode(root[0],0).descendants.indexOf(element)
                pwdIndices.push(index)
            }
        } else {
            for (var j = 1; j < commands[i].length; j++){
                var type = commands[i][j].split(' ')[0]
                var name = commands[i][j].split(' ')[1]
                if (type == "dir"){
                    getCurrentNode(root[0],0).push(new TreeNode(name,0))
                } else {
                    getCurrentNode(root[0],0).push(new TreeNode(name,parseInt(type)))
                }
            }
        }
    }
    return root
}

function getCurrentNode(currentNode:TreeNode, depth:number){
    if (depth == pwdIndices.length-1){
        return currentNode
    }
    return getCurrentNode(currentNode.descendants[pwdIndices[depth+1]],depth + 1)
}

function assignFolderSizes(currentNode:TreeNode, depth:number){
    if (!root[0].descendants.some((object) => object.size == 0)){
        return currentNode
    }
    if (currentNode.descendants.some((object) => object.size == 0)){
        for (var i = 0; i < currentNode.descendants.length; i++){
            if (currentNode.descendants[i].size == 0){
                pwdIndices.push(i)
                return assignFolderSizes(currentNode.descendants[i],depth+1)
            }
        }
    } else {
        var folderSize = 0;
        for (var i = 0; i < currentNode.descendants.length; i++){
            folderSize += currentNode.descendants[i].size
        }
        currentNode.size = folderSize
        folderSizes.push(folderSize)
        pwdIndices.pop()
        return assignFolderSizes(getCurrentNode(root[0],0),0)
    }
}

function folders(){
    var total = 0
    for (var i = 0; i < root[0].descendants.length; i++){
        total += root[0].descendants[i].size
    }
    var unused = 70000000 - total;
    var required = 30000000-unused
    var potentialDirs = folderSizes.filter((size) => size > required)
    console.log(potentialDirs)
}

mapTree()
pwdIndices = [0]
assignFolderSizes(root[0],0)
folders()