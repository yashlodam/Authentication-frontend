import { create } from "zustand";

const LOCAL_KEY = "auth_app";

// ─────────────────────────────────────────────
// Load Persisted Auth
// ─────────────────────────────────────────────

const getStoredAuth = () => {

  try {

    const raw =
      localStorage.getItem(LOCAL_KEY);

    if (raw) {

      const {
        accessToken,
        user
      } = JSON.parse(raw);

      if (accessToken) {

        return {
          accessToken,
          user,
          authStatus: true,
        };
      }
    }

  } catch {

    localStorage.removeItem(LOCAL_KEY);
  }

  return {
    accessToken: null,
    user: null,
    authStatus: false,
  };
};

// ─────────────────────────────────────────────
// Zustand Store
// ─────────────────────────────────────────────

const useAuthStore = create((set, get) => ({

  // State
  accessToken: null,
  user: null,
  authStatus: false,

  // Rehydrate
  ...getStoredAuth(),

  // ─────────────────────────────────────────
  // Login
  // ─────────────────────────────────────────

  login: ({ accessToken, user }) => {

    localStorage.setItem(
      LOCAL_KEY,
      JSON.stringify({
        accessToken,
        user,
      })
    );

    set({
      accessToken,
      user,
      authStatus: true,
    });
  },

  // ─────────────────────────────────────────
  // Logout
  // ─────────────────────────────────────────

  logout: () => {

    localStorage.removeItem(LOCAL_KEY);

    set({
      accessToken: null,
      user: null,
      authStatus: false,
    });
  },

  // ─────────────────────────────────────────
  // Update User
  // ─────────────────────────────────────────

  updateUser: (fields) => {

    const currentUser = get().user;

    const updatedUser = {
      ...currentUser,
      ...fields,
    };

    const token =
      get().accessToken;

    localStorage.setItem(
      LOCAL_KEY,
      JSON.stringify({
        accessToken: token,
        user: updatedUser,
      })
    );

    set({
      user: updatedUser,
    });
  },
}));

export default useAuthStore;