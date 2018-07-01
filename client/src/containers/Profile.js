import React from 'react';
import { connect } from 'react-redux';
import { Notification } from 'react-notification';
import UserAction from '../actions/userActions';
import EventAction from '../actions/eventActions';
import ProfileNavbar from '../components/ProfileNavbar';
import ProfileBody from '../components/ProfileBody';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import MainFab from '../components/MainFab';
import LabelledFab from '../components/LabelledFab';
import FabGroup from '../components/FabGroup';
import AddCenterModal from '../components/AddCenterModal';
import AddEventModal from '../components/AddEventModal';
import AlertModal from '../components/AlertModal';
import ConfirmModal from '../components/ConfirmModal';
import Loader from '../components/Loader';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideFabGroup: true,
      showAddCenterModal: false,
      showAddEventModal: false,
      showLoader: false,
      notificationState: { message: '', show: false },
      alertModalState: { message: '', show: false, type: 'success' },
      confirmModalState: {
        message: '', show: false, confirmText: '', callback: null,
      },
    };

    // Get token from local storage
    const token = localStorage.getItem('user.token');

    // Get users details and events
    this.props.getUser(token);
    this.props.getAllEvents(token);
  }

  componentDidMount() {
    document.title = 'Profile • EventsManagerIO';
  }

  showAddCenterModal = () => {
    this.setState({
      showAddCenterModal: true,
    });
  }

  hideAddCenterModal = (e) => {
    if (e === undefined || e.target === e.currentTarget) {
      this.setState({
        showAddCenterModal: false,
      });
    }
  }

  showAddEventModal = () => {
    this.setState({
      showAddEventModal: true,
    });
  }

  hideAddEventModal = (e) => {
    if (e === undefined || e.target === e.currentTarget) {
      this.setState({
        showAddEventModal: false,
      });
    }
  }

  showLoader = () => {
    this.setState({
      showLoader: true,
    });
  }

  hideLoader = () => {
    this.setState({
      showLoader: false,
    });
  }

  showNotification = (message) => {
    this.setState({
      notificationState: { show: true, message },
    });

    setTimeout(() => {
      this.hideNotification();
    }, 2500);
  }

  hideNotification = () => {
    this.setState({
      notificationState: { ...this.state.notificationState, show: false },
    });
  }

  showAlertModal = (message, type) => {
    this.setState({
      alertModalState: { message, type, show: true },
    });
  }

  hideAlertModal = () => {
    this.setState({
      alertModalState: { message: '', type: 'success', show: false },
    });
  }

  showConfirmModal = (message, type, confirmText, callback) => {
    this.setState({
      confirmModalState: {
        message, type, show: true, confirmText, callback,
      },
    });
  }

  hideConfirmModal = () => {
    this.setState({
      confirmModalState: {
        message: '', type: 'success', show: false, confirmText: '', callback: null,
      },
    });
  }

  toggleFabGroup = () => {
    this.setState({
      hideFabGroup: !this.state.hideFabGroup,
    });
  }

  render() {
    return (
      <div>
        <ProfileNavbar />
        <ProfileBody />
        <Pagination getPageCenters={this.getPageCenters} />
        <Footer />


        <MainFab toggleFabGroup={this.toggleFabGroup} />
        <FabGroup hideFabGroup={this.state.hideFabGroup} >
          <LabelledFab icon="shield" position="3" label="Make Admin" />
          <LabelledFab icon="map-marker" position="2" label="Add New Center" showAddCenterModal={this.showAddCenterModal} />
          <LabelledFab icon="calendar" position="1" label="Add New Event" showAddEventModal={this.showAddEventModal} />
        </FabGroup>
        <AddCenterModal
          showAddCenterModal={this.state.showAddCenterModal}
          hideAddCenterModal={this.hideAddCenterModal}
          showAlertModal={this.showAlertModal}
          showLoader={this.showLoader}
          hideLoader={this.hideLoader}
          showNotification={this.showNotification}
        />
        <Loader
          showLoader={this.state.showLoader}
        />
        <AddEventModal
          showAddEventModal={this.state.showAddEventModal}
          hideAddEventModal={this.hideAddEventModal}
          showAlertModal={this.showAlertModal}
          showLoader={this.showLoader}
          hideLoader={this.hideLoader}
          showNotification={this.showNotification}
        />
        <Notification
          isActive={this.state.notificationState.show}
          message={this.state.notificationState.message}
          action=""
          onClick={() => { }}
        />
        <AlertModal
          alertModalState={this.state.alertModalState}
          hideAlertModal={this.hideAlertModal}
        />
        <ConfirmModal
          confirmModalState={this.state.confirmModalState}
          hideConfirmModal={this.hideConfirmModal}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ user, event }) => ({ user, event });

export default connect(
  mapStateToProps,
  {
    getUser: UserAction.getUser,
    getAllEvents: EventAction.getAllEvents,
  },
)(Profile);
