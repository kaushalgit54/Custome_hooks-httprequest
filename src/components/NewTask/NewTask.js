import useHttp from "../../hooks/use-http";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import { useState } from "react";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();
  
   const createTask = (taskText, taskData)=>{
      const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
   };

  const enteredTaskHandler = async (taskText) => {
    sendTaskRequest({
      url: "https://task-list-f88fa-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      method: "POST",
      body: {text: taskText},
      headers: {
            "content-type": "application/json",
          },
    },createTask.bind(null, taskText));

  }
  return (
    <Section>
      <TaskForm onEnteredTask={enteredTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
