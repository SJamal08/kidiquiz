import React from 'react'
import { useAppDispatch, useAppSelector } from '../../logic/redux/reduxHooks';
import { questionSelectors } from '../../logic/redux/reducers/QuestionReducer';
import { Question } from '../../logic/model/question';
import AdminQuestionItem from '../../components/AdminQuestionItem';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../logic/utils/constants';
import { Quiz } from '../../logic/model/Quiz';
import AdminQuizItem from '../../components/AdminQuizItem';
import { quizSelectors } from '../../logic/redux/reducers/QuizReducer';

function AdminHomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const questions: Question[] = useAppSelector(questionSelectors.selectAllQuestions);
  const quizList: Quiz[] = useAppSelector(quizSelectors.selectAllQuiz);

  return (
    <div className="p-6 w-max-screen">

      {/* Section Mes Questions */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Mes Questions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 min-w-0">
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

         {/* Section Mes Quiz */}
         <h2 className="text-2xl font-bold mt-8 mb-4">Mes Quiz</h2>
            <div className="flex space-x-4 overflow-x-auto">
                {quizList.map((quiz: Quiz, index: number) => (
                    <AdminQuizItem key={index} quiz={quiz} showLaunch={true} />
                ))}
                <div
                    onClick={() => navigate('/admin/quiz')}
                    className="border border-blue-400 shadow-md p-4 rounded-lg w-80 h-64 flex items-center justify-center cursor-pointer hover:bg-blue-100"
                >
                    Voir plus
                </div>
            </div>
    </div>
  );
}

export default AdminHomePage