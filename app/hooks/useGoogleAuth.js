import { useState, useEffect } from "react";

const useGoogleAuth = (clientId) => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if we're returning from OAuth redirect
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");

      if (token) {
        // Fetch user info with the access token
        fetchUserInfo(token);
        // Clean up the URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      }
    }
    setIsInitialized(true);
  }, []);

  const fetchUserInfo = async (accessToken) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const userData = await response.json();
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        imageUrl: userData.picture,
        accessToken,
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const signIn = () => {
    const redirectUri = encodeURIComponent(`${window.location.origin}/login`);
    const scope = encodeURIComponent(
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    );
    const responseType = "token";

    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `scope=${scope}&` +
      `response_type=${responseType}&` +
      `include_granted_scopes=true&` +
      `state=pass-through-value`;

    window.location.href = authUrl;
  };

  const signOut = () => {
    setUser(null);
    // Revoke the token if needed
    if (user?.accessToken) {
      fetch(`https://oauth2.googleapis.com/revoke?token=${user.accessToken}`, {
        method: "POST",
      }).catch(console.error);
    }
  };

  return {
    signIn,
    signOut,
    user,
    isInitialized,
  };
};

export default useGoogleAuth;
