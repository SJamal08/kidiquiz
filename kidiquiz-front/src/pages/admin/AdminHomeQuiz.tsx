import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { Quiz } from '../../logic/model/Quiz';
import { useAppSelector } from '../../logic/redux/reduxHooks';
import { quizSelectors } from '../../logic/redux/reducers/QuizReducer';
import AdminQuizItem from '../../components/AdminQuizItem';
import { Button } from 'flowbite-react';
import { ROUTES } from '../../logic/utils/constants';

function AdminHomeQuiz() {
    const navigate = useNavigate();
    const quizList: Quiz[] = useAppSelector(quizSelectors.selectAllQuiz);


    return (
        <div className="p-4">
            <div className="flex items-center space-x-4 mb-8">
                <HiArrowNarrowLeft 
                    className="text-2xl cursor-pointer hover:text-blue-500"
                    onClick={() => navigate('/admin')}
                />
                <h1 className="text-3xl font-bold text-center flex-grow">Mes Quiz</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quizList.map((quiz, index) => (
                    <AdminQuizItem key={index} quiz={quiz} withButtons={true}  />
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <Button onClick={() => navigate(ROUTES.adminAddQuizPage)} className="bg-blue-500 hover:bg-blue-600">
                    Ajouter un quiz
                </Button>
            </div>
        </div>
    );
}

export default AdminHomeQuiz