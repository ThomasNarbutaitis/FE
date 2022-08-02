/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import Feedback from '../components/Feedback/Feedback';
import Button from '../components/UI/Button';
import Container from '../components/UI/Container';
import Title from '../components/UI/Title';
import { useAuthCtx } from '../store/authContext';
import { baseUrl, myFetch, myFetchAuth } from '../utils';
import css from '../components/Input/Input.module.css';
import '../App.css';
import { useHistory, useParams } from 'react-router-dom';

function UpdateQuestion() {
  const [feedback, setFeedback] = useState('');
  const [feedClass, setFeedClass] = useState('');
  const { token } = useAuthCtx();

  const [formValues, setFormValues] = useState([]);

  const history = useHistory();

  const getQuestionId = useParams();

  async function getQuestion() {
    const fetchResult = await myFetch(
      `${baseUrl}/questions/${getQuestionId.id}`
    );
    // console.log('fetchResult ===', fetchResult.question);
    setFormValues(fetchResult.question);
  }

  useEffect(() => {
    getQuestion();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { formValues },
    validationSchema: Yup.object({
      question: Yup.string()
        .min(10, 'At least 10 symbols')
        .max(500, 'Maximum of 500 symbols')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      const fetchResult = await myFetchAuth(
        `${baseUrl}/questions/${getQuestionId.id}`,
        token,
        'PATCH',
        values
      );
      // console.log('fetchResult ===', fetchResult);
      if (fetchResult === 'question updated') {
        setFeedback('Question was updated successfully');
        setFeedClass('success');
        return;
      }
      setFeedback('Something went wrong... Please try again later');
      setFeedClass('alert');
    },
  });

  function goBack() {
    history.replace(`/QuestionAnswer/${getQuestionId.id}`);
  }
  return (
    <Container>
      <Title>Update your question Here</Title>
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
              defaultValue={formValues}
            ></textarea>
          </div>
          <p className='errors'>{formik.errors.question}</p>
        </div>
        <div className='btnBox'>
          <Button type='submit' className='prime'>
            Update Question
          </Button>
          <Button type='button' onClick={() => goBack()} className='second'>
            Go back
          </Button>
        </div>
        <Feedback className={feedClass}>{feedback}</Feedback>
      </form>
    </Container>
  );
}

export default UpdateQuestion;
