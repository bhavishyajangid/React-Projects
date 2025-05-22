
import { useSelector } from 'react-redux'
import { AllTask, Loader, Tasks } from '../../export'

const CompletedTask = () => {
    const {completedTask , loading} = useSelector(state => state.taskSlice)
     if (loading) {
    return <Loader/>
  }
 console.log(completedTask , "completedtask");
 
  return (
    <AllTask tasks={completedTask.task} heading="Completed Task"/>
  )
}

export default CompletedTask