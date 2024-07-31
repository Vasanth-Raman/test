import React, { useEffect, useState, useRef } from "react";
import styles from "./FormBotPage.module.css";
import VideoPlayerCard from "../../components/FormBotComponents/BubbleComponents/VideoPlayer/VideoPlayer";
import ImageViewer from "../../components/FormBotComponents/BubbleComponents/ImageViewer/ImageViewer";
import BubbleText from "../../components/FormBotComponents/BubbleComponents/BubbleText/BubbleText";
import ButtonInput from "../../components/FormBotComponents/InputComponents/ButtonInput/ButtonInput";
import DateInput from "../../components/FormBotComponents/InputComponents/DateInput/DateInput";
import RatingInput from "../../components/FormBotComponents/InputComponents/RatingInput/RatingInput";
import TextInput from "../../components/FormBotComponents/InputComponents/TextInput/TextInput";
import BotIcon from "../../components/FormBotComponents/BubbleComponents/BotIcon/BotIcon";
import { getFormBot } from "../../api/form";
import { toast } from "react-toastify";
import { createResponse, updateResponse } from "../../api/response";
import { useParams } from "react-router-dom";

const FormBotPage = () => {
  const [formFlow, setFormFlow] = useState([]);
  const [theme, setTheme] = useState("#FFFFFF");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInputType, setIsInputType] = useState(false);
  const [responses, setResponses] = useState({});
  const [responseId, setResponseId] = useState(null);
  const scrollRef = useRef();

  const { formId } = useParams();

  useEffect(() => {
    getForm(formId);
  }, [formId]);

  const getForm = async (formId) => {
    try {
      const response = await getFormBot(formId);

      if (response.success || response.status === 200) {
        const { flow, theme } = response?.data?.data;

        setFormFlow(flow);
        setTheme(theme);
      } else {
        toast.error("Please try again");
      }
    } catch (error) {
      toast.error(
        "An error occurred during fetching folders. Please try again later."
      );
    }
  };

  useEffect(() => {
    createNewResponse();
  }, [formId]);

  const createNewResponse = async () => {
    try {
      const response = await createResponse(formId);

      if (response.success || response.status === 201) {
        setResponseId(response?.data?.responseId);
      } else {
        toast.error("Please try again");
      }
    } catch (error) {
      toast.error(
        "An error occurred during creating response. Please try again later."
      );
    }
  };

  useEffect(() => {
    if (!isInputType) {
      const interval = setInterval(() => {
        if (currentIndex < formFlow.length) {
          const currentItem = formFlow[currentIndex];
          if (currentItem.bubbleOrInput === "bubble") {
            setCurrentIndex((prevIndex) => prevIndex + 1);
          } else if (currentItem.bubbleOrInput === "input") {
            setIsInputType(true);
          }
        }
      }, 1000);
      handleScrollToBottom();
      return () => clearInterval(interval);
    }
  }, [currentIndex, formFlow, isInputType]);

  const handleScrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleUserInput = async (title, response) => {
    try {
      const responses = await updateResponse(responseId, title, response);

      if (responses.success || responses.status === 201) {
        setResponses((prev) => ({
          ...prev,
          [title]: response,
        }));
        setIsInputType(false);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    } catch (error) {
      toast.error("An error occurred during submission. Please try again.");
    }
  };

  return (
    <div className={styles.formBotWrapper} style={{ background: theme }}>
      <div className={styles.chatContainer}>
        {formFlow.slice(0, currentIndex + 1).map((item, index) => {
          const { type, data } = item.content;
          const title = item.title;
          if (item.bubbleOrInput === "bubble") {
            return (
              <div key={index} className={styles.bubbleContainer}>
                <BotIcon />
                <div className={styles.bubbleContent}>
                  {(() => {
                    switch (type) {
                      case "text":
                        return <BubbleText text={data} />;
                      case "image":
                      case "gif":
                        return <ImageViewer src={data} />;
                      case "video":
                        return <VideoPlayerCard src={data} />;
                      default:
                        return null;
                    }
                  })()}
                </div>
              </div>
            );
          } else if (item.bubbleOrInput === "input") {
            switch (type) {
              case "text":
                return (
                  <TextInput
                    key={index}
                    title={title}
                    type="text"
                    placeholder={"Enter your text"}
                    onUserInput={(response) => handleUserInput(title, response)}
                  />
                );
              case "number":
                return (
                  <TextInput
                    key={index}
                    title={title}
                    type="number"
                    placeholder={"Enter a number"}
                    onUserInput={(response) => handleUserInput(title, response)}
                  />
                );
              case "email":
                return (
                  <TextInput
                    key={index}
                    title={title}
                    type="email"
                    placeholder={"Enter your email"}
                    onUserInput={(response) => handleUserInput(title, response)}
                  />
                );
              case "phone":
                return (
                  <TextInput
                    key={index}
                    title={title}
                    type="tel"
                    placeholder={"Enter your phone"}
                    onUserInput={(response) => handleUserInput(title, response)}
                  />
                );

              case "date":
                return (
                  <DateInput
                    key={index}
                    title={title}
                    onUserInput={(response) => handleUserInput(title, response)}
                  />
                );
              case "rating":
                return (
                  <RatingInput
                    key={index}
                    title={title}
                    onUserInput={(response) => handleUserInput(title, response)}
                  />
                );
              case "button":
                return (
                  <ButtonInput
                    key={index}
                    title={title}
                    data={data}
                    onUserInput={(response) => handleUserInput(title, response)}
                  />
                );
              default:
                return null;
            }
          } else {
            return null;
          }
        })}
        <div ref={scrollRef}></div>
      </div>
    </div>
  );
};

export default FormBotPage;
