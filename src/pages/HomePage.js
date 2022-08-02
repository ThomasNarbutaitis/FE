/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useEffect } from 'react';
import SingleCard from '../components/Card/SingleCard';
import Container from '../components/UI/Container';
import { baseUrl, myFetch } from '../utils';
import Cards from '../components/Card/Cards';
import Title from '../components/UI/Title';
import '../App.css';
import { useHistory } from 'react-router-dom';
import Button from '../components/UI/Button';

function HomePage() {
  const [questions, setQuestions] = useState([]);
  const [numAnswers, setNumAnswers] = useState([]);
  const [noQuestions, setNoQuestions] = useState('');
  const [sortOrder, setSortOrder] = useState('DESC');

  function sortByDate() {
    const newSortOrder = sortOrder === 'DESC' ? 'ASC' : 'DESC';
    setSortOrder(newSortOrder);
    let NewQuestionsArr = [...questions];
    if (sortOrder === 'DESC') {
      NewQuestionsArr.sort((a, b) => {
        return new Date(b.created) - new Date(a.created);
      });
      setQuestions(NewQuestionsArr);
    } else {
      NewQuestionsArr.sort((a, b) => {
        return new Date(a.created) - new Date(b.created);
      });
      setQuestions(NewQuestionsArr);
    }
  }

  const history = useHistory();

  async function getQuestions() {
    const fetchResult = await myFetch(`${baseUrl}/questions`);
    // console.log('fetchResult ===', fetchResult);
    if (fetchResult.length === 0) {
      setNoQuestions('none');
      return;
    }
    const fetchResultAnswers = await myFetch(`${baseUrl}/answers`);
    // console.log('fetchResultAnswers ===', fetchResultAnswers);
    setQuestions(fetchResult);
    setNumAnswers(fetchResultAnswers);
  }

  function selectQuestion(id) {
    // console.log('selecting Q with id', id);
    history.replace(`/QuestionAnswer/${id}`);
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <Container>
      <Title>Questions</Title>
      <div className='btnBox'>
        <Button onClick={() => sortByDate()} type='button' className='prime'>
          Sort by date: {sortOrder}
        </Button>
      </div>
      {questions.length === 0 && !noQuestions && (
        <p className='loading'>Loading questions... Please wait...</p>
      )}
      {noQuestions && (
        <p className='loading'>
          There aren't any questions yet... Please add questions...
        </p>
      )}
      <Cards>
        {questions.map((qObj) => (
          <SingleCard
            className='canSelect'
            onClick={() => selectQuestion(qObj.q_id)}
            key={qObj.q_id}
            {...qObj}
          >
            <strong>Answers: </strong>
            {[...numAnswers].reduce((acc, aObj) => {
              if (qObj.q_id === aObj.question_id) {
                return acc + 1;
              }
              return acc;
            }, 0)}
          </SingleCard>
        ))}
      </Cards>
    </Container>
  );
}

export default HomePage;
