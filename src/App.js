import './App.css';
import ProductPage from './features/product-page/ProductPage';
import {fetchProductDataAsync} from './features/product-page/productPageSlice';
import {useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  dispatch(fetchProductDataAsync())

  return (
    <>
      <ProductPage></ProductPage>
    </>
  );
}

export default App;
