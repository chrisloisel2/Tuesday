import React, { useEffect, useState } from "react";
import "./Calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/fr";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Redux/UserReducer";
import {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
} from "../../Redux/ItemReducer";
import { FaEdit, FaTrash } from "react-icons/fa";
import CustomToolbar from "./customToolbar";

const Calendrier = (activeBoard) => {
  const dispatch = useDispatch();
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [view, setView] = useState("month");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const userRole = useSelector((state) => state.auth.user?.role);
  const userId = useSelector((state) => state.auth.user?._id);

  const [title, setTitle] = useState("");
  const [stack, setStack] = useState("");
  const [formateur, setFormateur] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [location, setLocation] = useState("");
  const [table, setTable] = useState("");
  const [nbdays, setNbdays] = useState("");
  const [tjm, setTjm] = useState("");

  const { users, status } = useSelector((state) => state.users);
  const { items } = useSelector((state) => state.items);

  useEffect(() => {
    moment.locale("fr");
    moment.updateLocale("fr", {
      week: {
        dow: 1,
      },
    });
    dispatch(getAllUsers());
    dispatch(getAllItems());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      setFilteredUsers(
        users.filter((user) => user.name !== "admin").map((user) => user._id)
      );
    }
  }, [users]);

  const localizer = momentLocalizer(moment);
  const messages = {
    allDay: "Toute la journée",
    previous: "Précédent",
    next: "Suivant",
    today: "Aujourd'hui",
    month: "Mois",
    week: "Semaine",
    day: "Jour",
    agenda: "Agenda",
    date: "Date",
    time: "Heure",
    event: "Événement",
    noEventsInRange: "Aucun événement dans cette période.",
    showMore: (total) => `+ Voir plus (${total})`,
  };

  const formateurColors = users.reduce((acc, user, index) => {
    acc[user._id] = `hsl(${(index * 100) % 360}, 70%, 50%)`;
    return acc;
  }, {});

  const filteredEvents = items.filter((item) => {
    if (userRole === "admin") {
      return filteredUsers.includes(item.formateur);
    } else {
      return item.formateur === userId;
    }
  });

  const events = filteredEvents.map((item) => ({
    title: `${item.title} - ${item.stack} - ${item.location}`,
    start: new Date(item.start),
    end: new Date(item.end),
    resource: item,
    formateur: item.formateur,
    stack: item.stack,
    location: item.location,
  }));

  const toggleUserFilter = (userId) => {
    if (filteredUsers.includes(userId)) {
      setFilteredUsers(filteredUsers.filter((id) => id !== userId));
    } else {
      setFilteredUsers([...filteredUsers, userId]);
    }
  };

  const handleViewChange = (view) => {
    setView(view);
  };

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
      table,
      nbdays,
      tjm,
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
    const start = new Date(event.start);
    const end = new Date(event.end);

    const isWeekend = (date) => date.getDay() === 6 || date.getDay() === 7;

    if (isWeekend(start) || isWeekend(end)) {
      return { style: { display: "none" } };
    }
    return { style: { backgroundColor } };
  };

  return (
    <div className="calendar-container">
      <div
        className="legend"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {userRole === "admin" && (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              color: "white",
            }}
          >
            {users
              .filter((user) => user.name !== "admin")
              .map((user) => (
                <li
                  key={user._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    margin: "5px",
                    cursor: "pointer",
                    opacity: filteredUsers.includes(user._id) ? 1 : 0.5,
                  }}
                  onClick={() => toggleUserFilter(user._id)}
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
        )}
        {userRole === "admin" && (
          <button
            onClick={handleCreateEventModal}
            style={{
              backgroundColor: "#3174ad",
              color: "white",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              height: "40px",
              cursor: "pointer",
              marginLeft: "auto",
            }}
          >
            Nouvelle formation
          </button>
        )}
      </div>

      <div className="calendar">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800 }}
          messages={messages}
          onSelectEvent={handleEditEvent}
          eventPropGetter={eventPropGetter}
          view={view}
          onView={handleViewChange}
          components={{
            toolbar: CustomToolbar,
          }}
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
                <select
                  name="Table"
                  value={table}
                  onChange={(e) => setTable(e.target.value)}
                  required
                >
                  <option value="" hidden>
                    Sélectionner une table
                  </option>
                  {activeBoard?.activeBoard?.content?.map((table) => (
                    <option key={table._id} value={table._id}>
                      {table.title}
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
                <br />
                <input
                  type="number"
                  placeholder="Nombre de jours"
                  value={nbdays}
                  onChange={(e) => setNbdays(e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="TJM"
                  value={tjm}
                  onChange={(e) => setTjm(e.target.value)}
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
