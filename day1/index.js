import * as parser from '../lib/parser.js'
import * as path from "path";


const matchRightNumber = ( line ) => {
    const rightMatch = /.[0-9]+$/g
    const rightNumber = line.match(rightMatch).toString().trim()
    return  parseInt(rightNumber)
}

const matchLeftNumber = (line) => {
    const leftMatch = /^[0-9]+./g
    const leftNumber = line.match(leftMatch).toString().trim()
    return parseInt(leftNumber)
}

function day1_step1(leftList, rightList) {

    leftList = leftList.sort()
    rightList = rightList.sort()
    let res = 0;
    for(let i = 0 ; i < leftList.length; i++) {
        res += (Math.abs(leftList[i] - rightList[i]));
    }
    console.log(res)
}


// Eh oui c un peu opti, on évite le O(n^2) la
function day1_step2(leftList, rightList) {
    const occurrenceMap = new Map()
    let res = 0;
    for(let i = 0; i < rightList.length; i++) {
        if(!occurrenceMap.has(rightList[i])) {
            occurrenceMap.set(rightList[i], 1);
        } else {
            occurrenceMap.set(rightList[i], occurrenceMap.get(rightList[i]) + 1);
        }
    }
    for(const val of leftList) {
        if(occurrenceMap.has(val)) {
            res += val * occurrenceMap.get(val);
        }
    }
    console.log(res)
}
async function main() {
    const lines = await parser.readLines(path.join(parser.__dirname, '../day1/input.txt'));
    let leftList = []
    let rightList = []
    for(const line of lines) {
        leftList.push(matchLeftNumber(line))
        rightList.push(matchRightNumber(line))
    }
    day1_step1(leftList,rightList);
    day1_step2(leftList,rightList);
}


main()