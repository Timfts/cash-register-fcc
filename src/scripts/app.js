
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

            const times = currentCid[1] / currentValue;

        

        //compose change
        for(let iTwo = 1; iTwo <= times; iTwo++){
            console.log(currentCid[1], transitionMoney, currentValue, change);
            
            if(transitionMoney + currentValue <= change && currentCid[1] != 0){
                currentCid[1] -= currentValue;
                transitionMoney += currentValue;

                let cidItem = false;
                
                for(const [index, value] of response.change.entries()){
                    if(value[0] === currentCurrency){
                        cidItem = index;
                        //console.log(value[0], currentCurrency, cidItem);
                    }
                }
                if(typeof cidItem == 'number'){
                    response.change[cidItem][1] += currentValue;
                } else {
                    response.change.push([currentCurrency, currentValue]);
                }
            }    
        }
        
        

        //console.log(currentCid, currentCurrency, currentValue, transitionMoney);

    }
    console.log(response);
    console.log(cid);




}














checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])