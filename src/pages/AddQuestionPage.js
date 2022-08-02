import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '../components/UI/Button';
import Container from '../components/UI/Container';
import Title from '../components/UI/Title';
import { useAuthCtx } from '../store/authContext';
import css from '../components/Input/Input.module.css';
import { baseUrl, myFetchAuth } from '../utils';
import Feedback from '../components/Feedback/Feedback';
import '../App.css';

function AddQuestionPage() {
  const [feedback, setFeedback] = useState('');
  const [feedClass, setFeedClass] = useState('');
  const { token, userId } = useAuthCtx();

  const formik = useFormik({
    initialValues: {
      user_id: Number(userId),
      question: '',
    },
    validationSchema: Yup.object({
      question: Yup.string()
        .min(10, 'At least 10 symbols')
        .max(500, 'Maximum of 500 symbols')
        .required('Required'),
    }),

    onSubmit: async (values, { resetForm }) => {
      const fetchResult = await myFetchAuth(
        `${baseUrl}/questions`,
        token,
        'POST',
        values
      );
      if (fetchResult === 'question created') {
        setFeedback('Question was added successfuly');
        setFeedClass('success');
        resetForm({ values: '' });
        return;
      }
      setFeedback('Something went wrong... Please try again');
      setFeedClass('alert');
    },
  });

  return (
    <Container>
      <Title>Ask questions Here</Title>
      <form onSubmit={formik.handleSubmit}>
        <div className='inputBox'>
          <div className={css.inputBox}>
            <label className={css.label} htmlFor='description'>
              Your question
            </label>
            <textarea
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.question}
              className={css.input}
              name='question'
              rows='4'
              placeholder='Your question...'
            ></textarea>
          </div>
          <p className='errors'>{formik.errors.question}</p>
        </div>
        <div className='btnBox'>
          <Button type='submit' className='prime'>
            Add Question
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

export default AddQuestionPage;
