import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../logic/utils/constants';

function ClientLayout() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold cursor-pointer"
            onClick={() => navigate(ROUTES.clientHomePage)}
        >
          Kidiquiz
        </div>

        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden md:block text-sm">
            Bonjour, nouvel utilisateur
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

export default ClientLayout