import React from 'react'
import AdminQuestionItem from '../../components/AdminQuestionItem';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Question } from '../../logic/model/question';
import { useAppSelector } from '../../logic/redux/reduxHooks';
import { questionSelectors } from '../../logic/redux/reducers/QuestionReducer';
import { ROUTES } from '../../logic/utils/constants';

function AdminHomeQuestionPage() {

  const navigate = useNavigate();

  const questions: Question[] = useAppSelector(questionSelectors.selectAllQuestions);

  return (
    <div className="p-4">
    <div className="flex items-center">
        <FaArrowLeft 
            className="text-2xl cursor-pointer hover:text-blue-500 mr-2" 
            onClick={() => navigate(ROUTES.adminHomePage)}
        />
        <h1 className="text-2xl font-bold text-center flex-grow">Mes Questions</h1>
    </div>

    <div className="flex flex-wrap justify-center space-y-4 mt-6 space-x-2">
        {questions.map((question, index) => (
            <AdminQuestionItem key={index} question={question} withButtons={true} />
        ))}
    </div>

    <div className="flex justify-center mt-4">
        <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => console.log('Ajouter une question')}
        >
            Ajouter une question
        </button>
    </div>
</div>
  );
}

export default AdminHomeQuestionPage