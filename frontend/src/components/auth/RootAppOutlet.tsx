import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { validateAccessToken } from "../../store/slice/userSlice";
import Head from "../Head";

export const RootAppOutlet = () => {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!loggedIn) {
      // @ts-ignore: Argument of type 'AsyncThunkAction<boolean, void, AsyncThunkConfig>' is not assignable to parameter of type 'UnknownAction'.
      dispatch(validateAccessToken());
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [loggedIn]);

  return (
    <>
      {loading ? (
        <>loading</>
      ) : !loggedIn ? (
        <div className="w-screen h-screen">
          <Outlet key={location.pathname} />
        </div>
      ) : (
        <>Not logged In</>
      )}
    </>
  );
};
