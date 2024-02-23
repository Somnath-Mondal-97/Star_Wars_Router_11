import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Planets.css'

const Planets = () => {
    const [planets,setPlanets] = useState([])
    const[nextPage,setNextPage] = useState('')
    const[prevPage,setPrevPage] = useState('')
    
    useEffect(() => {
        const fetchPlanetsData = async () => {
            try {
                const response = await fetch('https://swapi.dev/api/planets/?format=json');
                if (!response.ok) {
                    throw new Error('Failed to fetch planets data');
                }
                const data = await response.json();
                setPlanets(data.results);
                setNextPage(data.next);
                setPrevPage(data.previous);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchPlanetsData();
    }, []);
    
    const handlePrevPage = async () => {
        if (prevPage) {
            try {
                const response = await fetch(prevPage);
                if (!response.ok) {
                    throw new Error('Failed to fetch previous page data');
                }
                const data = await response.json();
                setPlanets(data.results);
                setNextPage(data.next);
                setPrevPage(data.previous);
            } catch (error) {
                console.error('Error fetching previous page data:', error);
            }
        } else {
            alert('No Previous Page');
        }
    };
    
    const handleNextPage = async () => {
        if (nextPage) {
            try {
                const response = await fetch(nextPage);
                if (!response.ok) {
                    throw new Error('Failed to fetch next page data');
                }
                const data = await response.json();
                setPlanets(data.results);
                setNextPage(data.next);
                setPrevPage(data.previous);
            } catch (error) {
                console.error('Error fetching next page data:', error);
            }
        } else {
            alert('No Next Page');
        }
    };
    


  return (
    <div>
      <div className="container">
        <div className="row">
            {
                planets.map(planet => (
                    <div key={planet.name} className="col-lg-4 planet-button-div mt-5 mb-5">
                        <Link to={`/planet/${planet.url.split('/').slice(-2, -1)[0]}`} className='btn-link'>
                            <button className="planet-button">{planet.name}</button>
                        </Link>
                    </div>
                ))
            }
        </div>
        <div className="row">
            <div className="col-lg-6 m-auto">
                <div className="btn-group btn-group-lg button-group" role="group" aria-label="Large button group">
                    <button type="button" className="btn btn-outline-info" onClick={handlePrevPage}>Prev</button>
                    <button type="button" className="btn btn-outline-info" onClick={handleNextPage}>Next</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Planets



