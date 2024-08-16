import React, { useState } from 'react'
import { Question } from '../../logic/model/question';
import { useAppDispatch, useAppSelector } from '../../logic/redux/reduxHooks';
import { questionSelectors } from '../../logic/redux/reducers/QuestionReducer';
import { useNavigate } from 'react-router-dom';
import AddQuestionItem from '../../components/AddQuestionItem';
import { QuizPayload } from '../../logic/model/Quiz';
import { quizAsyncActions } from '../../logic/redux/reducers/QuizReducer';

function AdminAddQuizPage() {
    const [quizName, setQuizName] = useState('');
    const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const questions: Question[] = useAppSelector(questionSelectors.selectAllQuestions);

    const handleQuestionChange = (question: Question, isChecked: boolean) => {
        if (isChecked) {
            setSelectedQuestions(prev => [...prev, question]);
        } else {
            setSelectedQuestions(prev => prev.filter(q => q.id !== question.id));
        }
    };

    const handleSubmit = () => {
        if (quizName && selectedQuestions.length >= 5) {
            const quizPayload: QuizPayload = {name: quizName, questions: selectedQuestions};
            dispatch(quizAsyncActions.createQuiz(quizPayload));
            console.log("Quiz ajouté avec succès");
            dispatch(quizAsyncActions.getAllQuiz());
            console.log({ name: quizName, questions: selectedQuestions });

            navigate('/admin/quiz');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Ajouter un quiz</h1>
            
            <div className="flex justify-center items-center space-x-4 mb-4">
                <input 
                    type="text" 
                    placeholder="Nom du quiz" 
                    value={quizName} 
                    onChange={(e) => setQuizName(e.target.value)} 
                    className="border border-gray-300 p-2 rounded-md w-1/2 focus:outline-none focus:border-blue-500"
                />
                <button 
                    onClick={handleSubmit}
                    disabled={!quizName || selectedQuestions.length < 5}
                    className={`px-4 py-2 rounded-md text-white ${!quizName || selectedQuestions.length < 5 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    Valider
                </button>
            </div>

            <p className="text-center text-gray-600 mb-4">Choisissez les questions du quiz (au moins 5 questions)</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {questions.map((question) => (
                    <AddQuestionItem 
                        key={question.id} 
                        question={question} 
                        onChange={handleQuestionChange}
                    />
                ))}
            </div>
        </div>
    );
}

export default AdminAddQuizPage