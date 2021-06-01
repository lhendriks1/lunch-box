import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
} from "@material-ui/core";
import SimplePaper from "./Paper";
import AddressForm from "./AddressForm";
import ArrowBack from '@material-ui/icons/ArrowBack';

import { COSTS, DEFAULT, OPTIONS } from "../constants";
import Summary from "./Summary";

const LunchForm = ({ lunchBox, setLunchBox, activeLink, setActiveLink, total }) => {
  const selectBox = (key) => {
    setLunchBox({ ...DEFAULT, box: key });
  };

  const boxOptions = Object.values(OPTIONS).map((box) => {
    return (
      <div onClick={() => selectBox(box.key)} key={box.key}>
        <SimplePaper selected={box.key === lunchBox.box}>
          <h4>
            {box.displayText} (${box.cost})
          </h4>
          <p>{box.description}</p>
        </SimplePaper>
      </div>
    );
  });

  const updateCustomize = (option) => {
    const updatedCustomize = lunchBox.customize.includes(option)
      ? lunchBox.customize.filter((v) => option !== v)
      : [...lunchBox.customize, option];

    setLunchBox((current) => ({ ...current, customize: updatedCustomize }));
  };

  const updateAddress = (value) => {
    setLunchBox((current) => ({ ...current, address: value }));
  };

  const customizationOptions = OPTIONS[lunchBox.box]?.customizations.map(
    (v) => (
      <FormControlLabel
        key={v}
        control={
          <Checkbox
            checked={lunchBox.customize.includes(v)}
            onChange={() => updateCustomize(v)}
            name={v}
          />
        }
        label={`${v} ($${COSTS[v]})`}
      />
    )
  );

  return (
    <>
      <div className={`form-section ${(activeLink !== 0) && "hidden"}`}>
        <h3>Select Box</h3>
        <div className="flex centered">{boxOptions}</div>
      </div>
      <div
        className={`form-section ${
            (((activeLink === 0 && !lunchBox.box) || activeLink !== 0)) && "hidden"
        }`}
      >
      <Divider />
        <h3>Add-Ons</h3>
          <FormGroup row>{customizationOptions}</FormGroup>
          <Button
          variant="contained"
          color="primary"
          onClick={() => setActiveLink(1)}
        >
          Next
        </Button>
      </div>
      <div
        className={`form-section ${
          (activeLink !== 1) && "hidden"
        }`}
      >
          <span onClick={() => setActiveLink(0)} className='back'><ArrowBack fontSize="small"/> BACK</span>
          <h3>Delivery Options</h3>
          <AddressForm updateAddress={updateAddress} setActiveLink={setActiveLink} />
      </div>
        <div
            className={`form-section summary-page ${(activeLink !== 2) && "hidden"}`}
        >
            <span onClick={() => setActiveLink(1)} className='back'><ArrowBack fontSize="small"/> BACK</span>
            <h3>Review Your Order</h3>
            <Summary lunchBox={lunchBox} total={total}/>
            <Button variant="contained" color='primary' disabled={!lunchBox.box || !lunchBox.address.address}>Submit Order</Button>
        </div>
    </>
  );
};

export default LunchForm;
