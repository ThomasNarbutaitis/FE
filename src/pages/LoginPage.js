import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import Feedback from '../components/Feedback/Feedback';
import Container from '../components/UI/Container';
import { useAuthCtx } from '../store/authContext';
import Input from '../components/Input/Input';
import Button from '../components/UI/Button';
import { baseUrl, myFetch } from '../utils';
import Title from '../components/UI/Title';
import '../App.css';

function LoginPage() {
  const [feedback, setFeedback] = useState('');
  const [feedClass, setFeedClass] = useState('');
  const history = useHistory();
  const ctx = useAuthCtx();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string()
        .min(4, 'At least 5 symbols')
        .max(15, 'Maximum of 15 symbols')
        .required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const fetchResult = await myFetch(`${baseUrl}/login`, 'POST', values);
      // console.log('fetchResult ===', fetchResult);
      if (fetchResult.token) {
        setFeedback('Login was successful');
        setFeedClass('success');
        ctx.login(fetchResult.token, fetchResult.payload.userId);
        history.replace('/');
      }
      setFeedback('Login was unsuccessful... Please try again');
      setFeedClass('alert');
    },
  });
  return (
    <Container>
      <Title>Please Login Here</Title>
      <form onSubmit={formik.handleSubmit}>
        <div className='inputBox'>
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            name='username'
            type='text'
            placeholder='username'
          >
            Username
          </Input>
          <p className='errors'>{formik.errors.username}</p>
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name='password'
            type='password'
            placeholder='secret1'
          >
            Password
          </Input>
          <p className='errors'>{formik.errors.password}</p>
        </div>
        <div className='btnBox'>
          <Button type='submit' className='prime'>
            Login
          </Button>
          <Button
            type='button'
            onClick={() => formik.resetForm()}
            className='second'
          >
            Reset
          </Button>
        </div>
        <Feedback className={feedClass}>{feedback}</Feedback>
      </form>
    </Container>
  );
}

export default LoginPage;
