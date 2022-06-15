import { useState,useEffect } from 'react';
import './App.css';
import { TaskRow } from './components/TaskRow';
import { TaskBanner } from './components/TaskBanner';
import { TaskCreator } from './components/TaskCreator';
import { VisibilityControl } from './components/VisibilityControl';

function App() {

  const [userName, setUserName] = useState('Christian');

  const [taskItems, setTaskitems] = useState([
    {name: 'Task One', done:true},
    {name: 'Task Two', done:false},
    {name: 'Task Three', done:true},
    {name: 'Task Four', done:false},
    {name: 'Task Five', done:false},
  ]);

  const taskTableRows = (doneValue) => {
    return taskItems
    .filter(task => task.done === doneValue)
    .map(task =>(
      <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
    ))
  }

  const toggleTask = task =>
    setTaskitems(taskItems.map(t=>(t.name === task.name ? {...t, done: !t.done} : t)))

  const createNewTask = taskName =>{
    if(!taskItems.find(t=>t.name === taskName)){
      setTaskitems([...taskItems,{name:taskName,done:false}])
    }
  }

  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(()=>{
    let data = localStorage.getItem('task');
    if( data != null){
      setTaskitems(JSON.parse(data));
    } else {
      setUserName('Christian Example')
      setTaskitems([
        {name: 'Example Task One', done:true},
        {name: 'Example Task Two', done:false},
        {name: 'Example Task Three', done:true},
        {name: 'Example Task Four', done:false},
        {name: 'Example Task Five', done:false},
      ])
      setShowCompleted(true)
    }
  },[])


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  },[taskItems])









  return (
    <div className="App">

      <TaskBanner userName={userName} taskItems={taskItems}/>
      <TaskCreator callback={createNewTask}/>
      <table className='table table-stripped table-bordered'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>

      <div className='bg-secondary text-white text-center p-2'>
        <VisibilityControl
        description="Completada"
        isChecked={showCompleted}
        callback={checked => setShowCompleted(checked)}/>
      </div>

      {
        showCompleted && (
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {taskTableRows(true)}
            </tbody>
          </table>
        )
      }
    </div>
  );
}

export default App;
