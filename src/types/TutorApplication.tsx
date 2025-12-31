
export interface TutorApplicationDto {
    id: number;
    userId:number
    fullName:string
    nationalId: string;
    majorName: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    role: 'STUDENT' | 'TUTOR';
    transcriptUrl: string;
    createdAt: string;
}