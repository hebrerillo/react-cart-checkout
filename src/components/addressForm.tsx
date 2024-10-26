import React, { useRef, useState } from "react";

function AddressForm() {
  const formRef = useRef(null);
  const MANDATORY_FIELD_ERROR_MESSAGE = "Mandatory field";
  const INVALID_FIELD_ERROR_MESSAGE = "Invalid field";
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
    <form className={`form-address ${isValidated ? 'is-validated' : ''}`} ref={formRef}>
      <div className="form-row">
        <label>First name:</label>
        <input className="form-control" type="text" name="firstName" required />
        <p className="invalid-feedback">{MANDATORY_FIELD_ERROR_MESSAGE}</p>
      </div>
      <div className="form-row">
        <label>Last name:</label>
        <input type="text" name="lastName" required />
      </div>
      <div className="form-row">
        <label>Email:</label>
        <input className="form-control"
          type="email"
          name="email"
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          required
        />
        <p className="invalid-feedback">{INVALID_FIELD_ERROR_MESSAGE}</p>
      </div>
      <div className="form-row">
        <label>Phone number:</label>
        <input className="form-control" type="text" name="phone" required />
      </div>
      <div className="form-row">
        <label>Country:</label>
        <input className="form-control" type="text" name="country" required />
      </div>
      <div className="form-row">
        <label>City:</label>
        <input className="form-control" type="text" name="city" required />
      </div>
      <div className="form-row">
        <label>Zip:</label>
        <input className="form-control" type="text" name="zip" required />
      </div>
      <button type="submit" onClick={handleClick}>
        Send
      </button>
    </form>
  );
}

export default AddressForm;
