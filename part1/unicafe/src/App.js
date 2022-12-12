import { useState } from "react";

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                {props.text} {props.value} %
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              {props.text} {props.value}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;

  const calculatePositive = () => {
    if (all === 0) {
      return 0;
    }
    return (props.good / all) * 100;
  };

  const calculateAverage = () => {
    if (all === 0) {
      return 0;
    }
    return (props.good - props.bad) / all;
  };

  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={calculateAverage()} />
      <StatisticLine text="positive" value={calculatePositive()} />
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.feedback}>{props.text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  /*const feedbackGood = () => {
    return setGood(good + 1);
  };

  const feedbackNeutral = () => {
    return setNeutral(neutral + 1);
  };

  const feedbackBad = () => {
    return setBad(bad + 1);
  };*/

  return (
    <div>
      <h1>give feedback</h1>
      <Button feedback={() => setGood(good + 1)} text="good" />
      <Button feedback={() => setNeutral(neutral + 1)} text="neutral" />
      <Button feedback={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};
export default App;
