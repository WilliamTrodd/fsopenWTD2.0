import { TotalProps, Part } from "../types";

const Total = (props: TotalProps) => {
  return(
    <p>
      Number of exercises{" "}
      {props.parts.reduce((carry: number, part: Part) => carry + part.exerciseCount, 0)}
    </p>
  )

}

export default Total;