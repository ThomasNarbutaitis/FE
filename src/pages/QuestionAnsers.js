/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Cards from '../components/Card/Cards';
import SingleCard from '../components/Card/SingleCard';
import Feedback from '../components/Feedback/Feedback';
import Button from '../components/UI/Button';
import Container from '../components/UI/Container';
import Title from '../components/UI/Title';
import { useAuthCtx } from '../store/authContext';
import { baseUrl, myFetch, myFetchAuth } from '../utils';
import '../App.css';

const QuestionAnsers = () => {
  const [feedback, setFeedback] = useState('');
  const [feedClass, setFeedClass] = useState('');

  const [question, setQuestion] = useState([]);
  const [noQuestions, setNoQuestions] = useState('');

  const [answers, setAnswers] = useState([]);
  const [noAnswers, setNoAnswers] = useState('');

  const getQuestionId = useParams();

  const history = useHistory();

  const { userId, token, isUserLoggedIn } = useAuthCtx();

  async function getQuestion() {
    const fetchResult = await myFetch(
      `${baseUrl}/questions/${getQuestionId.id}`
    );
    if (fetchResult === undefined) {
      setNoQuestions('none');
      return;
    }
    setQuestion(fetchResult);
  }

  async function getAnswers() {
    const fetchResult = await myFetch(
      `${baseUrl}/answersToQuestion/${getQuestionId.id}`
    );
    // console.log('fetchResult ===', fetchResult);
    if (fetchResult === undefined) {
      setNoAnswers('none');
      return;
    }
    setAnswers(fetchResult);
  }

  function updateQuestion(id) {
    history.replace(`/question/${id}/updateQuestion`);
  }

  async function deleteQuestion() {
    window.confirm(
      'Caution! This will delete question with all the answers. Do you want to proceed?'
    );
    if (window.confirm) {
      const fetchResult = await myFetchAuth(
        `${baseUrl}/questions/${getQuestionId.id}`,
        token,
        'DELETE'
      );
      // eslint-disable-next-line no-unused-vars
      const fetchResultAnswers = await myFetchAuth(
        `${baseUrl}/allAnswers/${getQuestionId.id}`,
        token,
        'DELETE'
      );
      // console.log('fetchResult ===', fetchResult);
      if (fetchResult === 'question archived') {
        setFeedback('Question was deleted succsessfully');
        setFeedClass('success');
        setNoQuestions('none');
        setNoAnswers('none');
        return;
      }
      setFeedback('Something went wrong... Please try again later');
      setFeedClass('alert');
    }
  }

  function updateAnswer(id) {
    // console.log(`selecting answer with id ${id}`);
    history.replace(`/answer/${id}/updateAnswer`);
  }

  async function deleteAnswer(id) {
    const fetchResult = await myFetchAuth(
      `${baseUrl}/answers/${id}`,
      token,
      'DELETE'
    );
    if (fetchResult === 'answer archived') getAnswers();
  }

  function answerQuestion() {
    history.replace(`/addAnswerPage/${getQuestionId.id}`);
  }

  function goBack() {
    history.replace(`/`);
  }

  useEffect(() => {
    if (!noQuestions) getQuestion();
    if (!noAnswers) getAnswers();
  }, []);
  // console.log('answers ===', answers);
  return (
    <Container>
      <Title>Question</Title>
      <Feedback className={feedClass}>{feedback}</Feedback>
      {feedClass === 'success' && (
        <div className='btnBox'>
          <Button onClick={() => goBack()} className='prime'>
            Go to homepage
          </Button>
        </div>
      )}
      {question.length === 0 && !noQuestions && (
        <p className='loading'>Loading question... Please wait...</p>
      )}
      {question && !noQuestions && (
        <Cards>
          <SingleCard {...question}>
            {Number(userId) === question.user_id && (
              <div className='btnBox'>
                <Button
                  onClick={() => updateQuestion(question.q_id)}
                  className='prime'
                >
                  Amend question
                </Button>
                <Button onClick={() => deleteQuestion()} className='second'>
                  Delete question
                </Button>
              </div>
            )}
          </SingleCard>
          {isUserLoggedIn && (
            <div className='btnBox'>
              <Button onClick={() => answerQuestion()} className='second'>
                Answer the question
              </Button>
            </div>
          )}
        </Cards>
      )}

      <Title>Answers</Title>
      {!noAnswers && answers === undefined && (
        <p className='loading'>
          Loading question and answers... Please wait...
        </p>
      )}
      {noAnswers && (
        <p className='loading'>There are no answers to this question yet...</p>
      )}
      {answers && !noAnswers && (
        <Cards>
          {answers.map((aObj) => (
            <SingleCard key={aObj.a_id} {...aObj}>
              {Number(userId) === aObj.user_id && (
                <div className='btnBox'>
                  <Button
                    onClick={() => updateAnswer(aObj.a_id)}
                    className='prime'
                  >
                    Amend answer
                  </Button>
                  <Button
                    onClick={() => deleteAnswer(aObj.a_id)}
                    className='second'
                  >
                    Delete answer
                  </Button>
                </div>
              )}
            </SingleCard>
          ))}
        </Cards>
      )}
    </Container>
  );
};

export default QuestionAnsers;
