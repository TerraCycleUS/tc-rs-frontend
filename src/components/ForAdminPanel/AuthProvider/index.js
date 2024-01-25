import { setUser } from "../../../actions/user";
import store from "../../../store";
import http from "../../../utils/http";
import isStageUrl from "../../../utils/checkEnv/isStageUrl";

export default {
  // send username and password to the auth server and get back credentials
  login: async ({ password, verificationCode, email }) => {
    const data = { email, password };
    if (verificationCode) data.verificationCode = verificationCode;
    try {
      const res = await http.post("/api/auth/login", data);
      store.dispatch(setUser({ ...res.data, role: "ADMIN" }));
      const uAreOnStage = isStageUrl(window.location.origin);
      const isFirstAdmin = res.data.id === 316;
      if (uAreOnStage && isFirstAdmin) return { redirectTo: "/admin" };
      if (res.data.role === "USER")
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({ message: "Access denied" });
      if (res.data.isTwoFaEnabled === false)
        return { redirectTo: "/admin/setup-two-factor" };
      return Promise.resolve();
    } catch (error) {
      if (error.response.data.errorCode === "twoFaValidationCodeFail") {
        throw new Error("twoFaValidationCodeFail", {
          cause: error.response?.data?.errors?.join(""),
        });
      }
      throw new Error(error.response?.data?.errors?.join(""));
    }
  },

  checkError: (error) => {
    const { status } = error;
    if (status === 401 || status === 403) {
      store.dispatch(setUser(null));
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    const { user } = store.getState();
    return user?.role === "ADMIN" ? Promise.resolve() : Promise.reject();
  },

  logout: async () => {
    try {
      await http.post("/api/auth/logout");
      store.dispatch(setUser(null));
      return Promise.resolve();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("error", error);
      return Promise.resolve();
    }
  },

  getIdentity: () => {
    const { user } = store.getState();
    return user?.id
      ? Promise.resolve({
          id: user.id,
          name: user.name,
          role: user.role,
          email: user.email,
        })
      : Promise.reject();
  },

  // get the user permissions (optional)
  getPermissions: (e) => Promise.resolve(e),
};
