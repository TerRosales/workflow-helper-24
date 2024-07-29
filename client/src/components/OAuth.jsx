import { useDispatch } from "react-redux";
import { Button } from "flowbite-react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { signInSuccess } from "../redux/user/userSlice.js";

function OAuth({ onSuccess }) {
  const dispatch = useDispatch();
  const handleGoogleOAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
          }),
        }
      );
      const data = await res.json();
      dispatch(signInSuccess(data));
      if (onSuccess) onSuccess();
    } catch (error) {
      console.log("Failed to authenticate with Google", error);
    }
  };
  return (
    <div>
      <Button
        onClick={handleGoogleOAuth}
        type="button"
        className="my-7 self-center OAuth"
      >
        OAuth
      </Button>
    </div>
  );
}

export default OAuth;
