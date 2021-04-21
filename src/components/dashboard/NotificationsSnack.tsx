import useNotifications from '../../hooks/useNotifications';
import type { FC } from 'react';
// import Modal from '../../components/Modal';

const NotificationsSnack: FC = (props) => {
    const { error, removeError } = useNotifications();

    const handleSubmit = () => {
        removeError();
    };

    return (
        <>
        </>
    )
}