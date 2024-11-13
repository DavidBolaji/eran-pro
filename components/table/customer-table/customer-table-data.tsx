import { Customer } from "./types";

export const dummyCustomers: Customer[] = [
  {
    id: "1",
    fname: "John",
    lname: "Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    pic: "",
    totalOrders: 5,
    lastOrderDate: new Date("2024-10-05"),
    orders: [
      { id: "101", createdAt: new Date("2024-01-15") },
      { id: "102", createdAt: new Date("2024-02-20") },
      { id: "103", createdAt: new Date("2024-03-10") },
      { id: "104", createdAt: new Date("2024-06-15") },
      { id: "105", createdAt: new Date("2024-10-05") },
    ],
    status: "active",
  },
  {
    id: "2",
    fname: "Jane",
    lname: "Smith",
    pic: "",
    email: "janesmith@example.com",
    phone: "987-654-3210",
    totalOrders: 1,
    lastOrderDate: new Date("2024-09-18"),
    orders: [
      { id: "201", createdAt: new Date("2024-04-22") },
    
    ],
    status: "inactive",
  },
  {
    id: "3",
    fname: "Alice",
    lname: "Johnson",
    pic: "",
    email: "alicejohnson@example.com",
    phone: "555-123-4567",
    totalOrders: 3,
    lastOrderDate: new Date("2024-10-20"),
    orders: [
      { id: "301", createdAt: new Date("2024-01-10") },
      { id: "302", createdAt: new Date("2024-02-14") },
      { id: "303", createdAt: new Date("2024-03-15") },
     
    ],
    status: "active",
  },
  {
    id: "4",
    fname: "Bob",
    lname: "Brown",
    email: "bobbrown@example.com",
    pic: "",
    phone: "444-567-8901",
    totalOrders: 2,
    lastOrderDate: new Date("2024-08-05"),
    orders: [
      { id: "401", createdAt: new Date("2024-06-10") },
      { id: "402", createdAt: new Date("2024-08-05") },
    ],
    status: "pending",
  },
  {
    id: "5",
    fname: "Charlie",
    lname: "Davis",
    email: "charliedavis@example.com",
    phone: "333-987-6543",
    pic: "",
    totalOrders: 6,
    lastOrderDate: new Date("2024-10-01"),
    orders: [
      { id: "501", createdAt: new Date("2024-02-05") },
      { id: "502", createdAt: new Date("2024-04-18") },
      { id: "503", createdAt: new Date("2024-06-07") },
      { id: "504", createdAt: new Date("2024-07-25") },
      { id: "505", createdAt: new Date("2024-09-03") },
      { id: "506", createdAt: new Date("2024-10-01") },
    ],
    status: "active",
  },
];
