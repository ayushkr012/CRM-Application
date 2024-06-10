import User from "../models/User.js";

/* Get User details  */

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Add Customers Details  */
export const addCustomers = async (req, res) => {
  try {
    const { userId, customers } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    customers.forEach((newCustomer) => {
      const matchingCustomers = user.customers.filter(
        (customer) => customer.email === newCustomer.email
      );

      // Increment visit count for all matching customers
      matchingCustomers.forEach((customer) => {
        customer.visitCount += 1;
      });

      // Determine visit count for the new customer
      const newVisitCount = matchingCustomers.length + 1;

      // Add new customer with calculated visit count and current date as last visit
      user.customers.push({
        ...newCustomer,
        visitCount: newVisitCount,
        lastVisit: new Date(),
      });
    });

    await user.save();
    console.log(user);

    res.status(200).json({
      success: true,
      message: "Customer added successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/* Get Customer details */

export const getCustomers = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
