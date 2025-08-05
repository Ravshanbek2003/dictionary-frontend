import {Route, Routes} from 'react-router'
import {DashboardPage, DepartmentPage, CategoryPage, WordPage, LoginPage} from '@/components/pages'

export const AppRouter = () => (
  <Routes>
    <Route path="login" Component={LoginPage} />
    <Route path="/">
      <Route index Component={DashboardPage} />
      <Route path="department" Component={DepartmentPage} />
      <Route path="category" Component={CategoryPage} />
      <Route path="word" Component={WordPage} />
    </Route>
  </Routes>
)
