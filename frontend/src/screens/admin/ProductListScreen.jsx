import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { listProducts, deleteProduct, createProduct } from '../../redux/slices/productSlice';

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error, successCreate } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    if (successCreate) {
      navigate('/admin/products');
      dispatch(listProducts());
    }
  }, [successCreate, navigate, dispatch]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button onClick={createProductHandler} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Create Product
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">NAME</th>
                <th className="p-3 text-left">PRICE</th>
                <th className="p-3 text-left">STOCK</th>
                <th className="p-3 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm">{product._id.substring(0, 8)}...</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">₹{product.price}</td>
                  <td className={`p-3 font-bold ${product.countInStock === 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {product.countInStock}
                  </td>
                  <td className="p-3 flex gap-2">
                    <Link to={`/admin/product/${product._id}/edit`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Edit
                    </Link>
                    <button onClick={() => deleteHandler(product._id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductListScreen;