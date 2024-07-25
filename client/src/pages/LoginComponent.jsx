import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import authenticatorClient from '../service/authenticator-api-client';

const LoginComponent = ({state}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [formErrors, setFormErrors] = useState({ username: '', password: '' });
    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const login = (e) => {
        e.preventDefault();
        authenticatorClient
            .login(username, password)
            .then(() => {
                const { from } = location.state;
                navigate(from.pathname, from);
            })
            .catch((eMsg) => {
                setMessage(eMsg);
            });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === 'username') {
            setUsername(value);
            validateField(id, value);
        } else if (id === 'password') {
            setPassword(value);
            validateField(id, value);
        }
    };

    const validateField = (fieldName, value) => {
        let fieldValidationErrors = { ...formErrors };
        let usernameValidTemp = usernameValid;
        let passwordValidTemp = passwordValid;

        switch (fieldName) {
            case 'username':
                usernameValidTemp = value.length >= 6;
                fieldValidationErrors.username = usernameValidTemp ? '' : 'Username is invalid';
                break;
            case 'password':
                passwordValidTemp = value.length >= 6;
                fieldValidationErrors.password = passwordValidTemp ? '' : 'Password is too short';
                break;
            default:
                break;
        }

        setFormErrors(fieldValidationErrors);
        setUsernameValid(usernameValidTemp);
        setPasswordValid(passwordValidTemp);
        setFormValid(usernameValidTemp && passwordValidTemp);
    };

    return (
        <div className='row'>
            <h1 className="text-primary text-center">Login Component</h1>

            {message && <h4 className="alert alert-danger">{message}</h4>}

            <div className="col-sm-6 offset-sm-3">
                <Form onSubmit={login}>
                    <Form.Group controlId="username" className='mb-3'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={handleChange}
                        />
                        {formErrors.username && (
                            <Form.Text className="text-danger">{formErrors.username}</Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group controlId="password" className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={handleChange}
                        />
                        {formErrors.password && (
                            <Form.Text className="text-danger">{formErrors.password}</Form.Text>
                        )}
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={!formValid}
                        style={!formValid ? { cursor: 'not-allowed', pointerEvents: 'all' } : {}}
                    >
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default LoginComponent;
