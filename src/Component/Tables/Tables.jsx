import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemsByFormateur } from "../../Redux/ItemReducer";
import "./Tables.css";

const Tables = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.items);
  const [openMonths, setOpenMonths] = useState([]);
  const formateurId = useSelector((state) => state.auth.user._id);
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

  const groupedItems = groupItemsByMonth(items);

  return (
    <div className="table-view-container">
      {Object.keys(groupedItems).map((month) => (
        <div key={month} className="month-section">
          <div className="month-header" onClick={() => toggleMonth(month)}>
            <span>{month}</span>
            <span>{openMonths.includes(month) ? "▼" : "▶"}</span>
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
                    <th>Modalité</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedItems[month].map((item) => (
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td>{item.stack}</td>
                      <td>{`${new Date(
                        item.start
                      ).toLocaleDateString()} - ${new Date(
                        item.end
                      ).toLocaleDateString()}`}</td>
                      <td>{item.location}</td>
                      <td>{item.modalite}</td>
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
