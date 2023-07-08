import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login'
import Welcome from './features/auth/Welcome';
import RequireAuth from './features/auth/RequireAuth'
import UsersList from './features/users/UsersList';
import Register from './features/register/Register';
import RequireApproved from './features/auth/RequireApproved'
import AddOfficer from './components/AddOfficer';
import EditOfficer from './components/EditOfficer';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* публичные роутеры для неавторизированных пользователей */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        {/* публичные роутеры для авторизированных пользователей element={<RequireAuth/>} обязательно 
        внутри этого вставлять всё остальное что должно быть защищено */}
        <Route element={<RequireAuth />}>
          <Route path='welcome' element={<Welcome />} />
          {/* <Route path='userslist' element={<UsersList />} /> */}
        </Route>
        <Route element={<RequireApproved />}>
          <Route path='userslist' element={<UsersList />} />
          <Route path='addofficer' element={<AddOfficer/>} />
          <Route path='editofficer' element={<EditOfficer/>} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
