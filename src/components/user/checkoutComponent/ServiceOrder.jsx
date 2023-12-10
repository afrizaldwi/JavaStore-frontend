import React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import { FormControl, FormControlLabel, Radio } from "@mui/material";

function ServiceOrder() {
  return (
    <div className="lg:w-3/5 w-full mt-8 lg:mt-0 h-full bg-f4 p-4">
      <div>
        <h1 className="capitalize mb-4 text-2xl">opsi pengiriman</h1>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="biasa"
            name="radio-buttons-group"
          >
            <FormControlLabel
              className="capitalize"
              value="biasa (3 - 7 hari)"
              control={<Radio />}
              label="biasa (3 - 7 hari)"
            />
            <FormControlLabel
              className="capitalize"
              value="cepat (1 -2 hari)"
              control={<Radio />}
              label="cepat (1 -2 hari)"
            />
            <FormControlLabel
              className="capitalize"
              value="cepat (10 jam)"
              control={<Radio />}
              label="cepat (10 jam)"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}

export default ServiceOrder;
