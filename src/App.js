import { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './redux/operations';
import { Switch, Route } from 'react-router-dom';

const ProductList = lazy(() =>
  import('./components/ProductList')
);

const ProductDetailsPage = lazy(() =>
  import('./components/ProductDetailsPage')
);

function App() {
  const dispatch = useDispatch();
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route exact path='/' component={ProductList} />
        <Route
          path='/:productId'
          component={ProductDetailsPage}
        />
      </Switch>
    </Suspense>
  );
}

export default App;
