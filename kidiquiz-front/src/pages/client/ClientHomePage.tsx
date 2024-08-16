import React from 'react';
import { useAppSelector } from '../../logic/redux/reduxHooks';
import { contestSelectors } from '../../logic/redux/reducers/ContestReducer';
import ClientContestItem from '../../components/ClientContestItem';
import { Contest } from '../../logic/model/Contest';


function ClientHomePage() {
    const contests: Contest [] = useAppSelector(contestSelectors.selectAllcontest);

    console.log(contests);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Bienvenue sur Kidiquiz</h1>
            
            {contests.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {contests.map(contest => (
                        <ClientContestItem key={contest.id} contest={contest} />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl text-gray-600">Aucun quiz n'est disponible pour le moment</p>
                </div>
            )}
        </div>
    );
}

export default ClientHomePage;
