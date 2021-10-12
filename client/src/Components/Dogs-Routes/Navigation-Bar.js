import {React, useState} from 'react';
import { connect } from "react-redux";
import {Link, useLocation} from "react-router-dom";
import Logo from "../../Icons/paw.png";
import SearchBar from "./Search-Bar.js"
import './Navigation.css';


function NavBar(argument) {
	//eslint-disable-next-line
	const [location, setLocation] = useState(useLocation())
	if(location.pathname.includes('home')){
		return (
		<div className='Nav-container'>
	      <Link to='/home'>
	        <img src={Logo} alt='Img not found'></img>
	        <h5>Henry Dogs App</h5>
	      </Link>
	      <div className='Filter-container'>
	      <div className='Filter-child'> Order name by:
		    	<select onChange={argument.filters}>
		    		<option value= 'Default'> Default </option>
		  	 		<option value= 'Asc'> ASC </option>
	     			<option value= 'Desc'> DESC </option>
		    	</select>
		    </div>
		    <div className='Filter-child'> Order weight by:
		    	<select onChange={argument.filters}>
		    		<option value= 'Default'> Default </option>
		  	 		<option value= 'Lighter'> Lighter </option>
	     			<option value= 'Heavier'> Heavier </option>
		    	</select>
		    </div>
		    <div className='Filter-child'> Temperaments: 
	      	<select onChange={argument.filters}>
	      		<option value= 'All'>All</option>
		      		{argument.state.dogstemperaments?.map((el)=><option value={el.name} key={el.id}>
		      			{el.name}
		      	</option>)}
		    	</select>
		    </div>
		    <div className='Filter-child'> Source:
		    	<select onChange={argument.filters}>
		    		<option value='Both'>Both</option>
		    		<option value='Api'>Api</option>
		   			<option value='Database'>Created</option>	
		    	</select>
		    </div >
		 	</div>
		 	<div className='Filter-container'>
		 		<Link to='/create'>
	      	<button>Upload Your own</button>
	      </Link>
		 	</div>
		 	<div className='Search-Container'>
		 		<SearchBar onSearch={argument.onSearch}/>
		 	</div>
	  </div>
	)}else{
		return (
		<div className='Nav-container'>
	      <Link to='/home'>
	        <img src={Logo} alt='Img not found'></img>
	        <h5>Henry Dogs App</h5>
	      </Link>
	      <Link to='/create'>
	      	<button>Upload Your own</button>
	      </Link>
	    </div>
		)
	}

}


function mapStateToProps(state) {
  return {
    state: state
  }
}


export default connect(mapStateToProps)(NavBar)