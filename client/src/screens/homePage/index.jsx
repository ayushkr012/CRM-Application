import React, { useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Navbar from "../../screens/navbar";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { setUser } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const isDesktop = useMediaQuery("(min-width:1000px)");
  // const { picturePath, name, email } = useSelector((state) => state.user || {});
  const userId = useSelector((state) => state.user?._id);
  const navigate = useNavigate();
  // console.log("UserId   " + userId );
  const token = useSelector((state) => state.token);
  // console.log("token   " + token);
  const dispatch = useDispatch();

  const [customers, setCustomers] = useState([]);
  const [audienceSize, setAudienceSize] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", spends: "" });
  const [validationErrors, setValidationErrors] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCustomer = () => {
    const { name, email, spends } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !name ||
      !email ||
      !spends ||
      spends < 10000 ||
      !emailRegex.test(email)
    ) {
      setValidationErrors({
        name: !name ? "Name is required" : "",
        email: !email
          ? "Email is required"
          : !emailRegex.test(email)
          ? "Invalid email format"
          : "",
        spends: spends < 10000 ? "Spends must be at least 10000" : "",
      });
      return;
    }

    if (editingIndex !== null) {
      // If editing an existing customer
      const updatedCustomers = [...customers];
      updatedCustomers[editingIndex] = {
        ...formData,
        lastVisit: Date.now(),
        visitCount: customers[editingIndex].visitCount + 1,
      };
      setCustomers(updatedCustomers);
      setEditingIndex(null);
    } else {
      // If adding a new customer
      setCustomers([
        ...customers,
        { ...formData, lastVisit: Date.now(), visitCount: 1 },
      ]);
    }

    setFormData({ name: "", email: "", spends: "" });
    setValidationErrors({});
  };

  const handleEditCustomer = (index) => {
    setFormData(customers[index]);
    setEditingIndex(index);
  };

  const handleDeleteCustomer = (index) => {
    const updatedCustomers = [...customers];
    updatedCustomers.splice(index, 1);
    setCustomers(updatedCustomers);
  };

  const handleCheckAudienceSize = () => {
    setAudienceSize(customers.length);
  };

  /* function to handle the form submission for add customer  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_Backend_URL}/users/addcustomer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, customers }),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("Customers added successfully");

        // After adding the customer, update the Redux store
        dispatch(setUser({ user: data.user }));
        toast.success(data.message);
        setCustomers([]);
        navigate("/customerhistory");
      } else {
        toast.error(data.message);
      }

      setCustomers([]);
    } catch (error) {
      console.error("Error adding customers:", error);
    }
  };

  return (
    <Box>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding="2rem"
        gap="1rem"
      >
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            fullWidth
            margin="normal"
            // required
            error={!!validationErrors.name}
            helperText={validationErrors.name}
          />
          <TextField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            fullWidth
            margin="normal"
            // required
            error={!!validationErrors.email}
            helperText={validationErrors.email}
          />
          <TextField
            type="number"
            name="spends"
            value={formData.spends}
            onChange={handleChange}
            placeholder="Spends"
            fullWidth
            margin="normal"
            // required
            inputProps={{ min: "10000" }}
            error={!!validationErrors.spends}
            helperText={validationErrors.spends}
          />

          <Button variant="contained" onClick={handleAddCustomer}>
            {editingIndex !== null ? "Update Customer" : "Add Customer"}
          </Button>
          <Button
            variant="contained"
            sx={{ marginLeft: "1rem" }}
            onClick={handleCheckAudienceSize}
          >
            Check Audience Size
          </Button>

          <Typography>Audience Size: {audienceSize}</Typography>
          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: "0.5rem" }}
          >
            Save
          </Button>
        </form>

        <Box width={isDesktop ? "70%" : "100%"}>
          <Typography variant="h5">Customer List</Typography>
          <TableContainer component={Paper}>
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
                {customers.map((customer, index) => (
                  <TableRow key={index}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.spends}</TableCell>
                    <TableCell>
                      {new Date(customer.lastVisit).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{customer.visitCount}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleEditCustomer(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDeleteCustomer(index)}
                        sx={{ marginLeft: "1rem" }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default HomePage;
