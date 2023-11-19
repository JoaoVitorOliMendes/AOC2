tableCmd = document.getElementById('tableCmd');
cmdForm = document.getElementById('cmdForm');
txtCommands = document.getElementById('commands');
txtIndex = document.getElementById('index');
txtConsole = document.getElementById('console');
btnExecute = document.getElementById('btnExecute');
btnSubmit = document.getElementById('btnSubmit');

registerBank = [document.getElementById('reg0'), document.getElementById('reg1'), document.getElementById('reg2'), document.getElementById('reg3'), document.getElementById('reg4'), document.getElementById('reg5')]

function deleteClick(e) {
    parentChild = e.target.parentNode.parentNode.children
    parentChild[1].children[0].value = ''
}

function executeCommand(command) {
    console.log(command);
    if (command == '' || command.match(/[^01]+/)) {
        window.alert('Por favor digite apenas comandos em binario')
        return null
    }
    opcode1 = [...command.substr(0,4)].map(val => val==1)
    if (opcode1[0] && opcode1[1] && opcode1[2] && opcode1[3]) {
        opcode2 = [...command.substr(4,4)].map(val => val==1)
        if (opcode2[0] && opcode2[1] && opcode2[2]) {
            opcode3 = [...command.substr(7,5)].map(val => val==1)
            if (opcode3[0] && opcode3[1] && opcode3[2] && opcode3[3] && opcode3[4]) {
                
            } else {
                console.log('1 endereços');
                params = getVals(command, 1)
    
                if (!opcode3[0] && !opcode3[1] && !opcode3[2] && !opcode3[3] && !opcode3[4]) {
                    console.log('jmp');
                    jmp(params[0])
                }
            }
        } else {
            console.log('2 endereços');
            params = getVals(command, 2)

            if (!opcode2[0] && !opcode2[1] && !opcode2[2] && !opcode2[3]) {
                console.log('mov');
                mov(params[0], params[1])
            }

        }
    } else {
        console.log('3 endereços');
        params = getVals(command, 3)

        if (!opcode1[0] && !opcode1[1] && !opcode1[2] && !opcode1[3]) {
            console.log('add');
            add(params.splice(0,2), params[params.length-1])
        } else if (!opcode1[0] && !opcode1[1] && !opcode1[2] && opcode1[3]) {
            console.log('sub');
            sub(params.splice(0,2), params[params.length-1])
        } else if (!opcode1[0] && !opcode1[1] && opcode1[2] && !opcode1[3]) {
            console.log('mlt');
            mlt(params.splice(0,2), params[params.length-1])
        } else if (!opcode1[0] && !opcode1[1] && opcode1[2] && opcode1[3]) {
            console.log('div');
            div(params.splice(0,2), params[params.length-1])
        } else if (!opcode1[0] && opcode1[1] && !opcode1[2] && !opcode1[3]) {
            console.log('slt');
            slt(params.splice(0,2), params[params.length-1])
        }else if (!opcode1[0] && opcode1[1] && !opcode1[2] && opcode1[3]) {
            console.log('sgt');
            sgt(params.splice(0,2), params[params.length-1])
        }else if (!opcode1[0] && opcode1[1] && opcode1[2] && !opcode1[3]) {
            console.log('bne');
            console.log(params);
            bne(params.splice(0,2), params[params.length-1])
        }
    }
    consoleAppend('')
    return 1
}

function ula(a, b, code) {
    switch (code) {
        case 1:
            return a + b;
            break;
        case 2:
            return a - b;
            break;
        case 3:
            return a * b;
            break;
        case 4:
            return a / b;
            break;
        case 5:
            return a < b;
            break;
        case 6:
            return a > b;
            break;
        case 7:
            return a != b;
            break;
        default:
            break;
    }
}

function getVals(command, addressQty) {
    registers = []
    for (let i=0;i<addressQty;i++) {
        isReg = command.substr(-4*(i+1),1) == true
        bits = command.substr(-4*(i+1),4).substring(1)
        console.log(registerBank.length-1, i)
        if (isReg) {
            registers.unshift(registerBank[parseInt(bits, 2)])
        } else {
            mov(parseInt(bits, 2), registerBank[registerBank.length - 1 - i])
            registers.unshift(registerBank[registerBank.length - 1 - i])
        }
    }
    return registers
}

function getValValue(val) {
    if (val.tagName) {
        return parseInt(val.value)
    } else {
        return parseInt(val)
    }
}

//1111 1110 0000 XXXX
function jmp(val) {
    console.log(getValValue(val));
    txtIndex.value=getValValue(val) - 1
    txtIndex.dispatchEvent(new Event('input'))
    // btnExecute.dispatchEvent(new Event('click'))
    consoleAppend("jmp " + val.id)
}

//1111 0000 XXXX XXXX
function mov(val, destiny) {
    console.log(val, destiny);
    valValue = getValValue(val)
    destiny.value = valValue
    consoleAppend("mov " + destiny.id + " " + valValue)
}

//0000 XXXX XXXX XXXX
function add(vals, destiny) {
    destiny.value = ula(getValValue(vals[0]), getValValue(vals[1]), 1)
    consoleAppend("add " + vals[0].id + " " + vals[1].id + " " + destiny.id)
}
//0001 XXXX XXXX XXXX
function sub(vals, destiny) {
    destiny.value = ula(getValValue(vals[0]), getValValue(vals[1]), 2)
    consoleAppend("sub " + vals[0].id + " " + vals[1].id + " " + destiny.id)
}
//0010 XXXX XXXX XXXX
function mlt(vals, destiny) {
    destiny.value = ula(getValValue(vals[0]), getValValue(vals[1]), 3)
    consoleAppend("mlt " + vals[0].id + " " + vals[1].id + " " + destiny.id)
}
//0011 XXXX XXXX XXXX
function div(vals, destiny) {
    destiny.value = ula(getValValue(vals[0]), getValValue(vals[1]), 4)
    consoleAppend("div " + vals[0].id + " " + vals[1].id + " " + destiny.id)
}
//0100 XXXX XXXX XXXX
function slt(vals, destiny) {
    destiny.value = ula(getValValue(vals[0]), getValValue(vals[1]), 5) ? 1 : 0
    consoleAppend("slt " + vals[0].id + " " + vals[1].id + " " + destiny.id)
}
//0101 XXXX XXXX XXXX
function sgt(vals, destiny) {
    destiny.value = ula(getValValue(vals[0]), getValValue(vals[1]), 6) ? 1 : 0
    consoleAppend("sgt " + vals[0].id + " " + vals[1].id + " " + destiny.id)
}
//0110 XXXX XXXX XXXX
function bne(vals, destiny) {
    if (ula(getValValue(vals[0]), getValValue(vals[1]), 7)) {
        jmp(destiny)
    }
    consoleAppend("bne " + vals[0].id + " " + vals[1].id + " " + destiny.id)
}

function consoleAppend(message) {
    txtConsole.value += message + '\n'
}

cmdForm.addEventListener('submit', (e) => {
    cmdArray = document.getElementsByName('cmd')
    for (let i=0;i<cmdArray.length;i++) {
        const key = cmdArray.item(i)
        if (key.value == '') {
            key.value = txtCommands.value
            break;
        }
    }
    e.preventDefault();
});

btnExecute.addEventListener('click', () => {
    cmdArray = document.getElementsByName('cmd')
    index = txtIndex.value
    if (executeCommand(cmdArray.item(index).value) != null) {
        index = txtIndex.value
        txtIndex.value = parseInt(index) + 1
        txtIndex.dispatchEvent(new Event('input'))
    }
})

txtIndex.addEventListener('input', () => {
    cmdArray = document.getElementsByName('cmd')
    if (cmdArray?.[txtIndex.value] != null){
        for (let i=0;i<cmdArray.length;i++) {
            const key = cmdArray.item(i)
            if (i == txtIndex.value) {
                key.classList = "form-control bg-success"
            } else {
                key.classList = "form-control"
            }
        }
    } else {
        txtIndex.value=0
    }
})


for (let i=0;i<32;i++) {
    tableCmd.insertAdjacentHTML('beforebegin',`
        <tr>
            <th class="col-1" scope="row">${i}</th>
            <td class="col-10" name="input"><input type="text" name="cmd" class="form-control" disabled></td>
            <td class="col-1"><button type="button" onClick="deleteClick(event)" class="btn btn-danger">Delete</button></td>
        </tr>
    `)
}

txtConsole.value=""
txtIndex.value=0
txtIndex.dispatchEvent(new Event('input'))

for (i of registerBank) {
    i.value='∅'
}

startCmds = [
    "1111000000001000",
    "0000000110001000",
    "0100010110001001",
    "0110000010010101",
    "1111111000000001",
    "1111000001111011"
]

for (let i = 0; i < startCmds.length; i++) {
    cmdArray = document.getElementsByName('cmd')
    cmdArray[i].value = startCmds[i]
}
/*
SIMPLE FOR
1111000000001000
0000000110001000
0100010110001001
0110000010010101
1111111000000001
1111000001111011
*/