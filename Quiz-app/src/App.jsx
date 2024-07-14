import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import rightImg from "/right.png";
import crossImg from "/cross.png";
import "./App.css";
import { allQuestion } from "./assets/data";

function App() {
  let [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [question, setQuestion] = useState(allQuestion[index]);
  let [score, setScore] = useState(0);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let optionArray = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (ans === true) {
        const imgElement = e.target.querySelector("img");
        imgElement.src = rightImg;
        setScore(++score);
        setLock(true);
      } else {
        question.answer.forEach((element, i, arr) => {
          if (element.correct === true) {
            const selectedOption = optionArray[i].current;
            selectedOption.querySelector("img").src = rightImg;
          }
          if (element.correct === false) {
            const selectedOption = optionArray[i].current;
            selectedOption.querySelector("img").src = crossImg;
          }
          setLock(true);
        });
      }
    }
  };
  const next = () => {
    if (lock === true && index < allQuestion.length - 1) {
      setIndex(++index);
      console.log(index);
      setQuestion(allQuestion[index]);
      setLock(false);
      let allImg = document.querySelectorAll("img");
      allImg.forEach((element) => {
        element.src = "";
      });
    }
  };

  const back = () => {
    if (index > 0) {
      setIndex(--index);
      console.log(index);
      setQuestion(allQuestion[index]);
      setLock(false);
      let allImg = document.querySelectorAll("img");
      allImg.forEach((element) => {
        element.src = "";
      });
    }
  };

  return (
    <>
      <div className="w-[30vw] max-h-max bg-purple-400 rounded-lg py-3 px-2 ">
        <div className="w-full h-12 flex items-center justify-between p-3 ">
          <h1 className="text-xl font-medium text-white">Quiz App</h1>
          <p className="text-sm ">
            Score : <span> {score}</span>/ {allQuestion.length}
            <span></span>
          </p>
        </div>
        <div className=" h-60  w-ful px-3  ">
          <p className="text-lg capitalize">{question.askedQuestion}</p>
          <div
            className="w-full h-10 px-4 rounded-lg border-solid border-white border mt-2 flex items-center justify-between capitalize cursor-pointer"
            ref={Option1}
            onClick={(e) => {
              checkAns(e, question.answer[0].correct);
            }}
          >
            {question.answer[0].option1}{" "}
            <span className="w-5 h-5  rounded-full bg-gray-200 ">
              <img src="" />
            </span>
          </div>
          <div
            className="w-full h-10 px-4 rounded-lg border-solid border-white border mt-2 flex items-center justify-between capitalize cursor-pointer"
            ref={Option2}
            onClick={(e) => {
              checkAns(e, question.answer[1].correct);
            }}
          >
            {question.answer[1].option2}
            <span className="w-5 h-5  rounded-full bg-gray-200 ">
              <img src="" />
            </span>
          </div>
          <div
            className="w-full h-10 px-4 rounded-lg border-solid border-white border mt-2 flex items-center justify-between capitalize cursor-pointer"
            ref={Option3}
            onClick={(e) => {
              checkAns(e, question.answer[2].correct);
            }}
          >
            {question.answer[2].option3}{" "}
            <span className="w-5 h-5  rounded-full bg-gray-200 ">
              <img src="" />
            </span>
          </div>
          <div
            className="w-full h-10 px-4 rounded-lg border-solid border-white border mt-2  flex items-center justify-between capitalize cursor-pointer"
            ref={Option4}
            onClick={(e) => {
              checkAns(e, question.answer[3].correct);
            }}
          >
            {question.answer[3].option4}{" "}
            <span className="w-5 h-5  rounded-full bg-gray-200 ">
              <img src="" />
            </span>
          </div>
        </div>
        <div className="w-full h-12 flex justify-evenly items-center p-2 ">
          <button
            className="w-24 h-10 text-lg capitalize text-white bg-violet-600  rounded-lg border border-white border-solid cursor-pointer outline-none "
            onClick={back}
          >
            Back
          </button>
          <button
            className="w-24 h-10 text-lg capitalize text-white bg-violet-600  rounded-lg border border-white border-solid cursor-pointer outline-none "
            onClick={next}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
