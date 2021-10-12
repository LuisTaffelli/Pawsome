const axios = require('axios')

export function postDog(payload) {
  return async function(dispatch) {
    const response = await axios.post(`http://localhost:3001/dogs`, payload)
    return response
  }
}

export function sourceFilter(source) {
  return function(dispatch){
    return axios.get(`http://localhost:3001/filters/${source}`)
    .then(json =>{
      dispatch({type: 'FILTER_DOGS', payload: json.data})
    })
  }
}

export function getTemperaments(){
  return function(dispatch){
    return axios.get(`http://localhost:3001/temperaments`)
    .then(json =>{
      dispatch({type: 'GET_TEMPERAMENTS', payload: json.data})
    })
  }
}

export function getDogs() {
  return function(dispatch) {
    return axios.get(`http://localhost:3001/dogs`)
      .then(json => {
        dispatch({ type: 'GET_DOGS', payload: json.data });
      });
  };
}