import { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
  });

  // Handle input change
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Fetch all users on mount
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Add new user
  const addUser = async (e) => {
    e.preventDefault();

    if (!formData.id || !formData.name || !formData.email) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUsers([...users, newUser]);
        setFormData({ id: "", name: "", email: "" });
        alert("User added successfully!");
      } else {
        alert("Failed to add user!");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Update existing user
  const updateUser = async () => {
    if (!formData.id) {
      alert("Enter user ID to update!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/users/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map((u) => (u.id === formData.id ? updatedUser : u)));
        alert("User updated successfully!");
        setFormData({ id: "", name: "", email: "" });
      } else {
        alert("Failed to update user!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user by ID
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers(users.filter((u) => u.id !== id));
        alert("User deleted!");
      } else {
        alert("Failed to delete user!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <h3>User Management</h3>
      <form onSubmit={addUser} className="d-flex flex-column" style={{ width: "300px" }}>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="Enter user id"
          className="m-2"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter user name"
          className="m-2"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter user email"
          className="m-2"
        />

        <div>
          <button type="submit" className="btn btn-primary m-2">
            Add
          </button>
          <button
            type="button"
            onClick={updateUser}
            className="btn btn-warning m-2"
          >
            Update
          </button>
        </div>
      </form>

      <h4 className="mt-4">User Information</h4>
      <table className="table table-bordered" style={{ width: "500px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
