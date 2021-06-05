import React from "react";
import { OPTIONS } from "../constants";

const Summary = ({ lunchBox, total }) => {
  const customizations = lunchBox.customize.join(", ");
  return (
    <div className="summary">
      <div>
        <div>
          <h4 className="inline m-5">Order Details: </h4>{' '}
            {OPTIONS[lunchBox.box]?.displayText}
          {customizations && (
            <p className="inline m-5">{`, ${customizations}`}</p>
          )}
        </div>
        <div>
          {lunchBox.address.address && (
            <>
              <h4 className="m-5">Delivery Details:</h4>
              <p className="m-5">
                {lunchBox.address.name} {lunchBox.address.address}
              </p>
              {lunchBox.address.notes && (
                <p className="m-5">
                  Notes for driver: {lunchBox.address.notes}
                </p>
              )}
            </>
          )}
        </div>
      </div>
        <hr/>
        <h3 className="flex m-5">
            <span>Total: ${total.toFixed(2)} </span>
        </h3>
    </div>
  );
};

export default Summary;
