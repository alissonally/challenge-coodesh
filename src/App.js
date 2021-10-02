import 'bootstrap/dist/css/bootstrap.min.css'
import {GlobalStyle} from './components/GlobalStyle/styles'
import {Provider} from 'react-redux'
import store from './store'
import Home from './views/Home';
import Header from './components/Header';
const App = ()=>(
    <>
        <Provider store={store}>
            <GlobalStyle/>
            <Header/>
            <div className="content">
                <Home/>
            </div>
        </Provider>
    </>
)

export default App;
