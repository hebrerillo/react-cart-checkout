import React from "react";

interface AddressFieldSetProps {
  prefix: string;
}

function AddressFieldset(props: AddressFieldSetProps) {
  return (
    <fieldset>
      <div className="form-row">
        <label>First name:</label>
        <input
          className="form-control"
          type="text"
          name={`${props.prefix}_firstName`}
          required
        />
      </div>
      <div className="form-row">
        <label>Last name:</label>
        <input type="text" name={`${props.prefix}_lastName`} required />
      </div>
      <div className="form-row">
        <label>Email:</label>
        <input
          className="form-control"
          type="email"
          name={`${props.prefix}_email`}
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          required
        />
      </div>
      <div className="form-row">
        <label>Phone number:</label>
        <input
          className="form-control"
          type="text"
          name={`${props.prefix}_phone`}
          required
        />
      </div>
      <div className="form-row">
        <label>Country:</label>
        <input
          className="form-control"
          type="text"
          name={`${props.prefix}_country`}
          required
        />
      </div>
      <div className="form-row">
        <label>City:</label>
        <input
          className="form-control"
          type="text"
          name={`${props.prefix}_city`}
          required
        />
      </div>
      <div className="form-row">
        <label>Zip:</label>
        <input
          className="form-control"
          type="text"
          name={`${props.prefix}_zip`}
          required
        />
      </div>
    </fieldset>
  );
}

export { AddressFieldset };
