const {Dog, Temperament} = require('../../db.js')
const axios = require('axios')
const {API_KEY} = process.env


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
	console.log(validation)
	return validation;
}





module.exports = {
	TemperamentComparison,
}