import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayOut from "./components/RootLayOut";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import PostDetail, { loader as postLoader } from "./pages/PostDetail";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootLayOut />,
    children: [
      { index: true, element: <Feed /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/product/:productId",
        element: <PostDetail />,
        loader: postLoader
      }
    ]
  }
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
