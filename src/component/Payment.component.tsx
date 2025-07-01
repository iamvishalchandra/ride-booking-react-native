import React from "react";
import { ButtonComponent } from "./index.component";

const PaymentComponent = () => {
  const openPaymentSheet = () => {};
  return (
    <>
      <ButtonComponent
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default PaymentComponent;
