import React from "react";
import { INVALID_FIELD_ERROR_MESSAGE, MANDATORY_FIELD_ERROR_MESSAGE } from "../constants";

interface AddressFieldSetProps {
  prefix: string;
  disabled: boolean;
}

function AddressFieldset(props: AddressFieldSetProps) {
  const isBilling = (props.prefix === "billing") as boolean;
  const shippingBlock = (
    <React.Fragment>
      <div className="form-row">
        <label>Email:</label>
        <input
          className="form-control"
          type="email"
          name={`${props.prefix}_email`}
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          required
        />
        <div className="invalid-feedback">{INVALID_FIELD_ERROR_MESSAGE}</div>
      </div>
      <div className="form-row">
        <label>Phone number:</label>
        <input
          className="form-control"
          type="text"
          name={`${props.prefix}_phone`}
          required
        />
        <div className="invalid-feedback">{MANDATORY_FIELD_ERROR_MESSAGE}</div>
      </div>
      <div className="form-row">
        <label>Company:</label>
        <input
          className="form-control"
          type="text"
          name={`${props.prefix}_company`}
        />
      </div>
    </React.Fragment>
  );
  return (
    <fieldset disabled={props.disabled}>
      <div className="form-row">
        <label>First name:</label>
        <input
          className="form-control"
          type="text"
          name={`${props.prefix}_firstName`}
          required
        />
        <div className="invalid-feedback">{MANDATORY_FIELD_ERROR_MESSAGE}</div>
      </div>
      <div className="form-row">
        <label>Last name:</label>
        <input type="text" name={`${props.prefix}_lastName`} required />
        <div className="invalid-feedback">{MANDATORY_FIELD_ERROR_MESSAGE}</div>
      </div>
      {!isBilling && shippingBlock}
      <div className="form-row">
        <label>Country:</label>
        <input
          className="form-control"
          type="text"
          name={`${props.prefix}_country`}
          required
        />
        <div className="invalid-feedback">{MANDATORY_FIELD_ERROR_MESSAGE}</div>
      </div>
      <div className="form-row">
        <label>City:</label>
        <input
          className="form-control"
          type="text"
          name={`${props.prefix}_city`}
          required
        />
        <div className="invalid-feedback">{MANDATORY_FIELD_ERROR_MESSAGE}</div>
      </div>
      <div className="form-row">
        <label>Zip:</label>
        <input
          className="form-control"
          type="text"
          name={`${props.prefix}_zip`}
          required
        />
        <div className="invalid-feedback">{MANDATORY_FIELD_ERROR_MESSAGE}</div>
      </div>
    </fieldset>
  );
}

export { AddressFieldset };
