/*interface CoursePart {
  name: string;
  exerciseCount: number;
}*/

interface HeaderProps {
  name: string;
}

interface AllPartsProps {
  courseParts: CoursePart[];
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}

interface CourseSpecialPart extends CourseDescriptionPart {
  type: "special";
  requirements: [string, string];
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseDescriptionPart
  | CourseSpecialPart;

const Header = (props: HeaderProps) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};

const Part = (props: CoursePart) => {
  switch (props.type) {
    case "normal":
      return (
        <div>
          <h3>
            {props.name} {props.exerciseCount}
          </h3>
          <p>{props.description}</p>
        </div>
      );
    case "groupProject":
      if ("groupProjectCount" in props) {
        return (
          <div>
            <h3>
              {props.name} {props.exerciseCount}
            </h3>
            <p>
              project exercises {(props as CourseProjectPart).groupProjectCount}
            </p>
          </div>
        );
      } else {
        return <div>Invalid course part type</div>;
      }

    case "submission":
      if ("exerciseSubmissionLink" in props) {
        return (
          <div>
            <h3>
              {props.name} {props.exerciseCount}
            </h3>
            <p>{props.description}</p>
            <p>
              submit to {(props as CourseSubmissionPart).exerciseSubmissionLink}
            </p>
          </div>
        );
      } else {
        return <div>Invalid course part type</div>;
      }
    case "special":
      if ("requirements" in props) {
        return (
          <div>
            <h3>
              {props.name} {props.exerciseCount}
            </h3>
            <p>{props.description}</p>
            <p>
              required sills:{" "}
              {(props as CourseSpecialPart).requirements.join(", ")}
            </p>
          </div>
        );
      } else {
        return <div>Invalid course part type</div>;
      }

    default:
      return <div>Invalid course part type</div>;
  }
};

const Content = (props: AllPartsProps) => {
  return (
    <div>
      {props.courseParts.map((course, index) => {
        return (
          <div key={index}>
            <Part {...course} />
          </div>
        );
      })}
    </div>
  );
};

const Total = (props: AllPartsProps) => {
  return (
    <div>
      <h3>
        <p>
          Number of exercises{" "}
          {props.courseParts.reduce(
            (carry, part) => carry + part.exerciseCount,
            0
          )}
        </p>
      </h3>
    </div>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
