export interface Part {
  name: string,
  exerciseCount: number,
}

export interface HeaderProps {
  courseName: string
}

export interface ContentProps {
  parts: Part[]
}

export interface TotalProps {
  parts: Part[]
}