const publicRoutes = {
  signIn: '/login',
  signUp: '/signUp', 
  restorePassword: '/forgotpassword',
  terms: '/legal/terms',
  privacy: '/legal/privacy',
};

const privateRoutes = {
  profile: '/profile',
  leaderBoard: '/leaderboard',
  network: '/network',
};

export const AppRoutes = {publicRoutes, privateRoutes};