/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserServices";
import ReactPaginate from "react-paginate";
import ModalAddUser from "./ModalAddUser";
import _ from "lodash";
import { debounce } from "lodash";
import "./TableUser.scss";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";

const TableUsers = (props) => {
  const [listUser, setListUser] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTable, setShowTable] = useState("");
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataDeleteUser, setDataDeleteUser] = useState({});
  const [sortBY, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [dataExport, setDataExport] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setListUser(res.data);
      setTotalPage(res.total_pages);
      console.log(listUser);
    }
  };
  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  };
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };
  const handleCreateUser = () => {
    setShowModal(true);
    setShowTable("showModalCreate");
  };
  const handleEditUser = (user) => {
    setShowModal(true);
    setShowTable("showModalEdit");
    setDataUserEdit({ user });
  };
  const handleEditUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    let index = listUser.findIndex((item) => item.id === user.id);
    if (index >= 0) {
      cloneListUser[index].first_name = user.first_name;
      setListUser(cloneListUser);
    }
  };
  const handleDeleteUser = (user) => {
    setShowTable("showModalDelete");
    setShowModal(true);
    setDataDeleteUser(user);

    // console.log(user);
  };
  const handleDeleteUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);
    setListUser(cloneListUser);
  };
  const handleSortBy = (sortBY, sortField) => {
    setSortBy(sortBY);
    setSortField(sortField);
    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBY]);
    setListUser(cloneListUser);
  };
  const handleSearchUser = debounce((event) => {
    let term = event.target.value;
    console.log("render call api");
    if (term) {
      let cloneListUser = _.cloneDeep(listUser);
      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
      setListUser(cloneListUser);
    } else {
      getUsers();
    }
  }, 1000);

  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  ];
  const handleExportUser = (event, done) => {
    let result = [];
    if (listUser && listUser.length > 0) {
      result.push(["ID", "Email", "first name", "Last name"]);
      listUser.map((item) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };
  const handleChangeFileImport = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type === "text/csv") {
        Papa.parse(file, {
          // download: true,
          // header: true,
          complete: function (results) {
            let rawCSV = results.data;
            if (rawCSV && rawCSV.length > 0) {
              if (rawCSV[0] && rawCSV[0] === 3) {
                if (
                  rawCSV[0][0] !== "email" ||
                  rawCSV[0][1] !== "first_name" ||
                  rawCSV[0][2] !== "last_name"
                ) {
                  toast.error("Wrong format header CSV file!");
                } else {
                  let result = [];
                  rawCSV.map((item, index) => {
                    if (index > 0 && item.length === 3) {
                      let obj = {};
                      obj.email = item[0];
                      obj.first_name = item[1];
                      obj.last_name = item[2];
                      result.push(obj);
                    }
                  });
                  setListUser(result);
                }
              }
            }
            console.log(rawCSV);
          },
        });
      } else {
        toast.error("Only accept csv files...");
      }
    } else {
      toast.error("Not found data on CSV file!");
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between my-3">
        <div>list User: </div>
        <div className="d-flex form-btn">
          <label className="btn btn-warning" htmlFor="import-file">
            <i className="fa-sharp fa-solid fa-upload"></i> Import
          </label>
          <input
            onChange={(event) => handleChangeFileImport(event)}
            type="file"
            hidden
            id="import-file"
          />
          <CSVLink
            asyncOnClick={true}
            onClick={(event, done) => handleExportUser(event, done)}
            filename={"file.csv"}
            className="btn btn-primary"
            data={dataExport}
          >
            <i className="fa-sharp fa-solid fa-download"></i> Export
          </CSVLink>
          <button
            onClick={() => handleCreateUser()}
            className="btn btn-success"
          >
            Add new user
          </button>
        </div>
      </div>
      <div className="col-4 my-3">
        <input
          onChange={(event) => handleSearchUser(event)}
          className="form-control "
          placeholder="Search user by email..."
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="d-flex justify-content-between sortby">
                <span>ID</span>
                <span>
                  <i
                    onClick={() => handleSortBy("desc", "id")}
                    className="fa-solid fa-arrow-down mx-1"
                  ></i>
                  <i
                    onClick={() => handleSortBy("asc", "id")}
                    className="fa-solid fa-arrow-up mx-1"
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="d-flex justify-content-between sortby">
                <span> First Name</span>
                <span>
                  <i
                    onClick={() => handleSortBy("desc", "first_name")}
                    className="fa-solid fa-arrow-down mx-1"
                  ></i>
                  <i
                    onClick={() => handleSortBy("asc", "first_name")}
                    className="fa-solid fa-arrow-up mx-1"
                  ></i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={`${index} - user`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      onClick={() => handleEditUser(item)}
                      className="btn btn-warning mx-3"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDeleteUser(item)}
                      className="btn btn-danger"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={+totalPage}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddUser
        showModal={showModal}
        setShowModal={setShowModal}
        handleUpdateTable={handleUpdateTable}
        showTable={showTable}
        handleEditUser={handleEditUser}
        dataUserEdit={dataUserEdit}
        handleDeleteUser={handleDeleteUser}
        dataDeleteUser={dataDeleteUser}
        handleEditUserFromModal={handleEditUserFromModal}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};
export default TableUsers;
