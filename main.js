tableCmd = document.getElementById('tableCmd')
cmdForm = document.getElementById('cmdForm');
txtCommands = document.getElementById('commands');
btnExecute = document.getElementById('btnExecute');

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
    opcode1 = [...command.substr(0,4)].map(val => true ? val==1 : false)
    if (opcode1[0] && opcode1[1] && opcode1[2] && opcode1[3]) {
        opcode2 = [...command.substr(4,4)].map(val => true ? val==1 : false)
        if (opcode2[0] && opcode2[1] && opcode2[2] ) {
            opcode3 = [...command.substr(7,5)].map(val => true ? val==1 : false)
            if (opcode3[0] && opcode3[1] && opcode3[2] && opcode3[3] && opcode3[4]) {
                console.log('0 endereços');
            } else {
                console.log('1 endereços');
            }
        } else {
            console.log('2 endereços');
        }
    } else {
        console.log('3 endereços');
    }
    return 1
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
        console.log(index);1
        index++
    }
})