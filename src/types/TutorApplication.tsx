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
    applicationType?: 'INITIAL' | 'UPDATE';
}

export type TutorApplicationsQuery = {
    page?: number;
    size?: number;
    status?: "PENDING" | "APPROVED" | "REJECTED";
    nationalId?: string;
    sort?: string;
};

export type TutorApplicationScopeDto = {
    scopeType: "MAJOR" | "YEAR" | "COURSE";
    courseId?: number | null;
    courseName?: string | null;
    year?: number | null;
};

export type TutorApplicationDetailDto = {
    id: number;
    userId: number;
    fullName: string;
    nationalId: string;
    majorId?: number | null;
    majorName?: string | null;
    status: "PENDING" | "APPROVED" | "REJECTED";
    requestText?: string | null;
    transcriptUrl?: string;
    createdAt: string;
    adminComment?: string | null;
    reviewedByName?: string | null;
    reviewedAt?: string | null;
    scopes: TutorApplicationScopeDto[];
    applicationType?: "INITIAL" | "UPDATE";
    currentScopes?: TutorApplicationScopeDto[];
    addedScopes?: TutorApplicationScopeDto[];
    removedScopes?: TutorApplicationScopeDto[];
    unchangedScopes?: TutorApplicationScopeDto[];
};


export type ApplicationActionResponse = {
    applicationId: number;
    status: "PENDING" | "APPROVED" | "REJECTED";
    reviewerId?: number | null;
    reviewedAt?: string | null;
    promotedToTutor?: boolean;
};
