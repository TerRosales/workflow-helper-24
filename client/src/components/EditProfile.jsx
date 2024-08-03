import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";
import { Button, Alert, FloatingLabel } from "flowbite-react";
import { HiCamera } from "react-icons/hi";

function EditProfile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  const { currentUser, loading, error } = useSelector((state) => state.user);

  // Initialize formData with current user details
  const [formData, setFormData] = useState({
    username: currentUser.username || "",
    email: currentUser.email || "",
    password: "",
  });

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validatePassword(formData.password, e.target.value);
  };

  const validatePassword = (password, confirmPassword) => {
    const errors = [];
    const regexUppercase = /(?=.*[A-Z])/;
    const regexLowercase = /(?=.*[a-z])/;
    const regexNumber = /(?=.*\d)/;
    const regexSpecialChar = /(?=.*[!@#$%^&*])/;

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!regexUppercase.test(password)) {
      errors.push("Password must contain at least 1 uppercase letter.");
    }
    if (!regexLowercase.test(password)) {
      errors.push("Password must contain at least 1 lowercase letter.");
    }
    if (!regexNumber.test(password)) {
      errors.push("Password must contain at least 1 number.");
    }
    if (!regexSpecialChar.test(password)) {
      errors.push(
        "Password must contain at least 1 special character (!@#$%^&*)."
      );
    }
    if (password !== confirmPassword) {
      errors.push("Passwords do not match.");
    }
    setErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, employeeImg: downloadURL })
        );
      }
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto ">
      <h1 className="text-4xl text-center my-5">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-neutral-100 p-4 rounded-lg shadow-lg shadow-neutral-300 border-b-2 border-neutral-400"
      >
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {/* 
    firebase storage rules:  
    allow read;
    allow write: if
    request.resource.size < 2 * 1024 * 1024 &&
    request.resource.contentType.matches('image/.*') */}
        <section className="flex mx-auto group relative">
          <section
            className="flex flex-col text-blue-600"
            onClick={() => fileRef.current.click()}
          >
            <img
              src={formData.employeeImg || currentUser.employeeImg}
              alt="profile"
              className="h-24 w-24 self-center cursor-pointer rounded-xl bg-neutral-100 object-cover mt-2 border-2 border-neutral-400"
            />
            <HiCamera className="uploadImg" />
          </section>
        </section>
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <FloatingLabel
          variant="standard"
          type="text"
          id="username"
          label="Username"
          value={formData.username} // Use formData for value
          onChange={handleChange}
        />
        <FloatingLabel
          variant="standard"
          type="email"
          id="email"
          label="Email"
          value={formData.email} // Use formData for value
          onChange={handleChange}
        />
        <FloatingLabel
          variant="standard"
          type="password"
          id="password"
          label="Password"
          onChange={handleChange}
        />
        <FloatingLabel
          variant="standard"
          type="password"
          id="confirmPassword"
          label="Confirm Password"
          onChange={handleConfirmPasswordChange}
        />
        {errors.length > 0 && (
          <section>
            <div className="flex flex-col gap-2">
              {errors.map((error, index) => (
                <Alert className="p-2" key={index} color="failure">
                  {error}
                </Alert>
              ))}
            </div>
          </section>
        )}
        {success && (
          <Alert className="p-2" color="success">
            {success}
          </Alert>
        )}
        <Alert color="success" className="mt-2">
          If you wish to keep your password as it is just simply
          <b> leave the fields blank</b>.
        </Alert>
        <Alert color="yellow">
          Please <b>do not share</b> your password with anyone
        </Alert>
        <Button className="buttonUni mx-auto my-3 mb-6">
          {loading ? "Loading..." : "Update"}
        </Button>
      </form>
    </div>
  );
}

export default EditProfile;
