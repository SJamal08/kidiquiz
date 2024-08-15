import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ClientLayout from './components/layouts/ClientLayout'
import AdminLayout from './components/layouts/AdminLayout'
import ClientHomePage from './pages/client/ClientHomePage'
import AdminHomePage from './pages/admin/AdminHomePage'
import AdminHomeQuestionPage from './pages/admin/AdminHomeQuestionPage'
import AdminHomeQuiz from './pages/admin/AdminHomeQuiz'
import { ROUTES } from './logic/utils/constants'

function AppRouter() {
  return (
    <Routes>
      {/* Routes pour l'administration */}
        <Route path={ROUTES.adminHomePage} element={<AdminLayout />}>
          <Route path={ROUTES.adminHomePage} element={<AdminHomePage />} />
          <Route path={ROUTES.adminHomeQuestions} element={<AdminHomeQuestionPage />} />
          <Route path={ROUTES.adminHomeQuiz} element={<AdminHomeQuiz />} />
      </Route>

      {/* Routes pour les clients */}
      <Route path={ROUTES.clientHomePage} element={<ClientLayout />}>
        <Route path={ROUTES.clientHomePage} element={<ClientHomePage />} />
      </Route>

    </Routes>
  );
}

export default AppRouter;
