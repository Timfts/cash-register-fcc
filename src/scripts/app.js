/*function checkCashRegister(price, cash, cid){
    
    const convTbl = {
        currency: ['PENNY', 'NICKEL', 'DIME', 'QUARTER', 'ONE', 'FIVE', 'TEN', 'TWENTY', 'ONE HUNDRED'],
        values: [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]
    };

    //cid ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]

    const change = cash - price;
    let changeP = cash - price;
    //const quantity = [];

    const response = {
        status: 'OPEN',
        change: []
    }

    for(let count = cid.length - 1; count >= 0; count--){
        //get the index of the currency, to get its value
        let valueIndex = convTbl.currency.indexOf(cid[count][0]);
        let currencyQuantity = Math.round(cid[count][1] / convTbl.values[valueIndex]);

        //check if the currency is smaller than the change
        if(convTbl.values[valueIndex] <= change){
            //loop through the cid currency
            for(let i = 1; i <= currencyQuantity; i++
                && changeP != 0){ 
                if(cid[count][1] >= change){
                    //retirar do cid e colocar no response
                    cid[count][1] = cid[count][1] - convTbl.values[valueIndex];
                    

                    changeP -= convTbl.values[valueIndex];

                    console.log(cid[count][1] , convTbl.values[valueIndex], change, changeP);
                    //response.change.push(cid[count][1]);

                } else if( changeP === 0){
                    return response;
                }
            } 

            //console.log(convTbl.values[valueIndex]);

            
        }

        
    }
    console.log(response);
    //find the first cid unity avaliable lower or equal to the change




}

*/



function checkCashRegister(price, cash, cid){
    const change = cash - price;
    const valuesTbl = {
        currency: ['PENNY', 'NICKEL', 'DIME', 'QUARTER', 'ONE', 'FIVE', 'TEN', 'TWENTY', 'ONE HUNDRED'],
        values: [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]
    }

    const response = {
        status: 'OPEN',
        change: []
    };

    let transitionMoney = 0;


    for(let i = cid.length -1; i >= 0; i--){
        let currentCid = cid[i];
        let currencyIndex = valuesTbl.currency.indexOf(currentCid[0]);
        
        let currentCurrency = valuesTbl.currency[currencyIndex],
            currentValue = valuesTbl.values[currencyIndex];


        for(let iTwo = 0; iTwo <= (currentCid[1] / currentValue); iTwo++){
            if(transitionMoney + currentValue <= change){
                currentCid[1] -= currentValue;
                transitionMoney += currentValue;

                response.change.push([currentCurrency, currentValue]);
            }

            
            
        }
        
        

        //console.log(currentCid, currentCurrency, currentValue, transitionMoney);

    }
    console.log(response);




}














checkCashRegister(5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);