'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Question } from '@/types/types';
import axios from 'axios';

const AttendQuizPage = () => {
  const searchParams = useSearchParams();
  const [participantName, setParticipantName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const getData = async () => {
    const participantName = searchParams.get('participantName');
    const selectedCategory = searchParams.get('selectedCategory');
    try {
      const response = await axios.post('/api/quiz', { participantName, selectedCategory });
      console.log(response.data)
      const data = response.data;
      setParticipantName(data.participantName!);
      setSelectedCategory(selectedCategory || '');
      setQuestions(data.questions || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, [searchParams]);

  const handleOptionChange = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate the score
      let correct = 0;
      questions.forEach((question, index) => {
        if (answers[index] === question.options[parseInt(question.correctOption)]) {
          correct += 1;
        }
      });
      setCorrectCount(correct);
      setIsCompleted(true);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-500 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-extrabold mb-6">Quiz Completed!</h1>
        <div className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-md text-center">
          <p className="text-lg font-semibold mb-2">Total Questions: {questions.length}</p>
          <p className="text-lg font-semibold text-green-700 mb-2">Correct Answers: {correctCount}</p>
          <p className="text-lg font-semibold text-red-700">Incorrect Answers: {questions.length - correctCount}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 flex flex-col items-center py-10 text-white">
      <h1 className="text-3xl font-bold mb-4">Quiz for {participantName}</h1>
      <p className="mb-6 text-lg">Category: {selectedCategory}</p>

      {currentQuestion ? (
        <div className="w-full max-w-lg bg-white text-black rounded-lg shadow-lg p-6">
          <p className="text-xl font-semibold mb-4">{currentQuestionIndex + 1}. {currentQuestion.question!}</p>
          <ul className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <li key={index} className="flex items-center">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={answers[currentQuestionIndex] === option}
                  onChange={() => handleOptionChange(option)}
                  className="mr-3 w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="text-lg">{option}</label>
              </li>
            ))}
          </ul>
          <button
            onClick={handleNext}
            className="w-full bg-blue-600 text-white py-2 mt-6 rounded-lg font-medium hover:bg-blue-700"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Complete'}
          </button>
        </div>
      ) : (
        <p className="text-lg font-semibold">
          {questions.length ? 'Loading questions...' : 'Sorry. No question available for this category'}
        </p>
      )}
    </div>
  );
};

export default AttendQuizPage;
