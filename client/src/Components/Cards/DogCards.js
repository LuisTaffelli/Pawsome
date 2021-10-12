import {React, useState, useEffect} from 'react';
import axios from 'axios';


export default function DogCard (props){

	const [dog, setDog] = useState()

	useEffect(()=>{
		axios.get(`http://localhost:3001/dogs/${props.dir}`)
		.then((json)=>setDog(json.data))
		.then(console.log(dog))
		//eslint-disable-next-line
	},[])

	if(dog === undefined){
		return <div>Loading...</div>
	}else{
	return ( <div>
                <h1>{dog[0].name}</h1>
                <img src={`${dog[0].image}`} alt=''></img>
                <h5>Life Span: {dog[0].life_span || dog[0].expectancy} Years</h5>
                <h5>Height: {dog[0].height} </h5>
                <h5>Weigth: {dog[0].weight} Kg</h5>
                <h5>Origin: {dog[0].origin}</h5>
                <h5>Temperament: {dog[0].temperament || dog[0].temperaments.map((el, index)=>{
                	if(dog[0].temperaments.length - 1 === index){
                		return el.name
                	}
                	return el.name + ', '
                })}</h5>
            </div>)
	}
}