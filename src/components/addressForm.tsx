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
  const [isBillingDisabled, setIsBillingDisabled] = useState(true);

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
   * Enable billing address
   */
  function enableBillingAddress() {
    setIsBillingDisabled(false);
  }

  /**
   * Disable billing address
   */
  function disableBillingAddress() {
    setIsBillingDisabled(true);
  }

  /**
   * Callback executed when the check to add a billing address changes.
   */
  function handleSameShippingBillingCheckbox(event: React.ChangeEvent): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (!checked) {
      enableBillingAddress();
      unfold(billingBlock.current);
    } else {
      fold(billingBlock.current, true, disableBillingAddress);
    }
  }

  return (
    <form
      className={`form-address ${isValidated ? "is-validated" : ""}`}
      ref={formRef}
    >
      <AddressFieldset prefix={"shipping"} disabled={false} />
      <input
        type="checkbox"
        name="same_shipping_for_billing"
        defaultChecked
        onChange={handleSameShippingBillingCheckbox}
        value="sameBilling"
      />
      <div className="collapsable folded" ref={billingBlock}>
        <AddressFieldset prefix={"billing"} disabled={isBillingDisabled} />
      </div>
      <button type="submit" onClick={handleSubmitClick}>
        Send
      </button>
    </form>
  );
}

export default AddressForm;
