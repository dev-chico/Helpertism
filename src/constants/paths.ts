export const AuthenticatedPaths = {
  home: "/",
  activities: "/atividades",
  profile: "/perfil",
  games: {
    create: "/jogos/criar",
    edit: "/jogos/editar/:id",
    play: "/jogos/:id",
  },
  posts: {
    home: "/posts",
    create: "/posts/criar",
    edit: "/posts/editar/:id",
    read: "/posts/:id",
  },
};

export const UnauthenticatedPaths = {
  login: "/",
  register: "/register",
};
