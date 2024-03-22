import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage'));
const FriendPage = lazy(() => import('../pages/FriendPage'));
const AlarmPage = lazy(() => import('../pages/AlarmPage'));
const MyPage = lazy(() => import('../pages/MyPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));

const Router = () => {

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
          element={<FriendPage />}
        />
        <Route
          path="/alarm"
          element={<AlarmPage />}
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