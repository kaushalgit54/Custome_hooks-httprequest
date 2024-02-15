import classes from './Tasks.module.css';
import Section from'../UI/Section';
import TaskItem from './TaskItem';
const Tasks = (props)=>{
    let taskList = <h2>No tasks found. Start Adding Some!</h2>;

    if(props.items.length >0){
        taskList = (
            <ul>
                {props.items.map((task)=>(<TaskItem key={task.id}>{task.text}</TaskItem>))}
            </ul>
        );
    }
    let content = taskList;
    if(props.error){
        content = <button onClick={props.onFetch}>Try Again</button>;
    }
    if(props.loading){
        content = "Loading tasks...";
    }
    return (
        <Section>
          <div className={classes.container}>{content}</div>
        </Section>
    );
};
export default Tasks;