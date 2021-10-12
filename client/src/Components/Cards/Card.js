import './Card.css';
import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function Card({name, image, id, weight, temperament, databasevalues}) {

  const [Temp, setTemp] = useState('')

  useEffect(()=>{
    if(databasevalues !== undefined){
    setTemp(databasevalues.map((el)=>el.name).join(', '))
    }else{
    setTemp(temperament)
    }
    return
    //eslint-disable-next-line
  }, [])
  
  return (
    <div className='Card-Container'>
      <img src={image} alt=''></img>
      <div>
        <Link to={`/dogs/${id}`}>
          <h3>{name}</h3>
        </Link>
        <h5>Weight: {weight} Kg</h5>
        <h5>Temperaments: {Temp}</h5>
      </div>
    </div>
    )
};