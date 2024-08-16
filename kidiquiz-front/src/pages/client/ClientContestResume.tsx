import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ClientContestResume() {
    const [searchParams] = useSearchParams();
    const score = searchParams.get('score');
    const navigate = useNavigate();

    return (
        <div className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-8">Vous avez eu un score de: {score}</h1>
            <button 
                onClick={() => navigate('/')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Retour à l'accueil
            </button>
        </div>
    );
}

export default ClientContestResume;
