const { Router } = require('express');
const {Dog, Temperament} = require('../db.js');
const {ApiInfo, DatabaseInfo} = require('./utils/Info-Functions.js');
/*const {TemperamentComparison} = require('./utils/Filter-Functions.js')*/


const router = Router();


router.get('/:source', async (req, res)=>{
	let source = req.params.source;
	let temperamentFilter = req.query.temperamentFilter;
	if(source.toLowerCase() === 'api'){
		let api_info = await ApiInfo();
		if(temperamentFilter){
			api_info = api_info.filter((el)=>el.temperament?.includes(temperamentFilter))
		}
		try{
			return res.status(200).json(api_info);
		}catch(e){
			return res.status(500).json('Tuvimos un error con tu peticion');
		}
	}else if (source.toLowerCase()==='database'){
		let db_info = await DatabaseInfo();
		if(temperamentFilter){
			db_info = await db_info.filter((el)=>el.temperament?.includes(temperamentFilter))
		}
		try{
			return res.status(200).json(db_info);
		}catch(e){
			return res.status(500).json('Tuvimos un error con tu peticion');
		}
	}
})




module.exports = router;