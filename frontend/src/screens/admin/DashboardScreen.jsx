import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/slices/productSlice';
import { listOrders } from '../../redux/slices/adminOrderSlice';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(listProducts());
    dispatch(listOrders());
  }, [dispatch]);

  const totalRevenue = orders.reduce((acc, o) => acc + (o.isPaid ? o.totalPrice : 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => !o.isDelivered).length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-600 text-white p-6 rounded shadow">
          <h3 className="text-sm uppercase">Total Revenue</h3>
          <p className="text-3xl font-bold">₹{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded shadow">
          <h3 className="text-sm uppercase">Total Orders</h3>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded shadow">
          <h3 className="text-sm uppercase">Pending Orders</h3>
          <p className="text-3xl font-bold">{pendingOrders}</p>
        </div>
        <div className="bg-purple-600 text-white p-6 rounded shadow">
          <h3 className="text-sm uppercase">Total Products</h3>
          <p className="text-3xl font-bold">{products.length}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;