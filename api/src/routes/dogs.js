const { Router } = require('express');
const {Dog} = require('../db.js')
const axios = require('axios')
const {API_KEY} = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const ApiInfo = async function(){
	const apiURL = await axios.get('https://api.thedogapi.com/v1/breeds')
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


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async function(req, res){
	let dogs_name = req.query.name
	let general_info = await Api_Database()
	if (dogs_name){
		let dogs = await general_info.filter((dog)=>dog.name.includes(dogs_name.toLowerCase()))
		dogs.length ? res.status(200).json(dogs) : res.status(404).send('Perro no encontrado')
	}else{
		try{
			return res.status(200).json(general_info);
		}catch(e){
			return res.status(500).json('Tuvimos un error con tu peticion')
		}
	}
})

module.exports = router;
