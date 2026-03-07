import { useSelector } from 'react-redux';
import Image from 'next/image'

import { RootState } from '../store';
import { selectTotalBRL } from '../utils/calcExpense';
import { useAppDispatch} from "@/store/hooks";
import { logout } from "@/store/authSlice";
import { useNavigate } from 'react-router-dom';

function Header() {
  const user = useSelector((state: RootState) => state.auth.user);
  const wallet = useSelector((state: RootState) => state.wallet);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log('User:', user);
  console.log('Wallet:', wallet);

  const total = useSelector(selectTotalBRL);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="App-header">
      <Image src="/carteira.png" alt="logo" width={100} height={100} />
      <p className="email" data-testid="email-field">
        Email:
        {' '}
        {user?.email}
      </p>
      <p className="total" data-testid="total-field">
        Total Gasto:
        {' '}
        {total.toFixed(2)}
      </p>
      <p className="currency" data-testid="header-currency-field">BRL</p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;
