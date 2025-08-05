import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Layout} from '@/components/layouts'
import {App} from './app'
import './styles/global.css'
import {Provider} from 'react-redux'
import store from './app/store'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Layout>
        <App />
      </Layout>
      <ToastContainer />
    </Provider>
  </BrowserRouter>,
)
