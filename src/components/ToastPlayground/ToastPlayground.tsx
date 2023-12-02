import React from "react";

import Button from "../Button";
import { VARIANT_OPTIONS, useToast } from "../ToastProvider";

import styles from "./ToastPlayground.module.css";

function validateMessage(
  message: FormDataEntryValue | null
): message is string {
  return typeof message === "string";
}

function validateVariant(
  variant: FormDataEntryValue | null
): variant is (typeof VARIANT_OPTIONS)[number] {
  return typeof variant === "string" && VARIANT_OPTIONS.includes(variant);
}

function ToastPlayground() {
  const { addToastMessage } = useToast();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const message = formData.get("message");
    const variant = formData.get("variant");

    if (!validateMessage(message)) {
      throw new Error("Message must be a string.");
    }

    if (!validateVariant(variant)) {
      throw new Error("Invalid variant type.");
    }

    addToastMessage({
      id: crypto.randomUUID(),
      message,
      variant,
    });

    form.reset();
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <form onSubmit={handleSubmit} className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              name="message"
              className={styles.messageInput}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variant, index) => (
              <label htmlFor={`variant-${variant}`} key={variant}>
                <input
                  id={`variant-${variant}`}
                  type="radio"
                  name="variant"
                  value={variant}
                  defaultChecked={index === 0}
                />
                {variant}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
