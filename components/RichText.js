import { useState, useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import FormContainer from "../containers/FormContainer";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const RichText = ({ label, id, isRequired, control, rules = {}, error }) => {
  return (
    <FormContainer label={label} id={id} isRequired={isRequired} error={error}>
      <Controller
        name={id}
        control={control}
        rules={rules}
        render={({ field }) => (
          <ReactQuill
            theme="snow"
            value={field.value}
            onChange={(val) => field.onChange(val)}
          />
        )}
      />
    </FormContainer>
  );
};

export default RichText;
