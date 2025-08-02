import {Route, Routes} from 'react-router'
import {DashboardPage, MentorsPage, StudentsPage, CreditsPage} from '@/components/pages'

export const AppRouter = () => (
  <Routes>
    <Route path="/">
      <Route index Component={DashboardPage} />
      <Route path="mentors" Component={MentorsPage} />
      <Route path="students" Component={StudentsPage} />
      <Route path="credits" Component={CreditsPage} />
    </Route>
  </Routes>
)
