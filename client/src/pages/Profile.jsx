import { Table, Button, Alert } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  const truncateText = (username) => {
    return username.length > 9 ? username.substring(0, 9) + "..." : username;
  };
  return (
    <div className="flex flex-col max-w-2xl p-4 py-5 h-auto mx-auto justify-center">
      <h1 className="text-5xl text-center mt-10 mb-5">Profile</h1>
      <Table className="bg-neutral-50 shadow-md my-5 text-lg items-center">
        <Table.Body>
          <Table.Head className="bg-neutral-100">
            <img
              src={currentUser.employeeImg}
              alt="Account Picture"
              className="mx-auto rounded-full w-32 h-32"
            />
          </Table.Head>
          <Table.Row>
            <Table.Cell>Username:</Table.Cell>
            <Table.Cell>{truncateText(currentUser.username)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Email:</Table.Cell>
            <Table.Cell>{truncateText(currentUser.email)}</Table.Cell>
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
      <Alert color="success" className="mt-16">
        Please do not share your <b>password</b> with anyone
      </Alert>
      <section className="flex justify-between my-5">
        <Button className="buttonUni my-5 bg-neutral-950">
          <Link to="edit-profile">Update Profile</Link>
        </Button>
        <Button className="buttonUni my-5 bg-neutral-950">
          Delete Profile
        </Button>
      </section>
    </div>
  );
}

export default Profile;
