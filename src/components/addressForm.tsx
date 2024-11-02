import React, { useRef, useState } from "react";
import { AddressFieldset } from "./addressFieldset";

/**
 * The address form component. Made up of the shipping fieldset and the billing fieldset.
 */
function AddressForm() {
  const formRef = useRef(null);
  //  const MANDATORY_FIELD_ERROR_MESSAGE = "Mandatory field";
  //  const INVALID_FIELD_ERROR_MESSAGE = "Invalid field";
  const [isValidated, setIsValidated] = useState(false);

  /**
   * Callback executed when clicking the submit button to submit the address form
   */
  function handleSubmitClick(event: React.MouseEvent): void {
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

  function handleSameShippingBillingCheckbox(event: React.ChangeEvent): void {
    console.log(event.target);
  }

  return (
    <form
      className={`form-address ${isValidated ? "is-validated" : ""}`}
      ref={formRef}
    >
      <AddressFieldset prefix={"shipping"} />
      <input
        type="checkbox"
        name="same_shipping_for_billing"
        defaultChecked
        onChange={handleSameShippingBillingCheckbox}
        value="sameBilling"
      />
      <AddressFieldset prefix={"billing"} />
      <button type="submit" onClick={handleSubmitClick}>
        Send
      </button>
    </form>
  );
}

export default AddressForm;
