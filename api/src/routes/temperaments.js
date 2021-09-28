const { Router } = require('express');
const {Temperament} = require('../db.js')
const axios = require('axios')
const {API_KEY} = process.env




const router = Router();


router.get('/', async (req, res)=>{
	
	const apiURL = await axios.get('https://api.thedogapi.com/v1/breeds?api_key='+API_KEY)

	const infoTemp = await apiURL.data.map((el)=>{
		if(el.temperament){
			return {temperaments : el.temperament.split(', ')}
		}else{
			return {temperaments : null}
		}
	})

	let temps = await infoTemp.map((el)=>{
		if(el.temperaments){
			for (let i = 0; i < el.temperaments.length; i++) {
				return el.temperaments[i]
			}
		}else{
			return null
		}
	})
	temps = temps.filter(function(item, pos) {
    return temps.indexOf(item) == pos;
	})

	temps.forEach((temperament)=>{
		if (temperament){
			Temperament.findOrCreate({
				where : {
					name : temperament
				}
			})
		}
	})


	const temperaments = await Temperament.findAll()
	res.status(200).json(temperaments)
})



module.exports = router;