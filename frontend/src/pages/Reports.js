import { Container, Typography, Button } from "@mui/material";

function Reports() {
  const downloadPDF = () => {
    window.open("http://127.0.0.1:8000/api/reports/pdf/", "_blank");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      <Button variant="contained" onClick={downloadPDF}>
        Download PDF Report
      </Button>
    </Container>
  );
}

export default Reports;
