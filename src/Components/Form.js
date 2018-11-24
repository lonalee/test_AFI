import React, { Component } from "react";
import { withFormik, Form, Field, Formik } from "formik";

import { connect } from "react-redux";
import { submitUser } from "../Actions/submit";

import View from "./View";
import PropTypes from "prop-types";

import uuid from "uuid";

class MyForm extends Component {
  render() {
    const {
      values,
      touched,
      errors,
      handleSubmit,
      handleChange,
      handleBlur,
      contactInfo
    } = this.props;
    return (
      <div>
        <Formik>
          <Form onSubmit={handleSubmit}>
            {/*onSubmit prop에 binding을 해야 withFormik에 handleSubmit이 작동함*/}
            <label>NAME</label>
            <Field
              onChange={handleChange}
              value={values.userName}
              onBlur={handleBlur}
              name="userName"
            />
            <br />
            {errors.userName && touched.userName && (
              <div id="feedback" style={{ marginTop: "20px" }}>
                {errors.userName}
              </div>
            )}
            <br />
            <label>Cell Phone</label>
            <Field
              name="number"
              value={values.number}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            {errors.number && touched.number && (
              <div id="feedback" style={{ marginTop: "20px" }}>
                {errors.number}
              </div>
            )}
            <br />
            <button type="submit">Submit</button>
            {console.log("errors", errors)}

            {/* {console.log("after handleSubmit", { contactInfo })}
            {console.log("after handleSubmit", values)} */}
            {contactInfo.user && (
              <View style={{ marginTop: "20px" }} contactInfo={contactInfo} />
            )}
          </Form>
        </Formik>
      </div>
    );
  }
}

const MyTestForm = withFormik({
  mapPropsToValues: () => ({
    id: "",
    userName: "",
    number: ""
  }),

  // Custom sync validation
  validate: (values, props) => {
    const errors = {};
    console.log(props);
    // -----------------------------------validate Name----------------------------- //
    if (!values.userName) {
      errors.userName = "Required";
    } else if (values.userName) {
      const arr = values.userName.split("");
      for (let i = 0; i < arr.length; i++) {
        if (!/^[a-z]|[A-Z]/i.test(arr[i])) {
          errors.userName = "English ONLY";
        } else if (arr.length > 8)
          errors.userName = "Name must be under 8 characters";
      }
    }
    if (!values.number) {
      errors.number = "Required";
    } else if (values.number) {
      const arr = values.number.split("");
      for (let i = 0; i < arr.length; i++) {
        if (!/^[0-9]/i.test(arr[i])) {
          errors.number = "Invalid Number";
        } else if (values.number.length > 11) {
          errors.number = "Number must be under 12 digits";
        }
      }
    }
    return errors;
  },
  handleSubmit: (values, FormikBag) => {
    //  values and the "FormikBag" are passed,
    // which includes an object containing a subset of the injected props and methods
    console.log("FORMIKBAG****** : ", FormikBag);
    FormikBag.props.submitUser({ ...values, id: uuid() });
    FormikBag.resetForm();
    console.log("after", values);
  },
  displayName: "BasicForm"
})(MyForm);

MyTestForm.propTypes = {
  submitUser: PropTypes.func.isRequired,
  contactInfo: PropTypes.object.isRequired,
  errors: PropTypes.string
};

const mapPropsToState = state => ({
  contactInfo: state.contactInfo,
  errors: state.errors
});

export default connect(
  mapPropsToState,
  { submitUser }
)(MyTestForm);
