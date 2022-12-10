

import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthService from "../services/AuthService";

interface Props {

}

const LoginPage = (props: Props) => {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
      };

    const validationSchema = () => {
        return Yup.object().shape({
            username: Yup
                    .string()
                    .required("User name is required"),
            password: Yup
                    .string()
                    .required("Password is required"),
        });
    }

    const handleLogin = (formValue: { username: string; password: string }) => {
        const { username, password } = formValue;
        
        setLoading(true);
        setMessage("");

        AuthService.login(username, password)
            .then(() => navigate("/"), 
                error => {
                    setLoading(false);
                    
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage);
                }
            )
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                <Form>
                    <div>
                        <label htmlFor="username">User name</label>
                        <Field name="username" type="text" />
                        <ErrorMessage name="username" component="div" />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>

                    <div>
                        <button type="submit" disabled={loading}>
                        Login
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                        </div>
                    )}
                </Form>
            </Formik>
        </div>
    )
}

export default LoginPage;