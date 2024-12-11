
export const userAccessToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken !== "undefined" ? JSON.parse(accessToken) : null;
  };
  
  export const fetchUser = () => {
    const userInfo = localStorage.getItem("users");
    return userInfo !== "undefined" ? JSON.parse(userInfo) : null;
  };
  