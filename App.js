const abi =[
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "itemId",
				"type": "uint256"
			}
		],
		"name": "bid",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "tokenCounts",
		"outputs": [
			{
				"name": "",
				"type": "uint256[3]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner2",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "potential_winners",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner1",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "revealWinners",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "amIWinner",
		"outputs": [
			{
				"name": "",
				"type": "uint256[3]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "finished",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "items",
		"outputs": [
			{
				"name": "itemId",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	}
];

window.addEventListener('load', async () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({
                method:

                    'eth_requestAccounts'
            });

           
        } catch (error) {
            console.error(error);
        }
    }
});
if (typeof web3 != 'undefined') {
    web3 = new Web3(web3.currentProvider);
}

var currAccount;
web3.eth.getAccounts((err, acc) => {
    if(err){
        console.log(err);
        return;
    }
    else {
        currAccount = acc[0];
        document.getElementsByTagName('input')[0].value = currAccount;
    }
})

const contractAddr = '0x610d8e03E33402DE84ef6d8a48e2Ca3Ea85A19da';

const contract = new web3.eth.Contract(abi, contractAddr);


async function getOwner(){
    const owner = await contract.methods.owner1().call();
    document.getElementsByTagName('input')[1].value = owner;
}

getOwner();

async function getBalance(){
	const balance = await web3.eth.getBalance(contractAddr);
	document.getElementById('Balance').innerHTML += web3.utils.fromWei(balance) + ' eth';
}
getBalance();

//Action events for Bid buttons.
document.getElementsByClassName('bidButton')[0].addEventListener('click', async () => {await contract.methods.bid(0).send({from: currAccount, value: web3.utils.toWei('0.01', 'ether')});})
document.getElementsByClassName('bidButton')[1].addEventListener('click', async () => {await contract.methods.bid(1).send({from: currAccount, value: web3.utils.toWei('0.01', 'ether')});})
document.getElementsByClassName('bidButton')[2].addEventListener('click', async () => {await contract.methods.bid(2).send({from: currAccount, value: web3.utils.toWei('0.01', 'ether')});})

//Action event for Reveal button.
document.getElementById('revealButton').addEventListener('click', async () => {
    const tokens = await contract.methods.tokenCounts().call();
    for(var i=0; i<3; i++){
        document.getElementsByClassName('bidAmmount')[i].innerHTML = tokens[i];
    }
})

//Action event for Withdraw button.
document.getElementById('withdrawButton').addEventListener('click', async () => {
    await contract.methods.withdraw().send({from: currAccount,});
    alert('Withdrew to Owner');
})




