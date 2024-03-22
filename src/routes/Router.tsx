import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useUser from '../hooks/useUser';

const HomePage = lazy(() => import('../pages/HomePage'));
const FriendPage = lazy(() => import('../pages/FriendPage'));
const AlarmPage = lazy(() => import('../pages/AlarmPage'));
const MyPage = lazy(() => import('../pages/MyPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));

const Router = () => {

  const [user, setUser] = useUser()

  if(!user) return <div>대기중</div>

  return (
    <Suspense fallback={<>loading</>}>
      <Routes>
        <Route
          path="/home"
          element={<HomePage />}
        />
        <Route
          path="/profile/:id"
          element={<ProfilePage />}
        />
        <Route
          path="/friend"
          element={<FriendPage user={user}/>}
        />
        <Route
          path="/alarm"
          element={<AlarmPage  user={user}/>}
        />
        <Route
          path="/my"
          element={<MyPage />}
        />
        {/* <Route path="*" element={<PublicRoute component={} />} /> */}
      </Routes>
    </Suspense>
  );
};


export default Router;