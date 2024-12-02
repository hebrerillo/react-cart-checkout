import React, { useRef, useState } from "react";
import { useGlobalContext } from "src/context/global";
import { AddressFieldset } from "src/components/addressFieldset";
import { fold, unfold } from "../utilities/collapsable";

/**
 * The address form component. Made up of the shipping fieldset and the billing fieldset.
 */
function AddressForm() {
  const formRef = useRef(null);
  const shippingFieldsetRef = useRef<HTMLFieldSetElement>(null);
  const billingFieldsetRef = useRef<HTMLFieldSetElement>(null);
  const billingBlock = useRef(null);
  const { globalContextManager } = useGlobalContext();
  const [isBillingDisabled, setIsBillingDisabled] = useState(true);

  /**
   * Callback executed when clicking the submit button to submit the address form
   */
  function handleSubmitClick(event: React.MouseEvent): void {
    event.preventDefault();
    const formElement = formRef.current! as HTMLFormElement;
    shippingFieldsetRef.current?.classList.add("is-validated");
    !isBillingDisabled &&
      billingFieldsetRef.current?.classList.add("is-validated");

    if (formElement.checkValidity()) {
      //TODO send form
      return;
    }

    let firstError = false;
    Array.from(formElement.elements).forEach((element: Element) => {
      const inputElement = element as HTMLInputElement;
      if (!inputElement.checkValidity() && !firstError) {
        firstError = true;
        globalContextManager.scrollToCheckoutElement(
          inputElement.closest(".form-row"),
        );
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
    billingFieldsetRef.current?.classList.remove("is-validated");
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
    <form className="form-address" ref={formRef}>
      <fieldset ref={shippingFieldsetRef}>
        <AddressFieldset prefix={"shipping"} />
      </fieldset>
      <input
        type="checkbox"
        name="same_shipping_for_billing"
        defaultChecked
        onChange={handleSameShippingBillingCheckbox}
        value="sameBilling"
      />
      <div className="collapsable folded" ref={billingBlock}>
        <fieldset ref={billingFieldsetRef} disabled={isBillingDisabled}>
          <AddressFieldset prefix={"billing"} />
        </fieldset>
      </div>
      <button type="submit" onClick={handleSubmitClick}>
        Send
      </button>
    </form>
  );
}

export default AddressForm;
