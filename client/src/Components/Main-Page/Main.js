import './Main.css';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import {getDogs} from "../../Redux/actions/index.js";
import paw from "../../Icons/paw.png";
import {shuffleArray} from "../../Utils/General-Functions.js";



function Main(props) {

  const [BackgroundDogs, Set_Dogs] = useState([])
  /*const [Loading, Set_Loading] = useState(true)*/

  useEffect(()=>{
    props.dogs()
     return;
     // eslint-disable-next-line
  },[])

  useEffect(()=>{
    Set_Dogs(shuffleArray(props.state.dogs))
    /*Set_Loading(false)*/
    return;
    // eslint-disable-next-line
  },[props.state.dogs])


  return (

    <div className="Main">
      {BackgroundDogs.map((el)=><div 
        className="Dog-image"
        style={{backgroundImage: `url('${el.image}')`}}
        key={el.id} 
        />
      )}
      <div className='Main-header'>
        <h1 className='Char-1'>H</h1>
        <h1 className='Char-2'>E</h1>
        <h1 className='Char-3'>N</h1>
        <h1 className='Char-4'>R</h1>
        <h1 className='Char-5'>Y</h1>
        <h1 className='Char-6'>D</h1>
        <h1 className='Char-7'>O</h1>
        <h1 className='Char-8'>G</h1>
        <h1 className='Char-9'>S</h1>
        <Link to='/home'>
          <img className='Main-header-img' src={paw} alt='Not found'/>
        </Link>
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dogs: dog => dispatch(getDogs()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
