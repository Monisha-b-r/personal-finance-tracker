import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
import api from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const chartData = [
    { name: "Income", value: Number(data.income) },
    { name: "Expense", value: Number(data.expense) },
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("transactions/dashboard/");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Income</Typography>
            <Typography>₹ {data.income}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Expense</Typography>
            <Typography>₹ {data.expense}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Balance</Typography>
            <Typography>₹ {data.balance}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Income vs Expense
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Paper>

      <Button
        sx={{ mt: 4 }}
        variant="contained"
        onClick={() => navigate("/transactions")}
      >
        Transactions
      </Button>

      <Button
        sx={{ mt: 4, ml: 2 }}
        variant="contained"
        onClick={() => navigate("/budget")}
      >
        Budget
      </Button>

      <Button
        sx={{ mt: 4, ml: 2 }}
        variant="contained"
        onClick={() => navigate("/reports")}
      >
        Reports
      </Button>

      <Button
        sx={{ mt: 4, ml: 2 }}
        color="error"
        variant="contained"
        onClick={logout}
      >
        Logout
      </Button>
    </Container>
  );
}

export default Dashboard;
