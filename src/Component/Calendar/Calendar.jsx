import React, { useEffect, useState } from "react";
import "./Calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Redux/UserReducer";
import { createItem, getAllItems } from "../../Redux/ItemReducer";

const Calendrier = () => {
  const dispatch = useDispatch();
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [title, setTitle] = useState("");
  const [stack, setStack] = useState("");
  const [formateur, setFormateur] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [location, setLocation] = useState("");

  const { users, status } = useSelector((state) => state.users);
  const { items } = useSelector((state) => state.items);

  useEffect(() => {
    // if (status === "idle") {
    moment.locale("fr");
    dispatch(getAllUsers());
    dispatch(getAllItems());
    // }
  }, []);

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
    console.log("selected event", selectedEvent.formateur);
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

    console.log("item avant dispatch", newItem);

    dispatch(createItem(newItem));

    setTitle("");
    setStack("");
    setFormateur("");
    setStart("");
    setEnd("");
    setLocation("");
    setIsCreateEventModalOpen(false);
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
      {/* <div className="buttonback">
        <button onClick={() => window.history.back()}>Retour</button>
      </div> */}

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
        <>
          <div className="modal-backdrop"></div>
          <div className="create-event-modal">
            <div className="modal-content">
              <div className="modal-header">
                <p>Nouvelle formation</p>
                <button onClick={() => setIsCreateEventModalOpen(false)}>
                  X
                </button>
              </div>
              <div className="modal-body">
                {/* Formulaire contrôlé */}
                <form onSubmit={handleCreateEventSubmit}>
                  <select
                    name="Formateur"
                    id="formateur"
                    value={formateur}
                    onChange={(e) => setFormateur(e.target.value)}
                    required
                  >
                    <option value="" hidden>
                      Sélectionner un formateur
                    </option>
                    {users && users.length > 0 ? (
                      users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>Aucun utilisateur disponible</option>
                    )}
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
        </>
      )}
      {isEditEventModalOpen && selectedEvent && (
        <>
          <div className="modal-backdrop"></div>
          <div className="edit-event-modal">
            <div className="modal-content">
              <div className="modal-header">
                <p>Informations sur la formation</p>
                <button onClick={() => setIsEditEventModalOpen(false)}>
                  X
                </button>
              </div>
              <div className="modal-body">
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
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Calendrier;
