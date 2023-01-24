
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDepthPart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDepthPart {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDepthPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDepthPart {
  type: "special";
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

export interface Part {
  name: string,
  exerciseCount: number,
}

export interface HeaderProps {
  courseName: string
}

export interface ContentProps {
  parts: CoursePart[]
}

export interface TotalProps {
  parts: Part[]
}

