import { useState } from "react";

import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { checkUserLoggedIn } from "./reducers/userReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const [cssClass, setCssClass] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(checkUserLoggedIn());
  }, [dispatch]);

  return (
    <div>
      {user === null && (
        <LoginForm cssClass={cssClass} setCssClass={setCssClass} />
      )}

      {user !== null && (
        <BlogForm cssClass={cssClass} setCssClass={setCssClass} />
      )}
    </div>
  );
};

export default App;
