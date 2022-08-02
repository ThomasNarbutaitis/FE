import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import Container from './Container';
import css from './UI.module.css';

function ProtectedRoute(props) {
  const { isUserLoggedIn } = useAuthCtx();
  const { children, ...rest } = props;
  return (
    <Route {...rest}>
      {isUserLoggedIn ? (
        children
      ) : (
        <Container>
          <div className={css.alert}>You have to login first!</div>
          <Link className={css.link} to={'/login'}>
            login here
          </Link>
        </Container>
      )}
    </Route>
  );
}

export default ProtectedRoute;
