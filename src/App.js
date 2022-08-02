import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import ProtectedRoute from './components/UI/ProtectedRoute';
import AddAnswerPage from './pages/AddAnswerPage';
import AddQuestionPage from './pages/AddQuestionPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import QuestionAnsers from './pages/QuestionAnsers';
import RegisterPage from './pages/RegisterPage';
import UpdateAnswer from './pages/UpdateAnswer';
import UpdateQuestion from './pages/UpdateQuestion';

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>

        <ProtectedRoute path='/addQuestionPage'>
          <AddQuestionPage />
        </ProtectedRoute>

        <ProtectedRoute path='/question/:id/updateQuestion'>
          <UpdateQuestion />
        </ProtectedRoute>

        <ProtectedRoute path='/addAnswerPage/:id'>
          <AddAnswerPage />
        </ProtectedRoute>

        <ProtectedRoute path='/answer/:id/updateAnswer'>
          <UpdateAnswer />
        </ProtectedRoute>

        <Route path='/QuestionAnswer/:id'>
          <QuestionAnsers />
        </Route>

        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route path='*'>
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
