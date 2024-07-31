import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Flow.module.css";
import FlowSidebar from "../FlowSidebar/FlowSidebar";
import FlowStartFlag from "../../../assets/icons/flow-start-icon.svg";
import BubbleCard from "../BubbleCard/BubbleCard";
import InputFlowCard from "../InputCard/InputFlowCard/InputFlowCard";
import InputButtonCard from "../InputCard/InputButtonCard/InputButtonCard";
import { bubbleTypeData, inputTypeData } from "../../../utils/constants";
import { useSearchParams, useParams } from "react-router-dom";
import { setFolderId, setFormData } from "../../../redux/slices/formFieldSlice";
import { setFlow } from "../../../redux/slices/formFlowSlice";
import { getSingleForm } from "../../../api/form";
import { toast } from "react-toastify";

const Flow = ({ onIdChange }) => {
  const flow = useSelector((store) => store.flows.flowitems);
  const dispatch = useDispatch();

  const { id } = useParams();

  const [param] = useSearchParams();
  const folderId = param.get("folderId");

  //to get id to navBar
  useEffect(() => {
    if (onIdChange) {
      onIdChange(id);
    }
    if (id) {
      getForm(id);
    }
  }, [id, onIdChange]);

  // useEffect(() => {

  // }, [id]);

  useEffect(() => {
    if (folderId) {
      dispatch(setFolderId(folderId));
    }
  }, [folderId, dispatch]);

  const getForm = async (formId) => {
    try {
      const response = await getSingleForm(formId);
      if (response.success || response.status === 200) {
        const { data } = response.data;
        dispatch(
          setFormData({
            formName: data.formName,
            theme: data.theme,
            folderId: data.folderId,
          })
        );
        dispatch(setFlow(data.flow));
      } else {
        toast.error(response?.data?.message || "Login failed");
      }
    } catch (error) {
      toast.error(
        "An error occurred during fetchin data. Please try again later."
      );
    }
  };

  return (
    <div className={styles.flowWrapper}>
      <div className={styles.sidebarConatiner}>
        <FlowSidebar />
      </div>
      <div className={styles.flowContainer}>
        <div className={styles.flowStart}>
          <img src={FlowStartFlag} alt="flow start flag" />
          <p>Start</p>
        </div>
        <div className={styles.formFlows}>
          {flow.map((item, index) => {
            if (item.bubbleOrInput === "bubble") {
              const bubbleDatas = bubbleTypeData[item.content.type];
              if (bubbleDatas) {
                return (
                  <BubbleCard
                    key={index + 1}
                    logoType={bubbleDatas.logoType}
                    title={item.title}
                    placeholder={bubbleDatas.placeholder}
                    index={index}
                  />
                );
              }
            } else if (item.bubbleOrInput === "input") {
              if (item.content.type === "button") {
                return (
                  <InputButtonCard
                    key={index + 1}
                    title={item.title}
                    index={index}
                  />
                );
              } else {
                const inputDatas = inputTypeData[item.content.type];
                return (
                  <InputFlowCard
                    key={index + 1}
                    title={item.title}
                    placeholder={inputDatas.placeholder}
                    index={index}
                  />
                );
              }
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Flow;
