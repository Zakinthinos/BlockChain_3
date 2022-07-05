pragma solidity ^0.5.9;

contract Lottery {
    
    struct Item {
        uint itemId;
        address[] ticketsOfPlayers;
    }

    address payable public owner1;
    address payable public owner2;

    address[3] public potential_winners;
    Item[3] public items;
    
    //True when lottery is finished.
    bool public finished;

    constructor() public payable 
    {
        owner1 = msg.sender;
        owner2 = address(0x153dfef4355E823dCB0FCc76Efe942BefCa86477);
        finished = false;

        for(uint i=0; i<3; i++){
            items[i] = Item({itemId:i, ticketsOfPlayers: new address[](0)});
        }
        
    }

    function random() view private returns(uint){return uint(keccak256(abi.encodePacked(block.difficulty, now)));}

    function bid(uint itemId) public payable minVal notFinished nonOwner {
        items[itemId].ticketsOfPlayers.push(msg.sender);
    }

    function withdraw() public payable onlyOwners{
        msg.sender.transfer(address(this).balance);
    }

    function revealWinners() public notFinished onlyOwners{
        for(uint i=0; i<3; i++){
            if(items[i].ticketsOfPlayers.length !=0){
                uint rand = random() % items[i].ticketsOfPlayers.length;
                potential_winners[i] = items[i].ticketsOfPlayers[rand];
            }
            else {
                potential_winners[i] = address(0); 
            }
        }
        finished = true;
    }

    function tokenCounts() public view returns(uint[3] memory){
        uint[3] memory tokens;
        for(uint i=0; i<3; i++){
            tokens[i] = items[i].ticketsOfPlayers.length;
        }
        return tokens;
    }

    function amIWinner() public view isFinished returns(uint[3] memory){
        uint[3] memory wonItems;
        for(uint i=0; i<3; i++){
            if(potential_winners[i] == msg.sender)
            {
                wonItems[i] = i+1; 
            }
            else 
            {
                wonItems[i] = 0;
            }
        }
        return wonItems;
    }

    modifier minVal(){
        if(msg.value != 0.01 ether){
            revert();
        }
           _;
    }

    modifier notFinished(){
        if(finished){
            revert();
        }
           _;
    }

    modifier isFinished(){
        if(!(finished)){
            revert();
        }
           _;
     
    }

    modifier onlyOwners(){
        if(!(msg.sender == owner1 || msg.sender == owner2)){
             revert();        
        }
            _;
    }

    modifier nonOwner() {
        if( msg.sender == owner1 || msg.sender == owner2){
            revert();
        }
            _;
    }
}

