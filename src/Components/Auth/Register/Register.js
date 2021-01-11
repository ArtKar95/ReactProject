// import React, { useState } from "react";
// import { Button, Col, Container, Form, Row } from "react-bootstrap";
// import classes from "./Register.module.css";

// const Register = () => {
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({
//     email: null,
//     password: null,
//     confirmPassword: null,
//   });

//   const handleChange = ({ target: { name, value } }) => {
//     setValues({
//       ...values,
//       [name]: value,
//     });

//     setErrors({
//       ...errors,
//       [name]: null,
//     });
//   };

//   const handleSend = () => {
//     const { email, password, confirmPassword } = values;

//     let passwordMessage = null;

//     if (!confirmPassword) {
//       passwordMessage = "Please confirm password";
//     } else if (password !== confirmPassword) {
//       passwordMessage = "Passwords didn't match";
//     }

//     setErrors({
//       email: email ? null : "Email is required",
//       password: password ? null : "Password is required",
//       confirmPassword: passwordMessage,
//     });
//   };

//   return (
//     <div className={classes.main}>
//       <Container>
//         <Row className="justify-content-center">
//           <Col xs={11} sm={11} md={7}>
//             <div className={classes.form}>
//               <Form>
//                 <h2>Register page</h2>
//                 <Form.Group>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={values.email}
//                     onChange={handleChange}
//                     placeholder="Enter email"
//                     className={!!errors.email ? classes.invalid : ""}
//                   />
//                   <Form.Text className="text-danger">{errors.email}</Form.Text>
//                 </Form.Group>

//                 <Form.Group>
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     value={values.password}
//                     onChange={handleChange}
//                     placeholder="Password"
//                     className={!!errors.password ? classes.invalid : ""}
//                   />
//                   <Form.Text className="text-danger">
//                     {errors.password}
//                   </Form.Text>
//                 </Form.Group>

//                 <Form.Group>
//                   <Form.Control
//                     type="password"
//                     name="confirmPassword"
//                     value={values.confirmPassword}
//                     onChange={handleChange}
//                     placeholder="Confirm password"
//                     className={!!errors.confirmPassword ? classes.invalid : ""}
//                   />
//                   <Form.Text className="text-danger">
//                     {errors.confirmPassword}
//                   </Form.Text>
//                 </Form.Group>
//                 <Form.Group className="text-center">
//                   <Button
//                     variant="success"
//                     onClick={handleSend}
//                     className="px-5"
//                   >
//                     Register
//                   </Button>
//                 </Form.Group>
//               </Form>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Register;
