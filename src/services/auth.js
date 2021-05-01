import { auth, provider } from "../firebase";

const signInWithGoogle = async () => {
  let user;
  let response = await auth.signInWithPopup(provider);
  user = response.user;
  return user;
};

const signOut = () => {
  auth.signOut();
};

export { signInWithGoogle, signOut };
