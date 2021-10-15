const {Dog, Temperament} = require('../../db.js')



async function TemperamentComparison(dog, temperament){
	if(!dog.temperament){
		return false;
	}
	let validation = false;
	const provInfo = await dog.temperament.toLowerCase().split(', ');
	for(let index=0; index < provInfo.length; index++){
		if(provInfo[index]===temperament.toLowerCase()){
			validation = true;
		}
	}
	return validation;
}





module.exports = {
	TemperamentComparison,
}