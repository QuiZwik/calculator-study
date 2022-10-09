window.onload = function () {
    document.getElementById("b0").onclick = () => onclickNumber("b0")
    document.getElementById("b1").onclick = () => onclickNumber("b1")
    document.getElementById("b2").onclick = () => onclickNumber("b2")
    document.getElementById("b3").onclick = () => onclickNumber("b3")
    document.getElementById("b4").onclick = () => onclickNumber("b4")
    document.getElementById("b5").onclick = () => onclickNumber("b5")
    document.getElementById("b6").onclick = () => onclickNumber("b6")
    document.getElementById("b7").onclick = () => onclickNumber("b7")
    document.getElementById("b8").onclick = () => onclickNumber("b8")
    document.getElementById("b9").onclick = () => onclickNumber("b9")
    document.getElementById("bpo").onclick = () => onclickAble("bpo")
    document.getElementById("beq").onclick = () => onclickAble("beq")
    document.getElementById("bdi").onclick = () => onclickAble("bdi")
    document.getElementById("bmu").onclick = () => onclickAble("bmu")
    document.getElementById("bback").onclick = () => onclickAble("bback")
    document.getElementById("bclear").onclick = () => onclickAble("bclear")
    document.getElementById("bplus").onclick = () => onclickAble("bplus")
    document.getElementById("bsub").onclick = () => onclickAble("bsub")

    showResult()
}

let numberButtonMap = {
    "b0": 0,
    "b1": 1,
    "b2": 2,
    "b3": 3,
    "b4": 4,
    "b5": 5,
    "b6": 6,
    "b7": 7,
    "b8": 8,
    "b9": 9,
}

let ableButtonMap = {
    "bplus": (n0, n1) => n0 + n1,
    "bsub": (n0, n1) => n0 - n1,
    "bmu": (n0, n1) => n0 * n1,
    "bdi": (n0, n1) => n0 / n1,
}

let ableButtonStrMap = {
    "bplus": "+",
    "bsub": "-",
    "bmu": "×",
    "bdi": "÷",
}

let pointFlag = false // 小数点flag
let pointBit = 0  // 记录小数位
let result = 0 // id="output2"的div
let number0 = undefined // id="output1"的div 第一位数
let number1 = undefined // id="output1"的div 第二位数
let able = undefined // 记录按了哪个运算符的buttonId 加减乘除

function showResult() {
    if (result !== undefined) {
        document.getElementById("output2").innerText = result
    }

    let str = ""
    selectState(
        () => {
            str = `${number0}${ableButtonStrMap[able]}${number1}=`
        },
        () => {
            str = `${number0}${ableButtonStrMap[able]}`
        }
    )

    document.getElementById("output1").innerText = str
}

function onclickNumber(buttonId) {
    if (result === undefined) result = 0
    if (pointFlag) {
        result += numberButtonMap[buttonId] * 0.1 ** ++pointBit
    } else {
        result *= 10
        result += numberButtonMap[buttonId]
    }
    showResult()
}

function onclickAble(buttonId) {
    if (buttonId === "bback") {
        if (pointFlag) {
            result -= result % 0.1 ** --pointBit
            if (pointBit === 0) {
                pointFlag = false
            }
        } else {
            result -= result % 10
            result /= 10
        }
    } else if (buttonId === "bclear") {
        result = 0
        number0 = undefined
        number1 = undefined
        able = undefined
        pointFlag = false
        pointBit = 0
    } else if (buttonId === "bplus" || buttonId === "bsub" || buttonId === "bmu" || buttonId === "bdi") {
        operation(buttonId)
    } else if (buttonId === "beq") {
        eq()
    } else if (buttonId === "bpo") {
        pointFlag = true
    }
    showResult()
}

/**
 * 按下运算符的方法（加减乘除）
 */
function operation(buttonId) {
    selectState(
        () => {
            number0 = result
            number1 = undefined
        },
        () => {
            // nothing to do
        },
        () => {
            number0 = result
        }
    )
    able = buttonId
    result = undefined
}

/**
 * 按下=的方法
 */
function eq() {
    if (able) {
        selectState(
            () => {
                number0 = result
                result = ableButtonMap[able](number0, number1)
            },
            () => {
                number1 = result ? result : number0
                result = ableButtonMap[able](number0, number1)
            },
            () => {
                // nothing to do
            }
        )
    }
}

/**
 * 根据显示状态选择执行
 *
 * @param fun0 number0、number1都有的时候
 * @param fun1 number1 空的时候
 * @param fun2 number0、number1都空的时候
 */
function selectState(fun0, fun1, fun2) {
    if (number0 !== undefined && number1 !== undefined) {
        fun0()
    } else if (number0 !== undefined) {
        fun1()
    } else {
        fun2()
    }
}
