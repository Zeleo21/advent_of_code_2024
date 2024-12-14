import * as parser from '../lib/parser.js'
import * as path from "path";


const checkIfIncreasing = (val1, val2) => {
    return val2 - val1 > 0;
}

const checkValidityConstraints = (isIncreasing, val1, val2) => {
    return !(Math.abs(val2 - val1) < 1 || Math.abs(val2 - val1) > 3
    || (isIncreasing && val2 <= val1)
    || (!isIncreasing && val1 <= val2))
}
const isValidReport = (report, isStep1) => {
    const isIncreasing = checkIfIncreasing(report[0], report[1]);
    let day2MoreLife = true;
    for(let i = 0 ; i < report.length - 1; i++) {
        if(!checkValidityConstraints(isIncreasing,report[i], report[i+1])) {
           if(isStep1) return false;
           else if(day2MoreLife) {
               day2MoreLife = false;
           } else {
               return false
           }
        }
    }
    return true;
}

const getMatchedNumbersForReport = (line) => {
    const reportArray = []
    const re = /.?[0-9]+.?/g
    const matches = line.match(re);
    for(const match of matches){
        reportArray.push(parseInt(match))
    }
    return reportArray
}

const validateReport = (line, isStep1) => {
    const reportArray = getMatchedNumbersForReport(line)
    return isValidReport(reportArray, isStep1)
}

function day2_step1(lines) {
    let validReport = 0;
    for(const line of lines) {
        validReport += validateReport(line, true);
    }
    console.log("valid report for day2_step_1 : " + validReport)
}


function day2_step2(lines) {
    let validReport = 0;
    for(const line of lines) {
        validReport += validateReport(line,false)
    }
    console.log("valid report for day2_step_2 : " + validReport)
}
async function main() {
    const lines = await parser.readLines(path.join(parser.__dirname, '../day2/input.txt'));
    day2_step1(lines);
    day2_step2(lines);
}


main()