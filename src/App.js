import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login'
import Welcome from './features/auth/Welcome';
import RequireAuth from './features/auth/RequireAuth'
import UsersList from './features/users/UsersList';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* публичные роутеры для неавторизированных пользователей */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        {/* <Route path='welcome' element={<Welcome />} /> */}

        {/* публичные роутеры для авторизированных пользователей element={<RequireAuth/>} обязательно 
        внутри этого вставлять всё остальное что должно быть защищено */}
        <Route element={<RequireAuth />}>
          <Route path='welcome' element={<Welcome />} />
          <Route path='userslist' element={<UsersList />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
