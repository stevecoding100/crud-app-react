import UserTable from "./tables/UserTable";
import AddUserForm from "./tables/AddUserForm";
import EditUserForm from "./form/EditUserForm";
import { useState } from "react";
function App() {
    // Dummy User Data

    const usersData = [
        { id: 1, name: "Tania", username: "floppydiskette" },
        { id: 2, name: "Craig", username: "siliconeidolon" },
        { id: 3, name: "Ben", username: "benisphere" },
    ];

    const initialFormState = { id: null, name: "", username: "" };

    const [users, setUsers] = useState(usersData);

    const [editing, setEditing] = useState(false);

    const [currentUser, setCurrentUser] = useState(initialFormState);

    // Since we don't know who is being edited until it's selected, we'll create initial empty state for the form, like we did with the add form.

    const addUser = (user) => {
        user.id = users.length + 1;
        setUsers([...users, user]);
    };

    const deleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
        setEditing(false);
    };

    const editRow = (user) => {
        setEditing(true);

        setCurrentUser({
            id: user.id,
            name: user.name,
            username: user.username,
        });
    };

    const updateUser = (id, updatedUser) => {
        setEditing(false);

        setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    };

    return (
        <>
            <div className="container">
                <h1>CRUD App with Hooks</h1>
                <div className="flex-row">
                    <div className="flex-large">
                        {editing ? (
                            <div>
                                <h2>Edit user</h2>
                                <EditUserForm
                                    setEditing={setEditing}
                                    currentUser={currentUser}
                                    updateUser={updateUser}
                                />
                            </div>
                        ) : (
                            <div>
                                <h2>Add user</h2>
                                <AddUserForm addUser={addUser} />
                            </div>
                        )}
                    </div>
                    <div className="flex-large">
                        <h2>View users</h2>
                        <UserTable
                            users={users}
                            deleteUser={deleteUser}
                            editRow={editRow}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
