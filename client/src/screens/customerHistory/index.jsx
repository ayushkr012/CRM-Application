import React, { useState } from "react";
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
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../../screens/navbar";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";

const CustomerHistory = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user) || {}; // Default to an empty object if 'user' is undefined
  const { palette } = useTheme() || {}; // Default to an empty object if 'useTheme()' is undefined

  // States to conditionally display data on the page
  const [spendGt10000, setSpendGt10000] = useState(true);
  const [spendGt10000AndVisitCountGte3, setSpendGt10000AndVisitCountGte3] =
    useState(false);
  const [lastVisited3MonthsAgo, setLastVisited3MonthsAgo] = useState(false);

  const { customers = [] } = user; // Default to an empty array if 'customers' is undefined

  // Reverse the order of the customers array so the most recent customer is displayed first
  const reversedCustomers = customers.slice().reverse();

  const customersWithSpendsAbove10000 = reversedCustomers.filter(
    (customer) => customer.spends > 10000
  );

  const customersWithSpendsAndVisitCount = reversedCustomers.filter(
    (customer) => customer.spends > 10000 && customer.visitCount >= 3
  );

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const customersWithNoRecentVisit = reversedCustomers.filter(
    (customer) => new Date(customer.lastVisit) < threeMonthsAgo
  );

  const handleEditCustomer = (index) => {};
  const handleDeleteCustomer = (index) => {};

  const renderCustomerTable = (customerList) => (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                backgroundColor: palette.background.default || "",
                color: palette.text ? palette.text.primary || "" : "",
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: palette.background.default || "",
                color: palette.text.primary || "",
              }}
            >
              Email
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: palette.background.default || "",
                color: palette.text.primary || "",
              }}
            >
              Spends
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: palette.background.default || "",
                color: palette.text.primary || "",
              }}
            >
              Last Visit
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: palette.background.default || "",
                color: palette.text.primary || "",
              }}
            >
              Visit Count
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: palette.background.default || "",
                color: palette.text.primary || "",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customerList.map((customer, index) => (
            <TableRow
              key={index}
              sx={{
                "&:hover": { backgroundColor: palette.action.hover },
                transition: "background-color 0.3s",
              }}
            >
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.spends}</TableCell>
              <TableCell>
                {new Date(customer.lastVisit).toLocaleDateString()}
              </TableCell>
              <TableCell>{customer.visitCount}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEditCustomer(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteCustomer(index)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
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
      <FlexBetween sx={{ padding: "1rem 6%" }}>
        <Button
          variant={spendGt10000 ? "contained" : "outlined"}
          color="primary"
          onClick={() => {
            setSpendGt10000(true);
            setSpendGt10000AndVisitCountGte3(false);
            setLastVisited3MonthsAgo(false);
          }}
          sx={{
            margin: "0 0.5rem",
            "&:hover": {
              backgroundColor: palette.secondary.main,
              color: palette.secondary.contrastText,
            },
          }}
        >
          Customers with spends &gt; 10000
        </Button>
        <Button
          variant={spendGt10000AndVisitCountGte3 ? "contained" : "outlined"}
          color="primary"
          onClick={() => {
            setSpendGt10000(false);
            setSpendGt10000AndVisitCountGte3(true);
            setLastVisited3MonthsAgo(false);
          }}
          sx={{
            margin: "0 0.5rem",
            "&:hover": {
              backgroundColor: palette.secondary.main,
              color: palette.secondary.contrastText,
            },
          }}
        >
          Customers with spends &gt; 10000 and visit count ≥ 3
        </Button>
        <Button
          variant={lastVisited3MonthsAgo ? "contained" : "outlined"}
          color="primary"
          onClick={() => {
            setSpendGt10000(false);
            setSpendGt10000AndVisitCountGte3(false);
            setLastVisited3MonthsAgo(true);
          }}
          sx={{
            margin: "0 0.5rem",
            "&:hover": {
              backgroundColor: palette.secondary.main,
              color: palette.secondary.contrastText,
            },
          }}
        >
          Customers who last visited 3 months ago
        </Button>
      </FlexBetween>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        flexDirection={isNonMobileScreens ? "row" : "column"}
        justifyContent="space-between"
        gap="2rem"
      >
        {/* Left part of the screen */}
        <Box
          flexBasis={isNonMobileScreens ? "20%" : "100%"}
          sx={{
            padding: "1rem",
            borderRadius: "8px",
          }}
        ></Box>

        {/* Middle part of the screen */}
        <Box
          flexBasis={isNonMobileScreens ? "50%" : "100%"}
          sx={{
            backgroundColor: palette.background.paper || "",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {spendGt10000 && (
            <>
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
            </>
          )}

          {spendGt10000AndVisitCountGte3 && (
            <>
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
            </>
          )}

          {lastVisited3MonthsAgo && (
            <>
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
            </>
          )}
        </Box>

        {/* Right part of the screen */}
        <Box
          flexBasis={isNonMobileScreens ? "20%" : "100%"}
          sx={{
            padding: "1rem",
            borderRadius: "8px",
          }}
        ></Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default CustomerHistory;
