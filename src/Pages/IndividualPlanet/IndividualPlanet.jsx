import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './IndividualPlanet.css';

const IndividualPlanet = () => {
    const { id } = useParams();
    const [planet, setPlanet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedPeople, setRelatedPeople] = useState([]);
    const [names, setNames] = useState([]);

    useEffect(() => {
        const fetchPlanetDetails = async () => {
            try {
                const response = await fetch(`https://swapi.dev/api/planets/${id}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch planet details');
                }
                const data = await response.json();
                setPlanet(data);
                setRelatedPeople(data.residents);
            } catch (error) {
                console.error('Error fetching planet details:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlanetDetails();
    }, [id]);

    useEffect(() => {
        const fetchNames = async () => {
            setLoading(true); 
            const names = [];
            for (const residentURL of relatedPeople) {
                try {
                    const response = await fetch(residentURL);
                    if (!response.ok) {
                        throw new Error('Failed to fetch resident details');
                    }
                    const data = await response.json();
                    names.push(data.name);
                } catch (error) {
                    console.error('Error fetching resident details:', error);
                    names.push('Unknown Resident');
                }
            }
            setNames(names);
            setLoading(false); 
        };

        if (relatedPeople.length > 0) {
            fetchNames();
        }
    }, [relatedPeople]);

    if (loading) {
        return <div className='container'>Loading...</div>;
    }

    if (error) {
        return <div className='container'>Error: {error}</div>;
    }

    if (!planet) {
        return <div className='container'>No planet found</div>;
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row planet-details">
                    <h2>{planet.name}</h2>
                    <h3>Rotation Period: {planet.rotation_period}</h3>
                    <h3>Orbital Period: {planet.orbital_period}</h3>
                    <h3>Diameter: {planet.diameter}</h3>
                    <h3>Climate: {planet.climate}</h3>
                    <h3>Gravity: {planet.gravity}</h3>
                    <h3>Terrain: {planet.terrain}</h3>
                    <h3>Surface Water: {planet.surface_water}</h3>
                    <h3>Population: {planet.population}</h3>
                    {relatedPeople.length > 0 && (
                        <div className='person-div'>
                            <h3>Related People:</h3>
                            <div className='person-inner-div'>
                            {relatedPeople.map((residentURL, index) => {
                                const residentId = residentURL.split("/").filter(Boolean).pop(); 
                                const name = names[index] || 'Unknown Resident'; 
                                return (
                                    <div key={index}>
                                        <Link to={`/person/${residentId}`} className='people-links'>
                                            <h4>{name}</h4>
                                        </Link>
                                    </div>
                                );
                            })}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IndividualPlanet;






