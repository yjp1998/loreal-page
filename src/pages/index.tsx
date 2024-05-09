import { useState } from 'react';
import HomePage from './home';
import LoginPage from './login';

export default function Home() {
  const [curPage, setCurPage] = useState('login');
  return (
    <div>
      {curPage === 'login' && (
        <LoginPage
          goHome={() => {
            setCurPage('home');
          }}
        />
      )}
      {curPage === 'home' && (
        <HomePage
          logout={() => {
            setCurPage('login');
          }}
        />
      )}
    </div>
  );
}
