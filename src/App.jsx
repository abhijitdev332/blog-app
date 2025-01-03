import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";

// lazy imports
const Home = lazy(() => import("./pages/home/Home"));
const PostPage = lazy(() => import("./pages/postPage/PostPage"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));
const AuthPage = lazy(() => import("./pages/auth/AuthPage"));
// imports
import { SinglePost } from "./components/components";
import {
  Loader,
  Login,
  PostTable,
  Register,
  UserTable,
  UserPostTable,
  ViewUser,
  SearchPost,
} from "./layout/layouts";
import { Dashbroad, Editor, ViewPost, EditPost } from "./layout/layouts";
import { UserProtected, ProtectedRoute } from "./utils/ProtectedRoute";
// styles
import "./app.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
const SuspenseLayout = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<SuspenseLayout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<Home />} />
      <Route path="/post" element={<PostPage />}>
        <Route path="search/:query" element={<SearchPost />} />
        <Route path=":id" element={<SinglePost />} />
      </Route>
      <Route path="/user/:userId" element={<ViewUser />} />

      <Route
        path="/auth"
        element={
          <UserProtected>
            <AuthPage />
          </UserProtected>
        }
      >
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route path="dash" element={<Dashbroad />} />
        <Route path="users" element={<UserTable />} />
        <Route index element={<PostTable />} />
        <Route path="user/post/:id" element={<UserPostTable />} />
        <Route path="addpost" element={<Editor />} />
        <Route path="viewPost/:id" element={<ViewPost />} />
        <Route path="editPost/:postId" element={<EditPost />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
