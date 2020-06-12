import DashboardIcon from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';

import Dashboard from '../views/University/Dashboard/Dashboard';
import UserProfile from 'views/University/Profile/Profile';
import Requests from '../views/University/Requests/Requests';
import MyRequests from '../views/University/MyRequests/Requests';
import Settings from '../views/University/Settings/Settings';
import ManageStudents from '../views/University/ManageStudents/ManageStudents';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/university',
  },
  {
    path: '/blockchain',
    name: 'Blockchain',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/university',
  },
  {
    path: '/requests',
    name: 'Requests',
    icon: DashboardIcon,
    component: Requests,
    layout: '/university',
  },
  {
    path: '/my-requests',
    name: 'My Requests',
    icon: DashboardIcon,
    component: MyRequests,
    layout: '/university',
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: DashboardIcon,
    component: Settings,
    layout: '/university',
  },
  {
    path: '/manage-students',
    name: 'Manage Students',
    icon: DashboardIcon,
    component: ManageStudents,
    layout: '/university',
  },
];

export default dashboardRoutes;
