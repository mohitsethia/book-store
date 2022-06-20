import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import axios from "../../lib/axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: orange[400],
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default function AdminPage({ login, role, token }) {
  const classes = useStyles();
  const { push } = useHistory();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!login || role !== "ADMIN") {
      push("/");
    } else {
      async function getUsers() {
        const res = await axios("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      }
      getUsers();
    }
  }, []);

  return (
    <div class="col main pt-5 mt-5">
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h4">User List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                Sr.No
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Email
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Role
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => {
              return (
                <TableRow key={i}>
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.role}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
