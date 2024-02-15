import React, {useState, useEffect, useCallback} from "react";
import classes from './App.module.css';
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";
function App(){
  const [tasks, setTasks] = useState([] );

  const {isLoading, error, sendRequest: fetchTasks}  = useHttp();
  
  useEffect(()=>{
    const transformedTasks = (taskObj)=>{
      const loadedTask = [];
 
      for(const taskKey in taskObj){
       loadedTask.push({id: taskKey, text: taskObj[taskKey].text});
      }
      setTasks(loadedTask);
    };
    fetchTasks({url:'https://task-list-f88fa-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'}, transformedTasks);
  },[fetchTasks]);

  const taskAddHandler = (task)=>{
    setTasks((prevTasks)=> prevTasks.concat(task));
  };

  return(
   <React.Fragment>
    <NewTask onAddTask={taskAddHandler}/>
   <Tasks 
    items={tasks}
    loading={isLoading}
    error={error}
    onFetch={fetchTasks}
   />
   </React.Fragment>
  );
};

export default App;