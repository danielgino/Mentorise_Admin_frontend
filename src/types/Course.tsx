
export type CourseDto = {
    id: number;
    courseCode: string;
    name: string;
    year: number;
    semester: string;
    majorId: number;
    majorName: string;
};

export type CreateCourseDto = {
    courseCode: string;
    name: string;
    year: number;
    semester: "A" | "B" | "SUMMER";
    majorId: number;
};



