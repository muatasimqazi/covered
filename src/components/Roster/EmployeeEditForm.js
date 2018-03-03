//@ts-check
import React from 'react';
import PaperCard from '../PaperCard';
import { observer } from 'mobx-react';
import { dataStore } from '../../DataStore'

@observer
class EmployeeEditForm extends React.Component {
    componentDidMount() {
        console.log(dataStore.getEmployee(this.props.match.params.id))
    }

    render() {

       
        console.log(dataStore.selectedEmployee)
        return (
            <PaperCard
                title="Site"
            >

                <h3>{dataStore.selectedEmployee.firstName}</h3>
            </PaperCard>
        );
    }
}
export default EmployeeEditForm