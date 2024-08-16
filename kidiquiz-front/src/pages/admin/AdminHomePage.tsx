import React from 'react'
import { useAppDispatch, useAppSelector } from '../../logic/redux/reduxHooks';
import { questionSelectors } from '../../logic/redux/reducers/QuestionReducer';
import { Question } from '../../logic/model/question';
import AdminQuestionItem from '../../components/AdminQuestionItem';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../logic/utils/constants';

function AdminHomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const questions: Question[] = useAppSelector(questionSelectors.selectAllQuestions);

  return (
    <div className="p-6 w-max-screen">
      {/* Section Mes Questions */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Mes Questions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 min-w-0">
          {/* Liste des questions avec un maximum de 5 items */}
          {questions.slice(0, 5).map((question) => (
            <AdminQuestionItem
              key={question.id}
              question={question}
            />
          ))}
          
          {/* Bloc Voir Plus */}
          <div
            className="border border-blue-400 shadow-md p-4 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-50 col-span-1"
            onClick={() => navigate(ROUTES.adminHomeQuestions)}
          >
            <span className="text-lg font-semibold">Voir plus</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminHomePage