import React from "react";
import logo from "../../assets/webcastle.png";
import { Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../../features/userSlice/authSlice";
import { selectCartCount } from "../../features/cartSlice/cartSlice";
import toast from "react-hot-toast";

function Navbar() {
  const user = useSelector(selectUser);
  const count = useSelector(selectCartCount);
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleLogout = () => {
    dispatch(logout());
    toast.success(`You have logged out successfully!`);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
      <Link to="/">
        <img  src={logo} className="w-36 h-full ml-10" alt="Web Castle Logo" />
        </Link>
      </div>
      <div className="navbar-center">
        <Link to="/" className="mr-10 text-lg font-medium text-base-content">
          Home
        </Link>
        <Link
          to="/products"
          className="mr-10 text-lg font-medium text-base-content"
        >
          Products
        </Link>
      </div>
      <div className="flex-none">
        {user && user?.userName ? (
          <>
            <div className="dropdown dropdown-end mr-5">
              <Link to="/cart" className="">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm bg-red-600 indicator-item">
                      {!count ? 0 : count}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="dropdown dropdown-end mr-10">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {user && (
                  <li className="text-lg">
                  <h1 className="font-bold text-xl">{user?.userName}</h1>
                </li>
                )}
               
                <li>
                  <a
                    className="text-red-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-outline btn-info mx-5">Login</button>
            </Link>

            <Link to="/register">
              <button className="btn btn-outline btn-info mr-5"> Signup </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
