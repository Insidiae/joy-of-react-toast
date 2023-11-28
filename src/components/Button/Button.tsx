import React from "react";

import styles from "./Button.module.css";

function Button({
  className = "",
  ...delegated
}: { className?: string } & React.HTMLAttributes<HTMLButtonElement>) {
  return <button className={`${styles.button} ${className}`} {...delegated} />;
}

export default Button;
