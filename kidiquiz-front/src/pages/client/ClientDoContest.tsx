import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Button, TextInput } from 'flowbite-react';
import moment from 'moment';
import { Quiz } from '../../logic/model/Quiz';
import { Contest, ContestPayload } from '../../logic/model/Contest';
import { ROUTES } from '../../logic/utils/constants';
import { useAppDispatch, useAppSelector } from '../../logic/redux/reduxHooks';
import { contestAsyncActions, contestSelectors } from '../../logic/redux/reducers/ContestReducer';

function ClientDoContest() {
    const { id } = useParams(); // ID du contest
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    const currentContest = useAppSelector(contestSelectors.selectCurrentcontest);

    useEffect(() => {
        // Charger le contest et le quiz associé ici
        const fetchQuiz = async () => {
            setQuiz(currentContest!.quiz);
        };
        fetchQuiz();
    }, [currentContest, id]);

    const handleStartQuiz = () => {
        setShowModal(false);
    };

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === quiz?.questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }

        if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null); // Reset the selected answer for the next question
        } else {
            handleSubmitQuiz();
        }
    };

    const handleSubmitQuiz = () => {
        // Créer un objet contest mis à jour avec le score
        const updatedContest: ContestPayload = {
            quiz: quiz!,
            date: moment().format('YYYY-MM-DD'),
            rankedList: [...currentContest!.rankedList, { username, score }]
        };

        // Sauvegarder le contest mis à jour
        dispatch(contestAsyncActions.updateContest({id: parseInt(id!), ContestPayload: updatedContest}));
        dispatch(contestAsyncActions.getAllContests());
        navigate(`${ROUTES.clientContestResume}/${id}?score=${score}`);
    };

    return (
        <div className="p-8">
            {/* Modal pour demander le nom de l'utilisateur */}
            <Modal show={showModal} size="md" onClose={handleStartQuiz}>
                <Modal.Header>
                    Entrez votre nom
                </Modal.Header>
                <Modal.Body>
                    <TextInput 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Votre nom" 
                    />
                    <Button 
                        className='bg-blue-500 mt-4'
                        onClick={handleStartQuiz} 
                        disabled={!username}
                    >
                        Commencer
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

            {/* Contenu du Quiz */}
            {quiz && (
                <div className="space-y-8">
                    {/* Section haute : Question */}
                    <div className="flex justify-between items-center">
                        <div></div>
                        <div className="text-lg font-bold">
                            {currentQuestionIndex + 1}/{quiz.questions.length}
                        </div>
                        <div></div>
                    </div>

                    <div className="text-center text-2xl font-bold">
                        {quiz.questions[currentQuestionIndex].wording}
                    </div>

                    {/* Section basse : Réponses */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {quiz.questions[currentQuestionIndex].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerClick(option)}
                                className={`p-4 border-2 rounded-lg ${selectedAnswer === option ? 'bg-blue-500 text-white' : 'bg-gray-200'} border-blue-500`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    <Button
                        onClick={handleNextQuestion}
                        disabled={!selectedAnswer}
                        className="w-80 mx-auto mt-4 bg-blue-500"
                    >
                        {currentQuestionIndex < (quiz.questions.length - 1) ? 'Continuer' : 'Soumettre'}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ClientDoContest;
