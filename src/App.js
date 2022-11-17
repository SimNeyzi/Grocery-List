import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "danger", "please enter a valid item");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setEditId(null);
      setIsEditing(false);
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setList([...list, newItem]);
    }
    setName("");
  };

  const showAlert = (show = false, type = "", message = "") => {
    setAlert({ show, type, message });
  };

  const removeItem = (id) => {
    setAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>Groceries</h3>
        <div className="form-control">
          <input
            value={name}
            className="grocery"
            type="text"
            placeholder="e.g. eggs"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button className="submit-btn" type="submit">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <List items={list} removeItem={removeItem} editItem={editItem} />
        {list.length > 0 && (
          <button className="clear-btn" onClick={() => setList([])}>
            Clear Items
          </button>
        )}
      </div>
    </section>
  );
}

export default App;
