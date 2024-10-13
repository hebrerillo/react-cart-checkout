import React from "react";

function AddressForm() {
  return (
    <form className="form-address">
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
        <input type="email" name="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default AddressForm;
