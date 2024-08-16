import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../logic/utils/constants';

function AdminLayout() {

  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold cursor-pointer"
            onClick={() => navigate(ROUTES.adminHomePage)}
        >
          Kidiquiz
        </div>

        <div className="hidden md:flex space-x-8">
          <div
            className="cursor-pointer hover:text-blue-400"
            onClick={() => navigate(ROUTES.adminHomeQuestions)}
          >
            Questions
          </div>
          <div
            className="cursor-pointer hover:text-blue-400"
            onClick={() => navigate(ROUTES.adminHomeQuiz)}
          >
            Quiz
          </div>
          <div
            className="cursor-pointer hover:text-blue-400"
            // onClick={() => navigate(ROUTES.adminHomeQuestions)}
          >
            Compétitions
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden md:block text-sm">
            Bonjour, Admin
          </div>
        </div>
      </div>

      <div className="md:hidden flex justify-between items-center px-4 py-2">
        <div className="text-sm">Bonjour, Admin</div>
        <div className="flex space-x-4">
          <div
            className="cursor-pointer hover:text-blue-400 text-sm"
            onClick={() => navigate('/admin/questionHome')}
          >
            Questions
          </div>
          <div
            className="cursor-pointer hover:text-blue-400 text-sm"
            onClick={() => navigate('/admin/quizHome')}
          >
            Quiz
          </div>
          <div
            className="cursor-pointer hover:text-blue-400 text-sm"
            onClick={() => navigate('/admin/contestHome')}
          >
            Compétitions
          </div>
        </div>
      </div>
    </nav>

    <div className="flex-grow">
      <Outlet />
    </div>

    <footer className="bg-gray-800 text-white text-center py-4">
      powered by Jamal Sidikou
    </footer>
  </div>
  )
}

export default AdminLayout