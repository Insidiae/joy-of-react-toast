import Toast from "../Toast";
import { useToast } from "../ToastProvider";

import styles from "./ToastShelf.module.css";

function ToastShelf() {
  const { toastMessages, dismissToastMessage } = useToast();

  return (
    <ol className={styles.wrapper}>
      {toastMessages.map((message) => (
        <li className={styles.toastWrapper} key={message.id}>
          <Toast
            variant={message.variant}
            message={message.message}
            onDismiss={() => dismissToastMessage(message.id)}
          />
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
