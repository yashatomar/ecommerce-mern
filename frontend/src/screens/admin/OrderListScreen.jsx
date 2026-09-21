import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrders, deliverOrder } from '../../redux/slices/adminOrderSlice';

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  const deliverHandler = (id) => {
    dispatch(deliverOrder(id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-left">ORDER ID</th>
                <th className="p-3 text-left">USER</th>
                <th className="p-3 text-left">DATE</th>
                <th className="p-3 text-left">TOTAL</th>
                <th className="p-3 text-left">PAID</th>
                <th className="p-3 text-left">DELIVERED</th>
                <th className="p-3 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm">{order._id.substring(0, 8)}...</td>
                  <td className="p-3">{order.user ? order.user.name : 'Deleted User'}</td>
                  <td className="p-3 text-sm">{order.createdAt.substring(0, 10)}</td>
                  <td className="p-3">₹{order.totalPrice}</td>
                  <td className="p-3">
                    {order.isPaid ? (
                      <span className="text-green-600 text-sm">{order.paidAt.substring(0, 10)}</span>
                    ) : (
                      <span className="text-red-600 text-sm">✗ Not Paid</span>
                    )}
                  </td>
                  <td className="p-3">
                    {order.isDelivered ? (
                      <span className="text-green-600 text-sm">✓ Delivered</span>
                    ) : (
                      <span className="text-yellow-600 text-sm">Pending</span>
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    <Link to={`/order/${order._id}`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Details
                    </Link>
                    {!order.isDelivered && (
                      <button onClick={() => deliverHandler(order._id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                        Mark Delivered
                      </button>
                    )}
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

export default OrderListScreen;