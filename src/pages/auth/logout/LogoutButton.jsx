import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/action/authActions';
import { LogOut } from 'lucide-react'; // Or any icon library you use

const LogoutButton = ({ logout, loading, className = '' }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 ${className}`}
    >
      <LogOut className="w-4 h-4" />
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = {
  logout,
};
const ConnectedLogout = connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
export default ConnectedLogout;
export { ConnectedLogout as Logout};

