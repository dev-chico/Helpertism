import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedPaths } from "../constants/paths";
import { PageLoading } from "../components/PageLoading";

const Home = lazy(() =>
  import("../pages/AuthenticatedPages/Home").then(({ Home }) => ({
    default: Home,
  }))
);

const Profile = lazy(() =>
  import("../pages/AuthenticatedPages/Profile").then(({ Profile }) => ({
    default: Profile,
  }))
);

const Posts = lazy(() =>
  import("../pages/AuthenticatedPages/Posts/Home").then(({ Posts }) => ({
    default: Posts,
  }))
);

const CreatePost = lazy(() =>
  import("../pages/AuthenticatedPages/Posts/CreatePost").then(
    ({ CreatePost }) => ({
      default: CreatePost,
    })
  )
);

const ReadPost = lazy(() =>
  import("../pages/AuthenticatedPages/Posts/ReadPost").then(({ ReadPost }) => ({
    default: ReadPost,
  }))
);

const CreateGame = lazy(() =>
  import("../pages/AuthenticatedPages/Games/CreateGame").then(
    ({ CreateGame }) => ({
      default: CreateGame,
    })
  )
);

const Play = lazy(() =>
  import("../pages/AuthenticatedPages/Games/Play").then(({ Play }) => ({
    default: Play,
  }))
);

const Tasks = lazy(() =>
  import("../pages/AuthenticatedPages/Tasks").then(({ Tasks }) => ({
    default: Tasks,
  }))
);

const NotFound = lazy(() =>
  import("../pages/NotFound").then(({ NotFound }) => ({
    default: NotFound,
  }))
);

export const AuthenticatedRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* Home */}
        <Route path={AuthenticatedPaths.home} element={<Home />} />
        <Route path={AuthenticatedPaths.profile} element={<Profile />} />
        <Route path={AuthenticatedPaths.posts.home} element={<Posts />} />
        <Route
          path={AuthenticatedPaths.games.create}
          element={<CreateGame />}
        />
        <Route
          path={`${AuthenticatedPaths.games.edit}/:id`}
          element={<CreateGame />}
        />
        <Route
          path={`${AuthenticatedPaths.games.play}/:id`}
          element={<Play />}
        />
        <Route
          path={AuthenticatedPaths.posts.create}
          element={<CreatePost />}
        />
        <Route
          path={`${AuthenticatedPaths.posts.edit}/:id`}
          element={<CreatePost />}
        />
        <Route
          path={`${AuthenticatedPaths.posts.read}/:id`}
          element={<ReadPost />}
        />
        <Route path={`${AuthenticatedPaths.activities}`} element={<Tasks />} />
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
