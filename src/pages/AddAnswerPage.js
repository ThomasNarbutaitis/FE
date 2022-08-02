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
import { useHistory, useParams } from 'react-router-dom';

function AddAnswerPage() {
  const [feedback, setFeedback] = useState('');
  const [feedClass, setFeedClass] = useState('');
  const { token, userId } = useAuthCtx();

  const history = useHistory();

  const getQuestionId = useParams();

  const formik = useFormik({
    initialValues: {
      user_id: Number(userId),
      question_id: getQuestionId.id,
      answer: '',
    },
    validationSchema: Yup.object({
      answer: Yup.string()
        .min(10, 'At least 10 symbols')
        .max(500, 'Maximum of 500 symbols')
        .required('Required'),
    }),

    onSubmit: async (values, { resetForm }) => {
      const fetchResult = await myFetchAuth(
        `${baseUrl}/answers`,
        token,
        'POST',
        values
      );
      if (fetchResult === 'answer created') {
        setFeedback('Answer was added successfuly');
        setFeedClass('success');
        resetForm({ values: '' });
        return;
      }
      setFeedback('Something went wrong... Please try again');
      setFeedClass('alert');
    },
  });

  function goBack() {
    history.replace(`/QuestionAnswer/${getQuestionId.id}`);
  }

  return (
    <Container>
      <Title>Answer question Here</Title>
      <form onSubmit={formik.handleSubmit}>
        <div className='inputBox'>
          <div className={css.inputBox}>
            <label className={css.label} htmlFor='description'>
              Your answer
            </label>
            <textarea
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.answer}
              className={css.input}
              name='answer'
              rows='4'
              placeholder='Your answer...'
            ></textarea>
          </div>
          <p className='errors'>{formik.errors.answer}</p>
        </div>
        <div className='btnBox'>
          <Button type='submit' className='prime'>
            Add Answer
          </Button>
          <Button
            type='button'
            onClick={() => formik.resetForm()}
            className='second'
          >
            Reset
          </Button>
          <Button onClick={() => goBack()} type='button' className='prime'>
            Go back
          </Button>
        </div>
        <Feedback className={feedClass}>{feedback}</Feedback>
      </form>
    </Container>
  );
}

export default AddAnswerPage;
