import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { clearCart } from '../redux/slices/cartSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors">
          E-<span className="text-indigo-600">Shop</span>
        </Link>

        <nav className="flex gap-6 items-center">
          <Link to="/cart" className="relative text-slate-600 hover:text-indigo-600 transition-colors font-medium flex items-center gap-1">
            🛒 Cart 
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-500 hidden md:block">
                Hello, <span className="text-slate-800 font-semibold">{userInfo.name}</span>
              </span>
              
              {/* ADDED PROFILE LINK HERE */}
              <Link to="/profile" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                Profile
              </Link>
              {/* END PROFILE LINK */}

              {userInfo.isAdmin && (
                <Link to="/admin/dashboard" className="text-xs font-bold text-indigo-700 bg-indigo-100 px-3 py-1.5 rounded-full hover:bg-indigo-200 transition-colors uppercase tracking-wide">
                  Admin Panel
                </Link>
              )}
              <button onClick={logoutHandler} className="text-sm font-medium text-slate-600 hover:text-rose-600 transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;