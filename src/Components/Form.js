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
            <label>이름</label>
            <Field
              onChange={handleChange}
              value={values.userName}
              onBlur={handleBlur}
              name="userName"
            />
            <br />
            {errors.userName && touched.userName && (
              <div id="feedback">{errors.userName}</div>
            )}
            <br />
            <label>전화번호</label>
            <Field
              name="number"
              value={values.number}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            {errors.number && touched.number && (
              <div id="feedback">{errors.number}</div>
            )}
            <br />
            <button type="submit">Submit</button>
            {contactInfo.user && <View contactInfo={contactInfo} />}
          </Form>
        </Formik>
      </div>
    );
  }
}

// values 초기화, 사용자 입력 검증, onSubmit 처리
const MyTestForm = withFormik({
  mapPropsToValues: () => ({
    id: "",
    userName: "",
    number: ""
  }),

  validate: values => {
    const errors = {};
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
    FormikBag.props.submitUser({ ...values, id: uuid() });
    FormikBag.resetForm();
  },
  displayName: "BasicForm"
})(MyForm);

MyTestForm.propTypes = {
  submitUser: PropTypes.func.isRequired,
  contactInfo: PropTypes.object.isRequired
};

const mapPropsToState = state => ({
  contactInfo: state.contactInfo
});

export default connect(
  mapPropsToState,
  { submitUser }
)(MyTestForm);
