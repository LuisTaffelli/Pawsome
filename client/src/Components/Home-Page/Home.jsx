import "./Home.css";
import { connect } from "react-redux";
import {useState, useEffect} from "react"
import {getDogs, getTemperaments} from "../../Redux/actions/index.js";
import Card from "../Cards/Card.js";
import axios from 'axios';
import {LighterSort, 
	HeavierSort, 
	stringSort_za, 
	stringSort_az} from "../../Utils/General-Functions.js";
import Pagination from "../Dogs-Routes/Pagination.js";
import NavigationBar from "../Dogs-Routes/Navigation-Bar.js";


function Home(props){

	const [Loaded, Set_Loaded] = useState()
	const [Loaded_dogs, Set_LoadedDogs] = useState()
	const [CurrentPage, SetCurrentPage] = useState(1)
	const [Visible_dogs, SetVD] = useState([])
	// eslint-disable-next-line
	const [filterDict, SetfilterDict] = useState({
		Asc: true,
		Desc: true,
		weight: {
			Lighter: true,
			Heavier: true
		},
		source: {
			Api: true,
			Database: true
		}
	})


	useEffect(()=>{
		if (!props.state.dogs.length){
			Set_Loaded(false)
		}else{
			if(!props.state.dogstemperaments?.length){
					props.temperaments()
					}
			if(Loaded_dogs === undefined){
					Set_LoadedDogs(props.state.dogs)
				}
			SetCurrentPage(1)
			SetVD(Loaded_dogs?.slice((CurrentPage*8) - 8, CurrentPage*8))
		}
		return;
		// eslint-disable-next-line
	},[props.state.dogs, Loaded_dogs])


	useEffect(()=>{
		// eslint-disable-next-line
		SetVD(Loaded_dogs?.slice((CurrentPage*8) - 8, CurrentPage*8))
		return;
		// eslint-disable-next-line
	}, [CurrentPage])

	const CurrentHandler = (num) =>{
		SetCurrentPage(num)
	}

	const onSearch = (value) => {
		let SearchedDogs = [...props.state.dogs]
		if(value === ""){
			Set_LoadedDogs(props.state.dogs)
		}else{
			Set_LoadedDogs(SearchedDogs.filter((el)=>el.name.toLowerCase().includes(value.toLowerCase())))
		}
	}

	const FilterTemperaments = (e) => {
		const Filter = e.target.value
		let FilteredDogs = [...props.state.dogs]
		if(Filter === 'Default' || Filter === 'Both'){
			Set_LoadedDogs(props.state.dogs)
			return;
		}
		if(filterDict[Filter]){
			Filter === 'Asc' ? FilteredDogs = FilteredDogs.sort(stringSort_az) :
			FilteredDogs.sort(stringSort_za)
			Set_LoadedDogs(FilteredDogs)
		}else if (filterDict.weight[Filter]){
			Filter === 'Lighter' ? FilteredDogs = FilteredDogs.sort(LighterSort)
			: FilteredDogs = FilteredDogs.sort(HeavierSort)
			Set_LoadedDogs(FilteredDogs)
		}else if (filterDict.source[Filter]){
			axios.get(`http://localhost:3001/filters/${Filter}`)
    	.then(json => Set_LoadedDogs(json.data))
    	.catch((e)=> console.log(e))
		}else{
			FilteredDogs = props.state.dogs.filter( el =>el.temperament?.includes(Filter))
			Filter === 'All' ? Set_LoadedDogs(props.state.dogs) : Set_LoadedDogs(FilteredDogs)
		}
	}

	function HandleClick(){
		props.dogs()
		props.temperaments()
		Set_Loaded(true)
	}

	return (
		<>
		<NavigationBar filters={FilterTemperaments} onSearch={onSearch}/>
		<div className='Home-Container'>
		{!Loaded && !Visible_dogs && <button onClick={HandleClick}> Cargar perritos </button>}
			<div className='Cards'>
			{Visible_dogs?.map((el)=><Card
				image = {el.image} 
				name = {el.name}
				id = {el.id}
				temperament = {el.temperament}
				databasevalues = {el.temperaments}
				weight= {el.weight}
				key = {el.id}
				/>)}
			</div>
		{Loaded_dogs && <Pagination dogs={Loaded_dogs} maxperpage={8} pagination={CurrentHandler} />}
		</div>
		</>
		)

}


function mapStateToProps(state) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dogs: dog => dispatch(getDogs()),
    temperaments: temperaments => dispatch(getTemperaments()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);