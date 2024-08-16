import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ClientLayout from './components/layouts/ClientLayout'
import AdminLayout from './components/layouts/AdminLayout'
import ClientHomePage from './pages/client/ClientHomePage'
import AdminHomePage from './pages/admin/AdminHomePage'
import AdminHomeQuestionPage from './pages/admin/AdminHomeQuestionPage'
import AdminHomeQuiz from './pages/admin/AdminHomeQuiz'
import { ROUTES } from './logic/utils/constants'
import AdminAddQuizPage from './pages/admin/AdminAddQuizPage'
import ClientDoContest from './pages/client/ClientDoContest'
import ClientContestResume from './pages/client/ClientContestResume'

function AppRouter() {
  return (
    <Routes>
      {/* Routes pour l'administration */}
        <Route path={ROUTES.adminHomePage} element={<AdminLayout />}>
          <Route path={ROUTES.adminHomePage} element={<AdminHomePage />} />
          <Route path={ROUTES.adminHomeQuestions} element={<AdminHomeQuestionPage />} />
          <Route path={ROUTES.adminHomeQuiz} element={<AdminHomeQuiz />} />
          <Route path={ROUTES.adminAddQuizPage} element={<AdminAddQuizPage />} />
      </Route>

      {/* Routes pour les clients */}
      <Route path={ROUTES.clientHomePage} element={<ClientLayout />}>
        <Route path={ROUTES.clientHomePage} element={<ClientHomePage />} />
        <Route path={`${ROUTES.clientDoContest}/:id`} element={<ClientDoContest />} />
        <Route path={`${ROUTES.clientContestResume}/:id`} element={<ClientContestResume />} />

      </Route>

    </Routes>
  );
}

export default AppRouter;
