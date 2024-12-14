import * as parser from '../lib/parser.js'
import * as path from "path";


function calculateMult(str1, str2) {
    return parseInt(str1) * parseInt(str2)
}

function parseMult(str) {
    const re = /[0-9]+/g
    const numbers = str.match(re);
    let res = 0;
    for(let i = 0; i < numbers.length - 1; i+=2) {
        res += calculateMult(numbers[i], numbers[i+1]);
    }
    return res;
}
function process_line(line)  {
    const re = /mul\([0-9]+,[0-9]+\)/g;
    return line.match(re);
}

function process_line_step_2(line) {
    const re = /mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\)/g;
    return line.match(re);
}
function day3_step1(lines) {
    let res = 0;
    let validMults = [];
    for(const line of lines) {
        validMults = process_line(line)
        for(const val of validMults) {
            res += parseMult(val)
        }
    }
    console.log(res);
}

function checkingDoOrDont(str) {
    return str === "do()" || str === "don't()"
}

function switchState(isEnabled, str) {
    if(isEnabled && str === "don't()") {
        return false
    } else if(!isEnabled && str === "do()") {
        return true
    }
    return isEnabled
}

function day3_step2(lines) {
    let res = 0
    let validMults = []
    let isEnabled = true;
    for(const line of lines) {
        validMults = process_line_step_2(line)
        for(const val of validMults) {
            if(checkingDoOrDont(val)) {
                isEnabled = switchState(isEnabled,val)
            } else if(isEnabled) {
                res += parseMult(val)
            }
        }
    }
    console.log(res)
}
async function main() {
    const lines = await parser.readLines(path.join(parser.__dirname, '../day3/input.txt'));
    day3_step1(lines);
    day3_step2(lines);
}


main()