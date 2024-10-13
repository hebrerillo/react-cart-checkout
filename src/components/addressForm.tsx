import React from "react";

function AddressForm() {
  return (
    <form>
      <input type="text" name="firstName" required />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default AddressForm;
