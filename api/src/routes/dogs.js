const { Router } = require('express');
const {Dog, Temperament} = require('../db.js');
const {ApiInfo, DatabaseInfo, Api_Database} = require('./utils/Info-Functions.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//Funciones Utiles

/*const ApiInfo = async function(){
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
*/

//Router
const router = Router();




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async function(req, res){
	let dogs_name = req.query.name;
	let general_info = await Api_Database();
	if (dogs_name){
		let dogs = await general_info.filter((dog)=>dog.name.toLowerCase().includes(dogs_name.toLowerCase()))
		dogs.length ? res.status(200).json(dogs) : res.status(404).send('Perro no encontrado');
	}else{
		try{
			return res.status(200).json(general_info);
		}catch(e){
			return res.status(500).json('Tuvimos un error con tu peticion');
		}
	}
});

router.get('/:idRaza', async function(req, res){
	let dog_id = req.params.idRaza;
	let general_info = await Api_Database();
	try{
		let dog = await general_info.filter((dog)=>(dog.id + '') === dog_id)
			
		dog.length ? res.status(200).json(dog) : res.status(404).send('Perro no encontrado');
	}catch(e){
		res.status(500).send('Tuvimos un error con tu peticion')
	}
});

router.post('/', async (req , res)=>{
	let {name,
	height, 
	weight, 
	id, 
	expectancy, 
	databaseValue,
	temperament,
	image} = req.body;

	let new_dog = await Dog.create({
		name,
	 	height, 
	 	weight, 
	 	id, 
	 	expectancy, 
	 	databaseValue,
	 	image
	})


	let temperaments = Temperament.findAll({
		where: {type : temperament}
	})

	new_dog.addTemperament(temperaments)

	res.status(200).json('El perro ha sido creado existosamente')
})

module.exports = router;
