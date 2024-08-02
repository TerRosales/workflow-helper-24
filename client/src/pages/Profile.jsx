import { Table, Button, Alert } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { HiAnnotation, HiBell } from "react-icons/hi";
import { truncateText } from "../utils";
import { signOut } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { ImExit } from "react-icons/im";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col max-w-2xl p-4 py-5 h-auto mx-auto justify-center">
      <h1 className="text-5xl text-center mt-10 mb-5">Profile</h1>
      <section className="mx-auto">
        <img
          src={currentUser.employeeImg}
          alt="profile"
          className="h-24 w-24 self-center rounded-xl bg-neutral-100 object-cover mt-2"
        />
      </section>
      <Table className="bg-neutral-50 shadow-md my-5 text-lg items-center">
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
      <section className="flex justify-between my-5">
        <Button className="buttonUni my-5 bg-neutral-950">
          <Link to="edit-profile">Update Profile</Link>
        </Button>
        <Button
          className="buttonUni my-5 bg-neutral-950"
          onClick={handleSignOut}
        >
          <ImExit className="flex text-center translate-y-1 pl-2 text-3xl" />
        </Button>
      </section>
    </div>
  );
}

export default Profile;
