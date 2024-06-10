import React from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Navbar from "../../screens/navbar";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const CustomerHistory = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);
  const { palette } = useTheme();

  // Check if user and customers are defined
  if (!user || !user.customers) {
    return (
      <Box>
        <Navbar />
        <Box width="100%" padding="2rem 6%">
          <Typography variant="h6" color="error">
            No customer data available.
          </Typography>
        </Box>
        <ToastContainer />
      </Box>
    );
  }

  const { customers, name } = user;

  const customersWithSpendsAbove10000 = customers.filter(
    (customer) => customer.spends > 10000
  );

  const customersWithSpendsAndVisitCount = customers.filter(
    (customer) => customer.spends > 10000 && customer.visitCount >= 3
  );

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const customersWithNoRecentVisit = customers.filter(
    (customer) => new Date(customer.lastVisit) < threeMonthsAgo
  );

  const renderCustomerTable = (customerList) => (
    <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Spends</TableCell>
            <TableCell>Last Visit</TableCell>
            <TableCell>Visit Count</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customerList.map((customer, index) => (
            <TableRow key={index}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.spends}</TableCell>
              <TableCell>
                {new Date(customer.lastVisit).toLocaleDateString()}
              </TableCell>
              <TableCell>{customer.visitCount}</TableCell>
              <TableCell>
                <Button variant="contained" sx={{ marginRight: "0.5rem" }}>
                  Edit
                </Button>
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        flexDirection={isNonMobileScreens ? "row" : "column"}
        justifyContent="space-between"
        gap="2rem"
        sx={{
          maxHeight: "100vh",
          overflowY: "auto",
          scrollbarWidth: "0px",
          scrollbarColor: `${palette.primary.main} ${palette.background.default}`,
        }}
      >
        {/* Left part of the home screen */}
        <Box
          flexBasis={isNonMobileScreens ? "30%" : "100%"}
          sx={{
            backgroundColor: palette.background.paper,
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" color="primary" textAlign="center">
            Customers with spends &gt; 10000
          </Typography>
          {customersWithSpendsAbove10000.length > 0 ? (
            renderCustomerTable(customersWithSpendsAbove10000)
          ) : (
            <Typography textAlign="center" mt={2}>
              No customers found.
            </Typography>
          )}
        </Box>

        {/* Middle part of the home screen */}
        <Box
          flexBasis={isNonMobileScreens ? "30%" : "100%"}
          sx={{
            backgroundColor: palette.background.paper,
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" color="primary" textAlign="center">
            Customers with spends &gt; 10000 and visit count ≥ 3
          </Typography>
          {customersWithSpendsAndVisitCount.length > 0 ? (
            renderCustomerTable(customersWithSpendsAndVisitCount)
          ) : (
            <Typography textAlign="center" mt={2}>
              No customers found.
            </Typography>
          )}
        </Box>

        {/* Right part of the home screen */}
        <Box
          flexBasis={isNonMobileScreens ? "30%" : "100%"}
          sx={{
            backgroundColor: palette.background.paper,
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" color="primary" textAlign="center">
            Customers who last visited 3 months ago
          </Typography>
          {customersWithNoRecentVisit.length > 0 ? (
            renderCustomerTable(customersWithNoRecentVisit)
          ) : (
            <Typography textAlign="center" mt={2}>
              No customers who haven't visited in the last 3 months.
            </Typography>
          )}
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default CustomerHistory;
