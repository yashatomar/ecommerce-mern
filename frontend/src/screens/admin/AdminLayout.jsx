import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  return (
    <div className="flex mt-6 gap-6">
      <aside className="w-1/5 bg-white p-4 rounded shadow-md h-fit">
        <h2 className="text-lg font-bold mb-4 border-b pb-2">Admin Menu</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin/dashboard" className="hover:text-blue-600 py-2 border-b">📊 Dashboard</Link>
          <Link to="/admin/products" className="hover:text-blue-600 py-2 border-b">📦 Products</Link>
          <Link to="/admin/orders" className="hover:text-blue-600 py-2 border-b">🛒 Orders</Link>
        </nav>
      </aside>
      <div className="w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;