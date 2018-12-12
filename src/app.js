//change class


class Change{
    constructor(price, cash, cid){
        this.change = cash - price;
        this.status = Change.calcStatus(this.change, cid);
        this.transition = Change.makeTransition(this.change, cid, this.status);
        
    }

    static calcStatus(change, cid){

        //sum all the cash-in-drawer
        const totalCid = cid.map(currency => currency[1])
                            .reduce( (a,b) => {
                                return parseFloat((a + b).toFixed(2));
                            });
        
        
        if(totalCid - change > 0) return 'OPEN';
        else if(totalCid - change === 0) return 'CLOSED'
        else return 'INSUFFICIENT_FUNDS';

    }

    //the goal of this function is to make a transition taking the money from the cid, putting into a change variable and creating a new cid
    //return a object with the old cid, new cid and change
    //status parameter not required
    static makeTransition(change, cid, status){

        //values reference
        const valuesTbl = {
            currency: ['PENNY', 'NICKEL', 'DIME', 'QUARTER', 'ONE', 'FIVE', 'TEN', 'TWENTY', 'ONE HUNDRED'],
            values: [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]
        };

        // will be composed
        const returnObj = {
            oldCid: cid,
            newCid: [],
            change: []
        };

        
        if(status === 'INSUFFICIENT_FUNDS'){

            returnObj.newCid = cid;

        }else if(status === 'CLOSED'){

            returnObj.newCid = cid.map(([currency, number]) => [currency, 0]);
            returnObj.change = cid;


        }else {

            //the money will be taken from cid and placed on returnObj.change
            //transitionMoney will be used to store the amount of money taken from the cid
            let transitionMoney = 0;
            let transitionCid = cid;

            //loop through all cid itens(currecy and stored value of the currency)
            for(let countOne = transitionCid.length -1; countOne >= 0; countOne--){

                //cid item ex.: ["PENNY", 0.5]
                let currentCid = transitionCid[countOne];

                //index on valuesTbl.currency of the current currency
                //ex.: if the current currency is 'PENNY' the returned index will be 0 
                let currencyIndex = valuesTbl.currency.indexOf(currentCid[0]);

                //get the value of the currency ex.: PENNY = 0.01
                let currentCurrency = valuesTbl.currency[currencyIndex],
                    currentValue = valuesTbl.values[currencyIndex];

                //get how many units of the currency are in the cid

                /* if the current cid is ["PENNY", 0.5], the 'times'
                variable will be equal to 50, because there are 50 pennies
                in the cid (0.5 * 0.01)
                */
                const times = Math.round(currentCid[1] / currentValue);

                //loop until fulfill returnObj.change  with the change taken from transitionCid

                for(let countTwo = 1; countTwo <= times; countTwo++){

                    //checks if transitionMoney isn't fulfilled and equal to change
                    let checkLimit = parseFloat((transitionMoney + currentValue).toFixed(2));

                    if(checkLimit <= change && currentCid[1] != 0){

                        //takes money from the cid and puts on transitionMoney and returnObj.change
                        currentCid[1] -= currentValue;
                        transitionMoney += currentValue;


                        //checks if the returnObj.change already have a currency item, ex.: penny
                        //then adds the value
                        let cidItem = false;

                        for(const [index, value] of returnObj.change.entries()){
                            if(value[0] === currentCurrency){
                                cidItem = index;
                            }
                        }

                        if(typeof cidItem == 'number'){
                            returnObj.change[cidItem][1] += currentValue;
                        } else {
                            returnObj.change.push([currentCurrency, currentValue]);
                        }
                    }
                }
            }

            returnObj.newCid = transitionCid;
        }
        

        return returnObj;


    }

    fullChange(){

        return {
            status: this.status,
            change: this.transition.change
        };

    }    
}



function checkCashRegister(price, cash, cid) {
    const change = new Change(price, cash, cid);

    return change.fullChange();
  }



  console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));






