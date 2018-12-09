function checkCashRegister(price, cash, cid){
    
    const convTbl = {
        currency: ['PENNY', 'NICKEL', 'DIME', 'QUARTER', 'ONE', 'FIVE', 'TEN', 'TWENTY', 'ONE HUNDRED'],
        values: [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]
    };

    //cid ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]

    const change = cash - price;
    let changeReduce = change; 
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
        if(convTbl.values[count] <= change){
            //loop through the cid currency
            /*for(let i = 1; i <= currencyQuantity; i++){
                if(cid[count][1] >= change){
                    response.change.push([convTbl.currency[valueIndex], convTbl.values[valueIndex]]);

                }
            
            }*/

            console.log(convTbl.values[count]);
        }

        
    }
    console.log(response);
    //find the first cid unity avaliable lower or equal to the change




}





checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);