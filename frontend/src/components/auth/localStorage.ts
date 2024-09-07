import { Tokens } from "@saumyaborwankar/thera-notes-api";

export class LocalStorage {
  public static readonly accessToken = "accessToken";
  public static readonly refreshToken = "refreshToken";
  public static readonly expiresIn = "expiresIn";

  static setTokens(tokens: Tokens) {
    console.log("localstorage", tokens);
    localStorage.setItem(this.accessToken, tokens.accessToken);
    localStorage.setItem(this.refreshToken, tokens.refreshToken);
    //   localStorage.setItem(this.expiresIn, tokens.expiresIn.toString());
  }

  static logout() {
    localStorage.removeItem(this.accessToken);
    localStorage.removeItem(this.refreshToken);
    //   localStorage.removeItem(this.expiresIn);
  }

  static getTokens() {
    if (
      !localStorage.getItem(this.accessToken) ||
      !localStorage.getItem(this.refreshToken)
    ) {
      return {
        accessToken: "",
        refreshToken: "",
      };
    }
    return {
      accessToken: localStorage.getItem(this.accessToken),
      refreshToken: localStorage.getItem(this.refreshToken),
    };
  }

  static getAuthorizationHeaders() {
    const token = LocalStorage.getTokens();
    return {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    };
  }

  static getRefreshAuthorizationHeaders() {
    const token = LocalStorage.getTokens();
    return {
      headers: {
        Authorization: `Bearer ${token.refreshToken}`,
      },
    };
  }

  static async isLoggedIn(): Promise<boolean> {
    const accessToken = localStorage.getItem(this.accessToken);
    //   const expiresIn = localStorage.getItem(this.expiresIn);

    //   if (!accessToken || !expiresIn) {
    //     return false;
    //   }
    if (!accessToken) {
      return false;
    }

    // Check if token has expired
    //   const expirationDate = new Date(parseInt(expiresIn, 10));
    //   if (new Date() >= expirationDate) {
    //     this.logout();
    //     return false;
    //   }

    // Verify access token with backend
    //TODO: write with api
    try {
      const response = await fetch("/auth/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        return true;
      } else {
        this.logout();
        return false;
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      this.logout();
      return false;
    }
  }
}
