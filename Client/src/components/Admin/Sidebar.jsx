import React from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

const Sidebar = ({ login, role }) => {
  const { push } = useHistory();

  if (!login || role !== "ADMIN") {
    push("/");
  } else {
    return (
      <div
        class="col-md-4 col-lg-3 sidebar-offcanvas pl-0"
        id="sidebar"
        role="navigation"
        style={{ backgroundColor: "#e9ecef" }}
      >
        <ul class="nav flex-column sticky-top pl-0 pt-5 p-5 mt-5">
          <li class="nav-item mb-2 mt-3">
            <a class="nav-link text-secondary " href="/Admin">
              <h3>
                <strong>Admin</strong>
              </h3>
            </a>
          </li>
          <li class="nav-item mb-2">
            <a class="nav-link text-secondary side" href="/AddBook">
              Add Books
            </a>
          </li>
          <li class="nav-item mb-2">
            <a class="nav-link text-secondary side" href="/getbooks">
              View Books
            </a>
          </li>
        </ul>
      </div>
    );
  }
};

export default Sidebar;
