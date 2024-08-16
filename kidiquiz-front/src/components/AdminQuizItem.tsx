import React, { useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import { Quiz } from '../logic/model/Quiz';

function AdminQuizItem({ quiz, withButtons, showLaunch }: { quiz: Quiz, withButtons?: boolean, showLaunch?: boolean }) {
    const [openQuizModal, setOpenQuizModal] = useState(false);

    const handleLaunchQuiz = () => {
        // Implement logic for launching the test
        console.log('Launch quiz', quiz.id);
    };
    console.log("showLaunch");
    console.log(showLaunch);

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
