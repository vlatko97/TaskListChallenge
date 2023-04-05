import { FetchTask } from './components/FetchTask';
import { AddTask } from './components/AddTask';
import { DetailsTask } from './components/DetailsTask';

const AppRoutes = [
  {
    index: true,
    element: <FetchTask />
  },
  {
    path: '/fetchtask',
    element: <FetchTask />
  },
  {
    path: '/fetchtask/:taskname',
    element: <DetailsTask />
  },
  {
    path: '/addtask',
    element: <AddTask />
  },
  {
    path: '/task/edit/:taskname',
    element: <AddTask />
  }
];

export default AppRoutes;
