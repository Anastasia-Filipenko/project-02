export const selectIsLogged = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.user;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectIsLoadingAuth = state => state.auth.isLoading;

export const selectUserName = state => state.auth.user.name;

export const selectUserEmail = state => state.auth.user.email;

export const selectUserId = state => state.auth.user.userId;

export const selectUserAvatar = state => state.auth.user.avatar;

export const selectTheme = state => state.auth.user.theme;
