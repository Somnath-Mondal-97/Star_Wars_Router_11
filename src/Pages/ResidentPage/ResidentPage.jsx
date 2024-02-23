import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ResidentPage.css'

const ResidentPage = () => {
    const { id } = useParams();
    const [resident, setResident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResident = async () => {
            try {
                const response = await fetch(`https://swapi.dev/api/people/${id}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch resident details');
                }
                const data = await response.json();
                setResident(data);
            } catch (error) {
                console.error('Error fetching resident details:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResident();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!resident) {
        return <div>No resident found</div>;
    }

    return (
        <div className='container mt-5 resident-container'>
            <h2>{resident.name}</h2>
            <h3>Height: {resident.height}</h3>
            <h3>Mass: {resident.mass}</h3>
            <h3>Hair Color: {resident.hair_color}</h3>
            <h3>Skin Color: {resident.skin_color}</h3>
            <h3>Eye Color: {resident.eye_color}</h3>
            <h3>Birth Year: {resident.birth_year}</h3>
            <h3>Gender: {resident.gender}</h3>
        </div>
    );
};

export default ResidentPage;