import React, 
{useState, useEffect} from 'react';
import './Form.css';
import {validate} from '../../Utils/General-Functions.js';
import {getTemperaments, postDog} from '../../Redux/actions';
import {useDispatch, useSelector} from "react-redux";


export default function Form(props) {

	const dispatch = useDispatch()
	const temperaments = useSelector((state)=>state.dogstemperaments)
	const [ButtonStatus, setButtonStatus] = useState()
	const [min_max, SetMin_max] = useState({
		weight_min:'',
		weight_max:'',
		height_min:'',
		height_max:'',
	})
	const [input, SetInput] = useState({
		name:'',
		height:'', 
		weight:'',
		expectancy:'', 
		databaseValue: true,
		temperament:[],
		image:'',
	})
	const [errors, setError] = useState({})

	useEffect(()=>{

		dispatch(getTemperaments());
		// eslint-disable-next-line
	}, [])
	useEffect(()=>{
		return;
	}, [input, errors])


	function buttonController(){
		if(Object.values(errors).length > 0){
   	 		setButtonStatus('false')
   		}
   	 	if (Object.values(errors).length === 0){
   	 		setButtonStatus('')
   		}
	}

  	function handleDelete(e){
  		SetInput({...input,
			temperament: input.temperament.filter((el)=>el !== e.target.value)
		})
		buttonController()
	}

	function handleSubmit(values){
		values.preventDefault()
		dispatch(postDog(input))
		SetInput({
		name:'',
		height:'', 
		weight:'',
		expectancy:'', 
		databaseValue: true,
		temperament:[],
		image:'',
		})
		SetMin_max({
			weight_min:'',
			weight_max:'',
			height_min:'',
			height_max:'',
		})
	}

	function Selector (e){
		if(e.target.value === 'Default'){
			buttonController()
			return;
		}
		SetInput({...input,
			temperament: [...input.temperament, e.target.value]})
		buttonController()
	}

	function inputchange(e){
		if(e.target.name !== 'image'){
			setError(validate({...input,
		      	[e.target.name] : e.target.value}));
		}if(e.target.name.includes('weight') || e.target.name.includes('height')){
			const data = e.target.name.split(' ')
			
			if(e.target.value > 200){
				e.target.value = 200
			}
			SetMin_max({...min_max,
				[data[0]] : e.target.value
			})

			data[0].includes('weight') ? SetInput({...input,
				weight: `${min_max.weight_min} - ${min_max.weight_max}`
			}) 
			:
			SetInput({...input,
			height: `${min_max.height_min} - ${min_max.height_max}`
			})
		}else{
			if(e.target.value > 100 && e.target.name === 'expectancy'){
				e.target.value = 100
			}
		   	SetInput({...input,
		  		[e.target.name] : e.target.value + ''})
		}
   	 	buttonController()
	}

	return (
		<div className='Form-Container'>
			<form onSubmit={handleSubmit}>
				<div className='Inner-Form'>
					<label>Name:</label>
					<input className={errors.name && 'danger'} 
					type='text' name='name' 
        			onChange={inputchange} 
        			value={input.name} />
        			{errors.name && (<p className='danger'>
            		{errors.name}
          			</p>)}
				</div>
				<div className='Inner-Form'>
					<label>Weight by Kg: </label>
					<label>Minimun</label>
					<input className={errors.weight && 'danger'} 
					type='number' name='weight_min' 
        			onChange={inputchange} 
        			value={min_max.weight_min} max="200" />
        			<label>Maximun</label>
        			<input className={errors.weight && 'danger'} 
					type='number' name='weight_max' 
        			onChange={inputchange} 
        			value={min_max.weight_max} max="200" />
        			{errors.weight && (<p className='danger'>
            		{errors.weight}
          			</p>)}
				</div>
				<div className='Inner-Form'>
					<label>Height:</label>
					<label>Minimun</label>
					<input className={errors.height && 'danger'} 
					type='number' name='height_min' 
        			onChange={inputchange} 
        			value={min_max.height_min} max="200" />
        			<label>Maximun</label>
        			<input className={errors.height && 'danger'} 
					type='number' name='height_max' 
        			onChange={inputchange} 
        			value={min_max.height_max} max="200" />
        			{errors.height && (<p className='danger'>
            		{errors.height}
          			</p>)}
				</div>
				<div className='Inner-Form'>
					<label>Life Span by Years:</label>
					<input className={errors.expectancy && 'danger'} 
					type='number' name='expectancy' 
        			onChange={inputchange} 
        			value={input.expectancy} max="100"/>
        			{errors.expectancy && (<p className='danger'>
            		{errors.expectancy}
          			</p>)}
				</div>
				<div className='Inner-Form'>
					<label>Temperaments:</label>
					<label>Choose:</label>
					<select onChange={Selector}>
					<option value='Default'>Click me</option>
					{temperaments?.map((el)=><option value={el.name} key={el.id}>
						{el.name}</option>)}
					</select>
					{errors.temperament && (<p className='danger'>
            		{errors.temperament}
          			</p>)}
				</div>
				<div className='Inner-Form'>
					<label>Image:</label>
					<input className={errors.image && 'danger'} 
					type='text' name='image' 
        			onChange={inputchange} 
        			value={input.image} />
				</div>
				<input type='submit' disabled={ButtonStatus}></input>
			</form>
			<div className='Temp-Container'>Temperaments<br/>
			Chosen: 
				{input.temperament?.map((el)=> <div className='Temp'>
					<p>{el}</p>
				<button className='Close-Button' value= {el}
				onClick={handleDelete}>X</button>
				</div>)}
			</div>
		</div>
	)
}