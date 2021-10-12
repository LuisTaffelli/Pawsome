const {Dog, Temperament} = require('../../db.js')
const axios = require('axios')
const {API_KEY} = process.env






const ApiInfo = async function(){
	const apiURL = await axios.get('https://api.thedogapi.com/v1/breeds?api_key='+API_KEY)
	const info = await apiURL.data.map(el =>{
		return {
			id: el.id,
			name: el.name,
			life_span: el.life_span,
			origin: el.origin,
			temperament: el.temperament,
			weight: el.weight.metric,
			height: el.height.metric,
			image: el.image.url,
		};
	});
	return info;
}

const DatabaseInfo = async function () {
	const dogs = await Dog.findAll();
	const final = dogs.map((dog)=>{
		return dog.dataValues;
	})
	return final;
}

const Api_Database = async function(){
	const API = await ApiInfo();
	const DB = await DatabaseInfo();
	const Mixin = API.concat(DB);

	return Mixin;
}




module.exports = {
	ApiInfo,
	DatabaseInfo,
	Api_Database,
}