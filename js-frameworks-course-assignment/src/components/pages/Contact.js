import React from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Heading from "../Layout/Heading"
import FormError from "../forms/FormError";
import { MINIMUM_FIRST_NAME_CHARACTERS, MINIMUM_LAST_NAME_CHARACTERS, MINIMUM_MESSAGE_CHARACTERS, SUBJECTS } from "../../constants/Registration"

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your first name")
    .min(MINIMUM_FIRST_NAME_CHARACTERS, `Your first name must have at least ${MINIMUM_FIRST_NAME_CHARACTERS} characters`),
  lastName: yup
    .string()
    .required("Please enter your last name")
    .min(MINIMUM_LAST_NAME_CHARACTERS, `Your last name must have at least ${MINIMUM_LAST_NAME_CHARACTERS} characters`),
  email: yup
    .string()
    .required("Please enter you email")
    .email(`Please enter a valid email address`),
  message: yup
    .string()
    .required("Please enter your message")
    .min(MINIMUM_MESSAGE_CHARACTERS, `Your message must have at least ${MINIMUM_MESSAGE_CHARACTERS} characters`),
});

function Contact() {

    const [submitted, setSubmitted] = useState(false);
  
    const {
      register,
      handleSubmit,
      control,
      reset,
      formState: { errors }
  } = useForm({
      resolver: yupResolver(schema)
  });
  
  function onSubmit(data) {
    console.log(data);
    setSubmitted(true);
    reset();
}

console.log(errors);

  return (
    <div className="contactWrapper">
      <Heading title="Contact" />
      {submitted && <p className="success">Your message was sent</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputWrapper">
            {errors.firstName && <FormError>{errors.firstName.message}</FormError>}
            <label className="formLabel">First Name</label>
            <input {...register("firstName")} />
        </div>
        <div className="inputWrapper">
            {errors.lastName && <FormError>{errors.lastName.message}</FormError>}
            <label className="formLabel">Last Name</label>
            <input {...register("lastName")} />
        </div>
        <div className="inputWrapper">
            {errors.email && <FormError>{errors.email.message}</FormError>}
            <label className="formLabel">Email address</label>
            <input {...register("email")} />
        </div>
        <div className="inputWrapper">
            <label className="formLabel">Subject</label>
            <Controller
                name="subjects"
                control={ control }
                render={({ field }) => <Select isMulti options={ SUBJECTS } {...field} />}
            />
        </div>
        <div className="inputWrapper">
            {errors.message && <FormError>{errors.message.message}</FormError>}
            <label className="formLabel">Message</label>
            <input {...register("message")} />
        </div>

        <button variant="info" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Contact

