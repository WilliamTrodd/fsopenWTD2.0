import { ContentProps } from "../types";

const Content = (props: ContentProps) => {
  return(
  <div>
    {props.parts.map(part => <p key={part.name}>{part.name} {part.exerciseCount} </p>)}
  </div>)
};

export default Content;