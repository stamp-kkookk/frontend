/**
 * CustomerLayout
 * 고객 PWA 라우트용 레이아웃 래퍼
 */

import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { MobileFrame } from '@/components/layout/MobileFrame';
import { useAuth } from '@/app/providers/AuthProvider';

export function CustomerLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = (screen: string) => {
    setIsMenuOpen(false);
    switch (screen) {
      case 'history':
        navigate('/customer/history');
        break;
      case 'rewardBox':
        navigate('/customer/redeems');
        break;
      case 'migrationList':
        navigate('/customer/migrations');
        break;
      case 'settings':
        navigate('/customer/settings');
        break;
      default:
        navigate('/customer/wallet');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <MobileFrame
      isMenuOpen={isMenuOpen}
      onMenuClose={() => setIsMenuOpen(false)}
      onMenuItemClick={handleMenuItemClick}
      onLogout={handleLogout}
    >
      <Outlet context={{ setIsMenuOpen }} />
    </MobileFrame>
  );
}

export default CustomerLayout;
