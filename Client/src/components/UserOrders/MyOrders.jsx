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
import axios from "../../lib/axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
  const { push } = useHistory();

  useEffect(() => {
    if (!login || role !== "CUSTOMER") {
      push("/");
    } else {
      async function getOrders() {
        const res = await axios(`/orders/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      }
      getOrders();
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
                  <TableCell align="center">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
