
import { useSelector } from 'react-redux';
import { AllTask, GridCards } from '../../export';

const EmployeeDashboard = () => {

 const {allTask} = useSelector(state => state.taskSlice)
 
    return (
        <>
        <GridCards/>
        <AllTask tasks={allTask} />
        </>
    );
};

export default EmployeeDashboard;
