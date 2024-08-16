import React, { useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import { Quiz } from '../logic/model/Quiz';
import { ContestPayload } from '../logic/model/Contest';
import moment from 'moment';
import { useAppDispatch } from '../logic/redux/reduxHooks';
import { contestAsyncActions } from '../logic/redux/reducers/ContestReducer';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../logic/utils/constants';

function AdminQuizItem({ quiz, withButtons, showLaunch }: { quiz: Quiz, withButtons?: boolean, showLaunch?: boolean }) {
    const [openQuizModal, setOpenQuizModal] = useState(false);
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const handleLaunchQuiz = () => {
        const newContest: ContestPayload = {
            quiz: quiz,
            date: moment().format('YYYY-MM-DD'), // Date d'aujourd'hui au format YYYY-MM-DD
            rankedList: []
        };
        dispatch(contestAsyncActions.createContest(newContest))
        dispatch(contestAsyncActions.getAllContests())

        console.log('New contest created:', newContest);
        console.log('Launch quiz', quiz.id);
        navigate(ROUTES.clientHomePage);
    };

    return (
        <div className="border border-blue-400 shadow-md p-4 rounded-lg w-80">
            <div className="font-bold text-lg mb-2">{quiz.name}</div>
            <div className="text-gray-700 mb-2">Questions: {quiz.questions.length}</div>
            
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2 w-full"
                onClick={() => setOpenQuizModal(true)}
            >
                Voir les questions
            </button>

            {showLaunch && (
                <button 
                    onClick={handleLaunchQuiz} 
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Lancer le quiz
                </button>
            )}

            {withButtons && (
                <div className="flex space-x-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Modifier</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Supprimer</button>
                </div>
            )}

            <Modal show={openQuizModal} size="md" onClose={() => setOpenQuizModal(false)}>
                <Modal.Header>Questions du Quiz</Modal.Header>
                <Modal.Body>
                    <ul className="list-disc list-inside">
                        {quiz.questions.map((question, index) => (
                            <li key={index} className="text-gray-700">{question.wording}</li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenQuizModal(false)}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AdminQuizItem;
