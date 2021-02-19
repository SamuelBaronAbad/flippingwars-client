


    function turnRight(values) {
        
        var currVal = values.length, tempVal, finalVal;
        while (currVal !== 0) {
            currVal -= 1;
            if (currVal === 0) {
                finalVal = 3;
            } else if (currVal === 3){
                finalVal = 0;
            }
            tempVal = values[currVal]
          
            values[currVal] = values[finalVal]
            
            values[finalVal] = tempVal;
            
            
        }
        console.log(values);
        return values;
        
    }

    module.exports = {
        turnRight
    }

