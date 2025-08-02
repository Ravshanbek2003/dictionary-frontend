import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Layout} from '@/components/layouts'
import {App} from './app'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Layout>
      <App />
    </Layout>
  </BrowserRouter>,
)
