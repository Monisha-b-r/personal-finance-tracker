import { useEffect, useState } from "react";
import api from "../services/api";
import { MenuItem } from "@mui/material";
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
} from "@mui/material";

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({
    month: "",
    amount: "",
  });

  useEffect(() => {
    loadBudgets();
  }, []);

  const loadBudgets = async () => {
    try {
      const res = await api.get("budgets/");
      setBudgets(res.data);
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

  const addBudget = async () => {
    try {
      await api.post("budgets/", form);

      setForm({
        month: "",
        amount: "",
      });

      loadBudgets();
    } catch (err) {
      console.log(err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  const deleteBudget = async (id) => {
    await api.delete(`budgets/${id}/`);
    loadBudgets();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Budget
      </Typography>

      <TextField
        select
        label="Month"
        name="month"
        value={form.month}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="January">January</MenuItem>
        <MenuItem value="February">February</MenuItem>
        <MenuItem value="March">March</MenuItem>
        <MenuItem value="April">April</MenuItem>
        <MenuItem value="May">May</MenuItem>
        <MenuItem value="June">June</MenuItem>
        <MenuItem value="July">July</MenuItem>
        <MenuItem value="August">August</MenuItem>
        <MenuItem value="September">September</MenuItem>
        <MenuItem value="October">October</MenuItem>
        <MenuItem value="November">November</MenuItem>
        <MenuItem value="December">December</MenuItem>
      </TextField>

      <TextField
        label="Budget Amount"
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" sx={{ mt: 2, mb: 4 }} onClick={addBudget}>
        Add Budget
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {budgets.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.month}</TableCell>
                <TableCell>₹ {b.amount}</TableCell>
                <TableCell>
                  <Button color="error" onClick={() => deleteBudget(b.id)}>
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

export default Budget;
