import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "flowbite-react";
import { Contest } from '../logic/model/Contest';
import { useAppDispatch } from '../logic/redux/reduxHooks';
import { ROUTES } from '../logic/utils/constants';
import { contestActions } from '../logic/redux/reducers/ContestReducer';

function ClientContestItem({ contest }: { contest: Contest }) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleStartContest = () => {
        dispatch(contestActions.setCurrentContest(contest));
        navigate(`${ROUTES.clientDoContest}/${contest.id}`);
    };

    return (
        <div className="border border-gray-300 shadow-md p-4 rounded-lg w-80 flex-shrink-0">
            <div className="font-bold text-lg mb-2">{contest.quiz.name}</div>
            <div className="text-gray-700 mb-4">Date: {contest.date}</div>
            <Button 
                onClick={handleStartContest} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Commencer
            </Button>
        </div>
    );
}

export default ClientContestItem;
