let theTotalBill = prompt ('Your Total Bill? ')

let amountOfPersons = prompt ('How many people to split the bill? ')

let percentage = prompt ('What percentage tipt would you like to give? ')

let  billByPerson = theTotalBill / amountOfPersons

let outputPercentage = percentage / 100

let outputTip = outputPercentage * billByPerson

let totalTip = outputTip + billByPerson

document.getElementById("bill").innerHTML = `PHP ${theTotalBill}`

document.getElementById("split").innerHTML = `${amountOfPersons} Persons`

document.getElementById("tip").innerHTML = `${percentage} %`

let roundOff = Math.round(totalTip)

let totalAnswer = Math.round(roundOff)

// // .toFixed(2)

document.getElementById("totalBill").innerHTML = `PHP ${totalAnswer} bill for each`