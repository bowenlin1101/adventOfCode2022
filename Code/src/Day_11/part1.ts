import * as fs from 'fs'

const contents = fs.readFileSync('./src/Day_11/input.txt','utf-8').split('\n')
// const contents = fs.readFileSync('./src/Day_11/test.txt','utf-8').split('\n')
type Monkey = {startingItems: number[], operation: string, divisibleBy: number, monkeytrue:number, monkeyfalse:number,inspections:number}
const Monkeys:Monkey[] = []

function Instructions(){
    var monkeyNumber = -1;
    for (var i = 0; i < contents.length; i++){
        if (contents[i].includes("Monkey")){
            monkeyNumber += 1
            Monkeys.push({startingItems:[],operation:'',divisibleBy:-1,monkeytrue:-1,monkeyfalse:-1,inspections:0})
        } else {
            if (contents[i].includes("Starting items:")){
                var items = contents[i].split(':')[1].split(', ')
                for (var j = 0; j < items.length; j++){
                    var itemNumber = parseInt(items[j].replace(/ /g,""))
                    Monkeys[monkeyNumber].startingItems.push(itemNumber)
                }
            } else if (contents[i].includes('Operation:')){
                var operation = contents[i].split('=')[1]
                Monkeys[monkeyNumber].operation = operation;
            } else if (contents[i].includes('Test:')){
                var divisibleNumber = parseInt(contents[i].split('by')[1].replace(/ /g,''))
                var monkey1 = parseInt(contents[i+1].split('monkey')[1].replace(/ /g,''))
                var monkey2 = parseInt(contents[i+2].split('monkey')[1].replace(/ /g,''))
                Monkeys[monkeyNumber].divisibleBy = divisibleNumber;
                Monkeys[monkeyNumber].monkeytrue = monkey1;
                Monkeys[monkeyNumber].monkeyfalse = monkey2;
            }
        }
    }
}

function Rounds(){
    for (var i = 0; i < Monkeys.length; i++){
        for (var j = 0; j < Monkeys[i].startingItems.length; j++){
            Monkeys[i].inspections += 1
            var parts = Monkeys[i].operation.split(' ')
            parts.splice(0,1)
            var total = 0
            for (var k = 0; k < parts.length; k++){
                var part = (parts[k].replace(/ /g,''))
                var previousPart = parts[k-1] ? parts[k-1].replace(/ /g,'') : null
                if (part != '+'&& part != '-' && part != '*' && part != '/'){
                    if (previousPart == '-'){
                        if (part == 'old'){
                            total -= Monkeys[i].startingItems[j]
                        } else {
                            total -= parseInt(part)
                        }
                    } else if (previousPart == '*'){
                        if (part == 'old'){
                            total *= Monkeys[i].startingItems[j]
                        } else {
                            total *= parseInt(part)
                        }
                    } else if (previousPart == '/'){
                        if (part == 'old'){
                            total /= Monkeys[i].startingItems[j]
                        } else {
                            total /= parseInt(part)
                        }
                    } else {
                        if (part == 'old'){
                            total += Monkeys[i].startingItems[j]
                        } else {
                            total += parseInt(part)
                        }
                    }
                }
            }
            var newWorryLevel = Math.floor(total / 3)
            if (newWorryLevel % Monkeys[i].divisibleBy == 0){
                Monkeys[Monkeys[i].monkeytrue].startingItems.push(newWorryLevel)
            } else {
                Monkeys[Monkeys[i].monkeyfalse].startingItems.push(newWorryLevel)
            }

        }
        Monkeys[i].startingItems = []
    }
}

Instructions()
// console.log(Monkeys)

for (var i = 0; i < 20; i++){
    Rounds()
}

console.log(Monkeys)