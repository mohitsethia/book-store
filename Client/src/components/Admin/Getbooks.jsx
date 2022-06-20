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
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import axios from "../../lib/axios";
import { Link, useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: indigo[400],
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default function Getbooks({ login, role, token }) {
  const classes = useStyles();
  const { push } = useHistory();
  const [books, setBooks] = useState([]);

  const handleDelete = async (id) => {
    await axios.delete(`/books/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setBooks((books) => books.filter((item) => item._id !== id));
  };

  useEffect(() => {
    if (!login || role !== "ADMIN") {
      push("/");
    } else {
      async function getBooks() {
        const res = await axios("/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(res.data);
      }
      getBooks();
    }
  }, []);

  return (
    <div class="col main pt-5 mt-5">
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h4">Book List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#7986cb" }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                Sr.No
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Price
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Author
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Category
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, i) => {
              return (
                <TableRow key={i}>
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="center">{book.name}</TableCell>
                  <TableCell align="center">{book.price}</TableCell>
                  <TableCell align="center">{book.author}</TableCell>
                  <TableCell align="center">{book.category}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Update">
                      <IconButton>
                        <Link to={`/update/${book._id}`}>
                          <EditIcon />
                        </Link>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(book._id)}>
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
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
