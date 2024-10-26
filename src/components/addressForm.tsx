import React, { useRef } from "react";

function AddressForm() {
  const formRef = useRef(null);

  function handleClick(event: React.MouseEvent): void {
    event.preventDefault();
    console.log("clicking and preventing default", event, formRef);
    const formElement = formRef.current! as HTMLFormElement;
    formElement.classList.add("was-validated");
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
    <form className="form-address" ref={formRef}>
      <div className="form-row">
        <label>First name:</label>
        <input type="text" name="firstName" required />
      </div>
      <div className="form-row">
        <label>Last name:</label>
        <input type="text" name="lastName" required />
      </div>
      <div className="form-row">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          required
        />
      </div>
      <div className="form-row">
        <label>Phone number:</label>
        <input type="text" name="phone" required />
      </div>
      <div className="form-row">
        <label>Country:</label>
        <input type="text" name="country" required />
      </div>
      <div className="form-row">
        <label>City:</label>
        <input type="text" name="city" required />
      </div>
      <div className="form-row">
        <label>Zip:</label>
        <input type="text" name="zip" required />
      </div>
      <button type="submit" onClick={handleClick}>
        Enviar
      </button>
    </form>
  );
}

export default AddressForm;
