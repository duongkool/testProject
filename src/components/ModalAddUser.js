import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { createUser, editUser, deleteUser } from "../services/UserServices";
import { toast } from "react-toastify";

const ModalAddUser = (props) => {
  const {
    showModal,
    setShowModal,
    handleUpdateTable,
    showTable,
    dataUserEdit,
    handleEditUser,
    dataDeleteUser,
    handleEditUserFromModal,
    handleDeleteUserFromModal,
  } = props;

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    if (showModal && showTable === "showModalEdit") {
      setName(dataUserEdit.user.first_name);
    }
  }, [dataUserEdit]);

  const handleClose = () => {
    setShowModal(false);
    setName("");
  };
  const handleAddUser = async () => {
    let res = await createUser(name, job);
    if (res && res.id) {
      toast.success("create user susses");
      handleClose();
      setName("");
      setJob("");
      handleUpdateTable({
        id: res.id,
        first_name: name,
      });
    }
  };
  const handleSubmitEditUser = async () => {
    let res = await editUser(name, job);
    if (res && res.createdAt) {
      toast.success("edit user susses");
      handleEditUserFromModal({
        first_name: name,
        id: dataUserEdit.user.id,
      });
      handleClose();
      setName("");
      setJob("");
    }
    // setName(dataUserEdit.first_name);
  };
  const handleSubmitDeleteUser = async () => {
    let res = await deleteUser(dataDeleteUser.id);
    // console.log(dataDeleteUser.id);
    console.log(res);
    if (res && res.statusCode === 204) {
      toast.success("delete user susses");
      handleDeleteUserFromModal(dataDeleteUser);
      handleClose();
    }
  };
  return (
    <>
      {showModal && showTable === "showModalCreate" && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                value={job}
                onChange={(event) => setJob(event.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddUser}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {showModal && showTable === "showModalEdit" && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                value={job}
                onChange={(event) => setJob(event.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitEditUser}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {showModal && showTable === "showModalDelete" && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure delete user with name =
            <b> {dataDeleteUser.first_name}</b>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitDeleteUser}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
export default ModalAddUser;
