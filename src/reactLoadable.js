import Loadable from 'react-loadable';
import Loading from './components/Loading';

export const Error = Loadable({
    loader: () => import('./components/Error'),
    loading: Loading,
});
export const Complete = Loadable({
    loader: () => import('./components/Complete'),
    loading: Loading,
});
export const Login = Loadable({
    loader: () => import('./components/Login'),
    loading: Loading,
});
export const Meetups = Loadable({
    loader: () => import('./components/Meetups'),
    loading: Loading,
});
export const MeetupDetails = Loadable({
    loader: () => import('./components/MeetupDetails'),
    loading: Loading,
});
export const RsvpComponent = Loadable({
    loader: () => import('./components/RsvpComponent'),
    loading: Loading,
});
