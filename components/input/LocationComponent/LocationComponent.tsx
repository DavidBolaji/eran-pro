import useAddress from "@/hooks/useAddress";
import useCountry from "@/hooks/useCountry";
import { Field, useFormikContext } from "formik";
import React from "react";
import FormikNormalInput from "../formik-normal-input";
import FormikSelectInput from "../formik-select-input";

const LocationComponent: React.FC<{
  city: string;
  state: string;
  country: string;
  address: string;
  disabled?: boolean;
  align?: number;
}> = ({
  country,
  city: cName,
  state: sName,
  address,
  disabled = false,
  align,
}) => {
  const { countries, setStates } = useCountry();
  const { city, fetchCity, setCity, states, fetchState } = useAddress();
  const {
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = useFormikContext();

  return (
    <>
      <div className="grid grid-cols-10 pb-6 gap-x-6">
        <div className="col-span-5">
          <Field
            name={country}
            options={countries ?? []}
            as={FormikSelectInput}
            placeholder={"Select Country"}
            onChange={(e: any) => {
              handleChange(e);
              setCity([]);
              setStates([]);
              fetchState(e.target.value);
              setFieldValue(sName!, "");
              setFieldValue(country, e.target.value);
            }}
            onBlur={(e: any) => {
              handleBlur(e);
              setFieldTouched(country);
            }}
            disabled={disabled}
            align={align}
          />
        </div>

        <div className="col-span-5">
          <Field
            name={sName}
            options={states ?? []}
            as={FormikSelectInput}
            placeholder={"Select state"}
            onChange={(e: any) => {
              handleChange(e);
              setCity([]);
              setFieldValue(cName!, "");
              fetchCity(e.target.value);

              setFieldValue(sName, e.target.value);
            }}
            onBlur={(e: any) => {
              handleBlur(e);
              setFieldTouched(sName);
            }}
            disabled={disabled}
            align={align}
          />
        </div>
      </div>
      <div className="grid grid-cols-10 pb-6 gap-x-6">
        <div className="col-span-5">
          <Field
            name={cName}
            disabled={disabled}
            options={city ?? []}
            as={FormikSelectInput}
            placeholder={"Select City/Town"}
            onChange={(e: any) => {
              handleChange(e);
              setFieldValue(cName!, e.target.value);
            }}
            onBlur={(e: any) => {
              handleBlur(e);
              setFieldTouched(cName!);
            }}
            align={align}
          />
        </div>

        <div className="col-span-5">
          <Field
            name={address}
            as={FormikNormalInput}
            placeholder={"House number and street name"}
            onChange={(e: any) => {
              handleChange(e);
            }}
            onBlur={(e: any) => {
              handleBlur(e);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LocationComponent;
