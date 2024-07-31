import React, { useEffect, useState } from "react";
import styles from "./Response.module.css";
import { useParams } from "react-router-dom";
import { getResponses } from "../../../api/response";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Calendar from "../../../assets/icons/calendar-regular.svg";

const Response = ({ onIdChange }) => {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);
  const formFlow = useSelector((store) => store.flows.flowitems);
  console.log(formFlow);

  //to get id to navBar
  useEffect(() => {
    if (onIdChange) {
      onIdChange(id);
    }
  }, [id, onIdChange]);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const response = await getResponses(id);
      if (response.success || response.status === 200) {
        console.log(response?.data.data);
        setResponses(response.data.data);
      } else {
        toast.error(response?.data?.message || "Fetching response failed");
      }
    } catch (error) {
      toast.error(
        "An error occurred during getting responses. Please try again later."
      );
    }
  };

  // console.log(responses);
  // console.log(responses.responses);
  //analytics
  const totalViews = responses.length;
  // console.log(totalViews);
  const totalStarts = responses.filter(
    (response) => response.responses.length > 0
  ).length;

  const completionRate = ((totalStarts / totalViews) * 100).toFixed(2);

  // extracting input type title from the flow (redux slice)
  const inputTitles = formFlow
    .filter((item) => item.title.startsWith("Input"))
    .map((item) => item.title);

  // to remove th eprefix input from the title so thet it can render in tablr head
  const clearTitle = (title) => {
    return title.replace(/^Input\s+/g, "").trim();
  };
  if (totalViews < 1) {
    return (
      <div className={styles.noResponse}>
        <p>No Response yet collected</p>
      </div>
    );
  }
  return (
    <div className={styles.resWraapper}>
      <div className={styles.statContainer}>
        <div className={`${styles.stat} ${styles.views}`}>
          <h2>Views</h2>
          <p>{totalViews}</p>
        </div>
        <div className={`${styles.stat} ${styles.starts}`}>
          <h2>Starts</h2>
          <p>{totalStarts}</p>
        </div>
        <div className={`${styles.stat} ${styles.rate}`}>
          <h2>Completion rate</h2>
          <p>{completionRate}%</p>
        </div>
      </div>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className={styles.calImg}>
                <img src={Calendar} alt="calendar icon" /> Submitted At
              </th>
              {inputTitles.map((title, index) => (
                <th key={index}>{clearTitle(title)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {responses.map((response, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{response.firstInteractionTime}</td>
                {inputTitles.map((title, idx) => {
                  // to find if response is avilable
                  const foundResponse = response.responses.find(
                    (resp) => resp.title === title
                  );
                  return (
                    <td key={idx}>
                      {foundResponse ? foundResponse.response : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Response;
