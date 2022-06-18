import {
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: yellow[500],
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default function MyOrders({ token, login, role }) {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (login && role === "CUSTOMER") {
      fetch(`http://127.0.0.1:9002/orders/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        res.json().then((data) => {
          setOrders(data);
        });
      });
    }
  }, []);

  return (
    <div class="col main pt-5 mt-5">
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h4">My Orders</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f9a825" }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                Sr.No
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Amount
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Order ID
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Payment ID
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Order Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, i) => {
              return (
                <TableRow key={i}>
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="center">{order.amount}</TableCell>
                  <TableCell align="center">{order._id}</TableCell>
                  <TableCell align="center">{order.paymentId}</TableCell>
                  <TableCell align="center">{order.createdAt}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
