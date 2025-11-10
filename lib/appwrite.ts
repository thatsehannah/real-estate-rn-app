import { createURL } from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";

export const config = {
  platform: "com.thatsehannah.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

//defining functions used from Appwrite
export const avatar = new Avatars(client);
export const account = new Account(client);

export const login = async () => {
  try {
    //generate a redirect ui to handle the OAuth response
    const redirectUri = createURL("/");

    //requesting an OAuth token from Appwrite using Goolge Provider
    const response = await account.createOAuth2Token({
      provider: OAuthProvider.Google,
      success: redirectUri,
    });

    if (!response)
      throw new Error("Failed to login - couldn't create OAuth token");

    //if token is generated, creating web browser session for OAuth process to continue
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== "success")
      throw new Error("Failed to login - browser session failed");

    //extracting query params
    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId)
      throw new Error("Failed to login - secret or userId doesn't exist");

    const session = await account.createSession(userId, secret);

    if (!session) throw new Error("Failed to create a session");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession({
      sessionId: "current",
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getUser = async () => {
  try {
    const response = await account.get();

    if (response.$id) {
      //form a new user avatar (generate an image using the user's initials)
      const userAvatar = avatar.getInitials({
        name: response.name,
      });

      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
