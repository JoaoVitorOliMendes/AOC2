tableCmd = document.getElementById('tableCmd')
cmdForm = document.getElementById('cmdForm');
txtCommands = document.getElementById('commands');
btnExecute = document.getElementById('btnExecute');

registerBank = [document.getElementById('reg0'), document.getElementById('reg1'), document.getElementById('reg2'), document.getElementById('reg3')]

index = 0

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
        if (opcode2[0] && opcode2[1] && opcode2[2] ) {
            opcode3 = [...command.substr(7,5)].map(val => val==1)
            if (opcode3[0] && opcode3[1] && opcode3[2] && opcode3[3] && opcode3[4]) {
                console.log('0 endereços');
                console.log(getVals(command, 0));
            } else {
                console.log('1 endereços');
                console.log(getVals(command, 1));
            }
        } else {
            console.log('2 endereços');
            console.log(getVals(command, 2));
        }
    } else {
        console.log('3 endereços');
        console.log(getVals(command, 3));
        add(getVals(command, 3))
    }
    return 1
}

function getVals(command, addressQty) {
    registers = []
    for (let i=0;i<addressQty;i++) {
        isReg = command.substr(-4*(i+1),1) == true
        bits = command.substr(-4*(i+1),4).substring(1)
        console.log(bits);
        if (isReg) {
            registers.unshift(registerBank[parseInt(bits, 2)])
        }else {
            registers.unshift(parseInt(bits, 2))
        }
    }
    return registers
}

function add(params) {
    if (params[params.length-1]?.tagName != null) {
        sum = 0
        for (let i=0;i<2; i++) {121
            sum += parseInt(params[i].tagName ? params[i].value : params[i])
        }
        params[params.length-1].value = sum
    }
}

for (let i=0;i<32;i++) {
    tableCmd.insertAdjacentHTML('beforebegin',`
        <tr>
            <th class="col-1" scope="row">${i}</th>
            <td class="col-10" name="input"><input type="text" name="cmd" class="form-control" disabled></td>
            <td class="col-1"><button type="button" onClick="deleteClick(event)" class="btn btn-danger">Delete</button></td>
        </tr>
    `)
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
    if (executeCommand(cmdArray.item(index).value) != null) {
        console.log(index);
        index++
    }
})