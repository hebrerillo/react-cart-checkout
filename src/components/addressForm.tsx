import React, { useRef, useState } from "react";
import { AddressFieldset } from "./addressFieldset";

function AddressForm() {
  const formRef = useRef(null);
  //  const MANDATORY_FIELD_ERROR_MESSAGE = "Mandatory field";
  //  const INVALID_FIELD_ERROR_MESSAGE = "Invalid field";
  const [isValidated, setIsValidated] = useState(false);

  function handleClick(event: React.MouseEvent): void {
    event.preventDefault();
    const formElement = formRef.current! as HTMLFormElement;
    setIsValidated(true);
    if (formElement.checkValidity()) {
      //TODO send form
      return;
    }

    let firstError = false;
    Array.from(formElement.elements).forEach((element: Element) => {
      const inputElement = element as HTMLInputElement;
      if (!inputElement.checkValidity() && !firstError) {
        firstError = true;
        inputElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  return (
    <form
      className={`form-address ${isValidated ? "is-validated" : ""}`}
      ref={formRef}
    >
      <AddressFieldset prefix={"shipping"} />
      <button type="submit" onClick={handleClick}>
        Send
      </button>
    </form>
  );
}

export default AddressForm;
