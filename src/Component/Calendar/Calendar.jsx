import React, { useEffect, useState } from "react";
import "./Calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Redux/UserReducer";
import {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
} from "../../Redux/ItemReducer";
import { FaEdit, FaTrash } from "react-icons/fa";

const Calendrier = () => {
  const dispatch = useDispatch();
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [stack, setStack] = useState("");
  const [formateur, setFormateur] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [location, setLocation] = useState("");

  const { users, status } = useSelector((state) => state.users);
  const { items } = useSelector((state) => state.items);

  useEffect(() => {
    moment.locale("fr");
    dispatch(getAllUsers());
    dispatch(getAllItems());
  }, [dispatch]);

  const formateurColors = users.reduce((acc, user, index) => {
    acc[user._id] = `hsl(${(index * 100) % 360}, 70%, 50%)`;
    return acc;
  }, {});

  const events = items.map((item) => ({
    title: item.title + " - " + item.stack + " - " + item.location,
    start: new Date(item.start),
    end: new Date(item.end),
    resource: item,
    formateur: item.formateur,
    stack: item.stack,
    location: item.location,
  }));

  const handleCreateEventModal = () => {
    setIsCreateEventModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setStack(event.resource.stack);
    setFormateur(event.formateur);
    setStart(event.start);
    setEnd(event.end);
    setLocation(event.resource.location);
    setIsEditEventModalOpen(true);
  };

  const handleCreateEventSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      title,
      stack,
      formateur,
      start,
      end,
      location,
    };

    dispatch(createItem(newItem));

    setTitle("");
    setStack("");
    setFormateur("");
    setStart("");
    setEnd("");
    setLocation("");
    setIsCreateEventModalOpen(false);
  };

  const handleUpdateEventSubmit = (e) => {
    e.preventDefault();
    const updatedItem = {
      ...selectedEvent.resource,
      title,
      stack,
      formateur,
      start,
      end,
      location,
    };

    dispatch(updateItem(updatedItem));
    dispatch(getAllItems());

    setIsEditing(false);
    setIsEditEventModalOpen(false);
  };

  const handleDeleteEvent = () => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet élément ?"
    );

    if (confirmed) {
      dispatch(deleteItem(selectedEvent.resource._id));
      setIsEditEventModalOpen(false);
      dispatch(getAllItems());
    }
  };

  const eventPropGetter = (event) => {
    const backgroundColor = formateurColors[event.formateur] || "#3174ad";
    return { style: { backgroundColor } };
  };

  return (
    <div className="calendar-container">
      <div className="title">
        <p>Calendar</p>
      </div>

      <div className="legend">
        <h4>Légende des formateurs :</h4>
        <ul>
          {users.map((user) => (
            <li
              key={user._id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: formateurColors[user._id],
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "10px",
                }}
              ></span>
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="button">
        <button onClick={handleCreateEventModal}>Nouvelle formation</button>
      </div>

      <div className="calendar">
        <Calendar
          localizer={momentLocalizer(moment)}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800 }}
          onSelectEvent={handleEditEvent}
          eventPropGetter={eventPropGetter}
        />
      </div>

      {isCreateEventModalOpen && (
        <div className="create-event-modal">
          <div className="modal-content">
            <div className="modal-header">
              <p>Nouvelle formation</p>
              <button onClick={() => setIsCreateEventModalOpen(false)}>
                X
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleCreateEventSubmit}>
                <select
                  name="Formateur"
                  value={formateur}
                  onChange={(e) => setFormateur(e.target.value)}
                  required
                >
                  <option value="" hidden>
                    Sélectionner un formateur
                  </option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Nom de la formation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Stack technique"
                  value={stack}
                  onChange={(e) => setStack(e.target.value)}
                  required
                />
                <div className="du">
                  <p>Du</p>
                  <input
                    type="date"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    required
                  />
                </div>
                <div className="du">
                  <p>Au</p>
                  <input
                    type="date"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Localisation"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <button type="submit">Create</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {isEditEventModalOpen && selectedEvent && (
        <div className="edit-event-modal">
          <div className="modal-content">
            <div className="modal-header">
              <p>Informations sur la formation</p>
              <button onClick={() => setIsEditEventModalOpen(false)}>X</button>
              <FaTrash
                onClick={handleDeleteEvent}
                style={{ cursor: "pointer" }}
              />
              {!isEditing && (
                <FaEdit
                  onClick={() => setIsEditing(true)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            <div className="modal-body">
              {isEditing ? (
                <form onSubmit={handleUpdateEventSubmit}>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    value={stack}
                    onChange={(e) => setStack(e.target.value)}
                    required
                  />
                  <select
                    value={formateur}
                    onChange={(e) => setFormateur(e.target.value)}
                    required
                  >
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    required
                  />
                  <input
                    type="date"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  <button type="submit">Update</button>
                  <button onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
              ) : (
                <>
                  <p>
                    <strong>Nom de la formation :</strong> {selectedEvent.title}
                  </p>
                  <p>
                    <strong>Stack technique :</strong>{" "}
                    {selectedEvent.resource.stack}
                  </p>
                  <p>
                    <strong>Formateur :</strong>{" "}
                    {users.find((user) => user._id === selectedEvent.formateur)
                      ?.name || "Inconnu"}
                  </p>
                  <p>
                    <strong>Début :</strong>{" "}
                    {new Date(selectedEvent.start).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Fin :</strong>{" "}
                    {new Date(selectedEvent.end).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Localisation :</strong>{" "}
                    {selectedEvent.resource.location}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendrier;
