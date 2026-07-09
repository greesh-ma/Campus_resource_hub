import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeToken } from '../utils/auth';

function Navbar() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav>
      <div className="container">
        <div className="nav-logo">Campus Hub</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {user ? (
            <>
              <li><Link to="/add-resource">Add Resource</Link></li>
              <li><span>{user.name}</span></li>
              <li><button className="secondary small" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
