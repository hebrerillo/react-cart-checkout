import React, { useRef, useState } from "react";
import { AddressFieldset } from "./addressFieldset";
import { fold, unfold } from "../utilities/collapsable";

/**
 * The address form component. Made up of the shipping fieldset and the billing fieldset.
 */
function AddressForm() {
  const formRef = useRef(null);
  const billingBlock = useRef(null);
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

  /**
   * Callback executed when the check to add a billing address changes.
   */
  function handleSameShippingBillingCheckbox(event: React.ChangeEvent): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (!checked){
      unfold(billingBlock.current);
    } else {
      fold(billingBlock.current);
    }
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
      <div className="collapsable folded" ref={billingBlock}>
        <AddressFieldset prefix={"billing"} />
      </div>
      <button type="submit" onClick={handleSubmitClick}>
        Send
      </button>
    </form>
  );
}

export default AddressForm;
