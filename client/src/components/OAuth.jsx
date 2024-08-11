import { useDispatch } from "react-redux";
import { Button } from "flowbite-react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../utility/firebase.js";
import { signInSuccess } from "../redux/user/userSlice.js";

// This component handles Google OAuth sign-in.
function OAuth({ onSuccess }) {
  const dispatch = useDispatch();

  const handleGoogleOAuth = async () => {
    try {
      // Set up the Google sign-in provider and auth instance.
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Open the Google sign-in popup.
      const result = await signInWithPopup(auth, provider);

      // Send the user info to our backend API.
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

      // Get the response data and update the Redux store.
      const data = await res.json();
      dispatch(signInSuccess(data));

      // Call the onSuccess callback if it's provided.
      if (onSuccess) onSuccess();
    } catch (error) {
      // Handle any errors.
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
