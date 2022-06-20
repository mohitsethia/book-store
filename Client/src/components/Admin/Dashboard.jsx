import React from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

const Dashboard = ({ login, role }) => {
  const { push } = useHistory();

  if (!login || role !== "ADMIN") {
    push("/");
  } else {
    return (
      <div class="col main pt-5 mt-5">
        <div class="row mb-3">
          <h1>
            <strong>Admin Dashboard</strong>
          </h1>
          <div class="col-xl-3 col-sm-6 py-2">
            <div class="card bg-success text-white h-100">
              <a class="dash" href="/Userlist">
                <div
                  class="card-body bg-success"
                  style={{ backgroundColor: "#57b960" }}
                >
                  <div class="rotate">
                    <i class="fa fa-user fa-4x"></i>
                  </div>
                  <h6 class="text-uppercase">
                    <strong>Users</strong>
                  </h6>
                </div>
              </a>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 py-2">
            <a class="dash" href="/vieworders">
              <div class="card text-white bg-danger h-100">
                <div class="card-body bg-danger">
                  <div class="rotate">
                    <i class="fa fa-list fa-4x"></i>
                  </div>
                  <h6 class="text-uppercase">
                    <strong>Orders</strong>
                  </h6>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
