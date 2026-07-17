import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  MenuItem,
} from "@mui/material";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    transaction_type: "Income",
    category: "",
    description: "",
  });

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const res = await api.get("transactions/");
      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addTransaction = async () => {
    try {
      await api.post("transactions/", form);

      setForm({
        title: "",
        amount: "",
        transaction_type: "Income",
        category: "",
        description: "",
      });

      loadTransactions();
    } catch (err) {
      console.log(err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  const deleteTransaction = async (id) => {
    await api.delete(`transactions/${id}/`);
    loadTransactions();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Transactions</Typography>

      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Amount"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        select
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="Salary">Salary</MenuItem>
        <MenuItem value="Food">Food</MenuItem>
        <MenuItem value="Shopping">Shopping</MenuItem>
        <MenuItem value="Travel">Travel</MenuItem>
        <MenuItem value="Bills">Bills</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>

      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        select
        label="Transaction Type"
        name="transaction_type"
        value={form.transaction_type}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="Income">Income</MenuItem>
        <MenuItem value="Expense">Expense</MenuItem>
      </TextField>

      <Button
        variant="contained"
        sx={{ mt: 2, mb: 4 }}
        onClick={addTransaction}
      >
        Add Transaction
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.title}</TableCell>
                <TableCell>{t.amount}</TableCell>
                <TableCell>{t.transaction_type}</TableCell>
                <TableCell>{t.category}</TableCell>
                <TableCell>{t.date}</TableCell>
                <TableCell>
                  <Button color="error" onClick={() => deleteTransaction(t.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default Transactions;
