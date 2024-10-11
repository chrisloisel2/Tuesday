import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getItemsByFormateur,
  deleteItem,
  updateItem,
} from "../../Redux/ItemReducer";
import "./Tables.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ChromePicker } from "react-color";
import ColorPicker from "../ChromePicker/ChromePicker";

const Colors = [
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#ABB8C3",
  "#EB144C",
  "#F78DA7",
  "#9900EF",
];

const Tables = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.items);
  const formateurId = useSelector((state) => state.auth.user._id);
  const [openMonths, setOpenMonths] = useState([]);
  const [editableItemId, setEditableItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  useEffect(() => {
    if (formateurId) {
      dispatch(getItemsByFormateur(formateurId));
    }
  }, [dispatch, formateurId]);

  const toggleMonth = (month) => {
    if (openMonths.includes(month)) {
      setOpenMonths(openMonths.filter((m) => m !== month));
    } else {
      setOpenMonths([...openMonths, month]);
    }
  };

  const groupItemsByMonth = (items) => {
    const months = {};
    items.forEach((item) => {
      const month = new Date(item.start).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!months[month]) {
        months[month] = [];
      }
      months[month].push(item);
    });
    return months;
  };

  const handleDelete = (itemId) => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet élément ?"
    );
    if (confirmed) {
      dispatch(deleteItem(itemId));
      dispatch(getItemsByFormateur(formateurId));
    }
  };

  const handleEditClick = (item) => {
    setEditableItemId(item._id);
    setEditedItem({
      title: item.title,
      stack: item.stack,
      start: new Date(item.start).toISOString().substr(0, 10),
      end: new Date(item.end).toISOString().substr(0, 10),
      location: item.location,
    });
  };

  const handleEditSubmit = (itemId) => {
    dispatch(updateItem({ ...editedItem, _id: itemId }));
    setEditableItemId(null);
    dispatch(getItemsByFormateur(formateurId));
  };

  const handleColorChange = (color) => {
    setEditedItem({
      ...editedItem,
      color: color,
    });
    setEditedItem({
      ...editedItem,
      color: color,
    });
    dispatch(updateItem({ ...editedItem, _id: editableItemId }));
  };

  const groupedItems = groupItemsByMonth(items);

  return (
    <div className="table-view-container">
      {Object.keys(groupedItems).map((month) => (
        <div key={month} className="month-section">
          <div
            className={`month-header ${
              openMonths.includes(month) ? "month-active" : "month-inactive"
            }`}
            onClick={() => toggleMonth(month)}
          >
            <ColorPicker color={month.color} setColor={handleColorChange} />
            <span>{month}</span>
            <span>{openMonths.includes(month) ? "▼" : "▲"}</span>
          </div>
          {openMonths.includes(month) && (
            <div className="month-items">
              <table>
                <thead>
                  <tr>
                    <th>Élément</th>
                    <th>Stack</th>
                    <th>Période</th>
                    <th>Lieu</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedItems[month].map((item) => (
                    <tr key={item._id}>
                      <td>
                        {editableItemId === item._id ? (
                          <input
                            type="text"
                            value={editedItem.title}
                            onChange={(e) =>
                              setEditedItem({
                                ...editedItem,
                                title: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.title
                        )}
                      </td>
                      <td>
                        {editableItemId === item._id ? (
                          <input
                            type="text"
                            value={editedItem.stack}
                            onChange={(e) =>
                              setEditedItem({
                                ...editedItem,
                                stack: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.stack
                        )}
                      </td>
                      <td>
                        {editableItemId === item._id ? (
                          <>
                            <input
                              type="date"
                              value={editedItem.start}
                              onChange={(e) =>
                                setEditedItem({
                                  ...editedItem,
                                  start: e.target.value,
                                })
                              }
                            />
                            <input
                              type="date"
                              value={editedItem.end}
                              onChange={(e) =>
                                setEditedItem({
                                  ...editedItem,
                                  end: e.target.value,
                                })
                              }
                            />
                          </>
                        ) : (
                          `${new Date(
                            item.start
                          ).toLocaleDateString()} - ${new Date(
                            item.end
                          ).toLocaleDateString()}`
                        )}
                      </td>
                      <td>
                        {editableItemId === item._id ? (
                          <input
                            type="text"
                            value={editedItem.location}
                            onChange={(e) =>
                              setEditedItem({
                                ...editedItem,
                                location: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.location
                        )}
                      </td>
                      <td>
                        {editableItemId === item._id ? (
                          <button onClick={() => handleEditSubmit(item._id)}>
                            Confirmer
                          </button>
                        ) : (
                          <FaEdit
                            onClick={() => handleEditClick(item)}
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </td>
                      <td>
                        <FaTrash
                          onClick={() => handleDelete(item._id)}
                          style={{ cursor: "pointer", color: "red" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tables;
