import * as React from 'react';
import {
  ViewState,
  EditingState,
  AppointmentModel,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  Toolbar,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
// import { TextField } from '@material-ui/core';

const appointments = [
  { id: 0, startDate: '2023-05-17T09:00', endDate: '2023-05-17T10:00', title: 'Meeting' },
  { id: 1, startDate: '2023-05-18T11:00', endDate: '2023-05-18T12:00', title: 'Lunch' },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentViewName: 'month',
      currentDate: '2023-05-17',
      appointments: appointments,
      deletingAppointmentId: null,
    };
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
    this.commitChanges = ({ added, changed, deleted }) => {
      let { appointments } = this.state;
      if (added){
        const startingAddedId =
          appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 0;
        appointments = [
          ...appointments,
          { id: startingAddedId, ...added },
        ];
      }
      if (changed){
        appointments = appointments.map((appointment) => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
        ));
      }
      if (deleted !== undefined) {
        appointments = appointments.filter((appointment) => appointment.id !== deleted);
      }
      this.setState({ appointments, deletingAppointmentId: null });
    };
    this.deleteAppointment = () => {
      const { deletingAppointmentId, appointments } = this.state;
      this.setState({
        appointments: appointments.filter((appointment) => appointment.id !== deletingAppointmentId),
        deletingAppointmentId: null,
      });
    };
  }
  handleCellClick = (date) => {
    const newAppointment = {
      startDate: date,
      endDate: date,
      title: 'New Event',
    };
    this.setState((prevState) => ({
      appointments: [...prevState.appointments, newAppointment],
    }));
  };
  handleDeleteButtonClick = (appointmentId) => {
    this.deleteAppointment(appointmentId);
  };
  deleteAppointment = (appointmentId) => {
    const { appointments } = this.state;
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentId
    );
    this.setState({ appointments: updatedAppointments });
  };
  render() {
    const { currentDate, currentViewName, appointments, deletingAppointmentId } = this.state;
    const AppointmentTooltipContent = ({
      appointmentData,
      onDeleteButtonClick,
      ...restProps
    }) => {
      const handleDeleteButtonClick = () => {
        onDeleteButtonClick(appointmentData.id);
        console.log(appointmentData.id)
      };
    
      return (
        <AppointmentTooltip.Content
          {...restProps}
          appointmentData={appointmentData}
          showDeleteButton
          onDeleteButtonClick={handleDeleteButtonClick}
        />
      );
    };
    const AppointmentFormContainer = ({ children, ...restProps }) => {
      return (
        <AppointmentForm.Container {...restProps}>
          
          {children
          }
          {/* <TextField
            label="Location"
            name="location"
            margin="normal"
            fullWidth
          /> */}        

        </AppointmentForm.Container>
      );
    };

    return (
      <div>
        <Scheduler data={appointments}>
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentDateChange={this.currentDateChange}
            onCurrentViewNameChange={this.currentViewNameChange}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />      
          <Toolbar />
          <DateNavigator />
          <MonthView name="month" onCellClick={this.handleCellClick} />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
            contentComponent={AppointmentTooltipContent}
            showCloseButton
          />
          <AppointmentForm
            showAllDay={false}
            showRepeat={false}
            containerComponent={AppointmentFormContainer}
          />
        </Scheduler>
      </div>
    );
  }
}

export default App;
