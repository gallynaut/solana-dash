import type { FC } from "react";
import useNotifications from "../../hooks/useNotifications";

const NotificationsSnack: FC = (props) => {
  const { error, removeError } = useNotifications();

  const handleSubmit = () => {
    removeError();
  };

  return <></>;
};
