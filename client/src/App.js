import './App.css';
// import { invoke } from '@tauri-apps/api';
import HomePage from './Views/homePage';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
function App() {

  const views = [
    {
      path:'/',
      name:'Home',
      exact: true,
      component: HomePage
    },
  ]
  return (
    <BrowserRouter className="App">
      <Routes>
        {views.map((view,index)=><Route key={index} exact={view.exact} path={view.path} Component={view.component} />)}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
