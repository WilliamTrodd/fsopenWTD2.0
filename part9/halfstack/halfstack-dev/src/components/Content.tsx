import { ContentProps, CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({part}: {part: CoursePart}) => {
  switch (part.type) {
    case "normal":
      return(
        <p>
          <b>{part.name} {part.exerciseCount}</b><br/>
          <i>{part.description}</i>
        </p>
      );
      break;
    case "groupProject":
      return(
        <p>
          <b>{part.name} {part.exerciseCount}</b><br/>
          project exercises {part.groupProjectCount}
        </p>
      )
    case "submission":
      return(
        <p>
          <b>{part.name} {part.exerciseCount}</b><br/>
          <i>{part.description}</i><br/>
          submit to: {part.exerciseSubmissionLink}
        </p>
      )
    case "special":
      return(
        <p>
          <b>{part.name} {part.exerciseCount}</b><br/>
          <i>{part.description}</i><br/>
          submit to: {part.requirements.join(', ')}
        </p>
      )
    default:
        return assertNever(part);
  }
}

const Content = (props: ContentProps) => {
  return(
  <div>
    {props.parts.map(part => <Part key={part.name} part={part}/>)}
  </div>)
};

export default Content;