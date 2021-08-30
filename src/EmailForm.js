import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import "./EmailForm.css";
import insurance from "./images/insurance1.jpg"
import emailjs from "emailjs-com";
import apiKey from './emailkey';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import jones from './images/jones.png'

function EmailForm(props) {
  const [userName, setUserName] = useState(""); //first name
  const [lastName, setLastName] = useState(""); //last name
  const [email, setEmail] = useState(""); // email
  const [phone, setPhone] = useState(""); // phone number

  const ALL_LETTERS = /^[A-Za-z]+$/; //all letters options (validation)
  const ALL_NUMBERS = /^[0-9]+$/; // all numbers options (validation)
  const MAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // mail format (validation)

  // send form function by email
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm(apiKey.SERVICE_ID, apiKey.TEMPLATE_ID, e.target, apiKey.USER_ID)
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset()
  }

  // validation function before submit
  function validate() {
    if ((userName.length >= 2 && userName.match(ALL_LETTERS)) &&
      ((lastName.length >= 2 && lastName.match(ALL_LETTERS))) &&
      ((phone.match(ALL_NUMBERS) && phone.length == 10)) &&
      ((email.length > 0 && email.match(MAIL_FORMAT)))) {

      return true;
    }
    else {
      return false;
    }
  }

  return (
    <div className="LoginPhoto">
      <img src={insurance} className="insurancePic"></img>
      <label className="jonesFormHeader">Jones Form</label>
      <div className="formDiv">
        <img className="JonesPic" src={jones}></img>
        <Form onSubmit={sendEmail} validated={!validate}>
          <FormGroup controlId="First Name">
            <FormControl
              autoFocus
              className="userName"
              placeholder="First Name"
              type="text"
              name="firstname"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup controlId="Last Name">
            <FormControl
              autoFocus
              className="lastName"
              placeholder="Last Name"
              name="lastname"
              type="text"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup controlId="Email" bssize="large">
            <FormControl
              autoFocus
              className="Email"
              placeholder="Mail Adress"
              name="email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup controlId="Phone" bssize="large">
            <FormControl
              autoFocus
              className="Phone"
              placeholder="Phone Number"
              name="phone"
              type="phone"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup controlId="Subject" bssize="large">
            <FormControl
              autoFocus
              className="Subject"
              placeholder="Subject"
              name="subject"
            />
          </FormGroup>
          <TextareaAutosize
            className="textMessage"
            rowsMin={5}
            rowsMax={5}
            variant="outlined"
            placeholder="Your message"
            name="message"
          />
          <button type="submit" disabled={!validate()} className={validate() ? "submitButton" : "disableButton"}>Send Message</button>
        </Form>
      </div>

    </div >
  );
}

export default EmailForm;