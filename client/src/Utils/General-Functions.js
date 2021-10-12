function LighterSort(dogA, dogB) {
    /*if(dogA.weight.split('-')[0] === 'NaN'){

    }*/
    return dogA.weight.split('-')[0] - dogB.weight.split('-')[0]

}

function HeavierSort(dogA, dogB) {
    return dogB.weight.split('-')[0] - dogA.weight.split('-')[0]
}

function stringSort_az(a, b){
   let dogA=a.name.toLowerCase(), dogB=b.name.toLowerCase();
 if (dogA < dogB) //sort string ascending
  return -1;
 if (dogA > dogB)
  return 1;
 return 0; //default return value (no sorting)
}

function stringSort_za(a, b){
   let dogA=a.name.toLowerCase(), dogB=b.name.toLowerCase();
 if (dogB < dogA) //sort string ascending
  return -1;
 if (dogB > dogA)
  return 1;
 return 0; //default return value (no sorting)
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function validate (inputs){
    let errors = {}
    if(!inputs.name){
        errors.name = 'A name is required'
    }
    if (!inputs.weight){
        errors.weight = 'At least 1 weight is required'
    }
    if (!inputs.height){
        errors.height = 'At least 1 height is required'
    }
    if (!inputs.expectancy){
        errors.expectancy = 'Life Span is required'
    }
    if (!inputs.temperament.length){
        errors.temperament = 'You must select at least one temperament'
    }

    return errors;
}


export {shuffleArray,
 HeavierSort,
 LighterSort, 
 stringSort_za, 
 stringSort_az,
 validate};