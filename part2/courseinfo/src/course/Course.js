const Header = ({ course }) => {
  return (
    <div>
      <h2>
        <p key={course.id}>{course.name}</p>
      </h2>
    </div>
  );
};

const Part = ({ course }) => {
  return (
    <div>
      {course.parts.map((courseList) => (
        <p key={courseList.id}>
          {courseList.name} {courseList.exercises}
        </p>
      ))}
    </div>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      <Part course={course} />
    </div>
  );
};

const Total = ({ course }) => {
  const total = course.parts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.exercises;
  }, 0);

  return (
    <div>
      <p>
        <strong>total of {total} exercises</strong>{" "}
      </p>
    </div>
  );
};

const Course = ({ courses }) => {
  return courses.map((course) => (
    <div key={course.id}>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  ));
};

export default Course;
