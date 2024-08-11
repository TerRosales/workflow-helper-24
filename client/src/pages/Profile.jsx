// Import necessary components and icons
import { Table, Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { truncateText } from "../utility/utils";
import { signOut } from "../redux/user/userSlice";
import { ImExit } from "react-icons/im";
import { PiIdentificationBadgeLight } from "react-icons/pi";

function Profile() {
  // Get the current user's information from the Redux store
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch(); // Set up the dispatch function to handle actions

  // Handle the sign-out process
  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout"); // Make a request to sign out the user
      dispatch(signOut()); // Dispatch the signOut action to update the store
    } catch (error) {
      console.log(error); // Log any errors that occur during the sign-out process
    }
  };

  // Render the profile page layout
  return (
    <div className="h-auto overflow-auto flex flex-col max-w-2xl p-2 py-5 mx-auto justify-center mb-15">
      {/* Profile Header with Icon */}
      <section className="flex items-center gap-2m">
        <span className="w-full h-1 border-2 border-neutral-900" />
        <PiIdentificationBadgeLight className="text-[52px]" />
        <span className="w-full h-1 border-2 border-neutral-900" />
      </section>
      <h1 className="text-4xl text-center my-5">Profile</h1>

      {/* Profile Image */}
      <section className="mx-auto mt-2">
        <img
          src={currentUser.employeeImg}
          alt="profile"
          className="h-24 w-24 self-center rounded-xl bg-neutral-100 object-cover mt-2"
        />
      </section>

      {/* User Details Table */}
      <Table className="bg-neutral-50 shadow-md my-5 text-sm items-center">
        <Table.Body>
          <Table.Row>
            <Table.Cell>Username:</Table.Cell>
            <Table.Cell>{truncateText(currentUser.username, 7)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Email:</Table.Cell>
            <Table.Cell>{truncateText(currentUser.email, 7)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Employee ID:</Table.Cell>
            <Table.Cell>{currentUser.employeeId}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Department:</Table.Cell>
            <Table.Cell>{currentUser.department}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Qualifications:</Table.Cell>
            <Table.Cell>{currentUser.qualification}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      {/* Buttons for Updating Profile and Signing Out */}
      <section className="flex justify-between my-5 mx-2">
        <Button className="buttonUni my-5 bg-neutral-950">
          <Link to="edit-profile">Update Profile</Link>{" "}
          {/* Button to navigate to edit profile */}
        </Button>
        <Button
          className="buttonUni my-5 bg-neutral-950"
          onClick={handleSignOut} // Sign-out button triggers the handleSignOut function
        >
          <ImExit className="flex text-center translate-y-1 pl-2 text-3xl" />{" "}
          {/* Sign-out icon */}
        </Button>
      </section>
    </div>
  );
}

export default Profile;
