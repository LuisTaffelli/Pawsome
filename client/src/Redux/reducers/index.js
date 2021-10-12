const initialState = {
	dogs: [],
	filteredDogs:[],
	dogstemperaments: [],
};

function rootReducer (state=initialState, action){
	switch(action.type){
		case 'GET_DOGS':
			return {
				...state, 
				dogs: action.payload

			};
		case 'GET_TEMPERAMENTS':
			return {
				...state,
				dogstemperaments: action.payload
			}
		case 'FILTER_DOGS':
			return {...state,
				filteredDogs: action.payload
			}
		case 'DOG_INFO':
			return {...state,
				}
		case 'POST_DOG':
			return {...state,}

		default:
			return {...state};
	};
}


export default rootReducer;