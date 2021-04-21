import React, { useState, useCallback } from 'react';
import type { FC, ReactNode } from 'react';

interface NotificationsState {
    errors: string[];
}

interface NotificationsProviderProps {
    children?: ReactNode;
}
export const NotificationsContext = React.createContext({
    errors: null,
    addError: (message: any, status: any) => { },
    removeError: () => { }
});

export const NotificationsProvider: FC<NotificationsProviderProps> = (props) => {
    const [errors, setError] = useState(null);

    const removeError = () => setError(null);

    const addError = (message, status) => setError({ message, status });

    const notificationValue = {
        errors,
        addError: useCallback((message, status) => addError(message, status), []),
        removeError: useCallback(() => removeError(), [])
    };

    return (
        <NotificationsContext.Provider value={notificationValue}>
            {props}
        </NotificationsContext.Provider>
    );
}

export default NotificationsProvider;