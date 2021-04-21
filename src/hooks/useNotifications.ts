import { useContext } from 'react';
import { NotificationsContext } from '../contexts/NotificationsContext';

const useNotifications = (): any => useContext(NotificationsContext);

export default useNotifications;
