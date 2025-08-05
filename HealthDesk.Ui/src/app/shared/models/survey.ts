export interface SurveyForm {
    id?: string;
    name: string;
    title: string;
    description?: string;
    questions: QuestionForm[];
    headerImageUrl?: string | null;
    headerImage?: string | null;
    is_active: boolean;
    date?: string;
    author?: string;
    sharedWith?: string[];
    company?: string;
    responses?: any[];
    isTaken?: boolean;
}

export interface QuestionForm {
    id?: string;
    text: string;
    type: 'text' | 'radio' | 'checkbox' | 'date' | 'dropdown' | 'number';
    options?: Option[];
    required: boolean;
    numbersOnly?: boolean;
    minDate?: string;
    maxDate?: string;
    description?: string;
}

export interface Option {
    text: string;
}

export interface SurveyDto {
    id?: string;
    name: string;
    title: string;
    description?: string;
    questions: QuestionDto[];
    headerImage?: string | null;
    isActive: boolean;
    author?: string;
    sharedWith?: string[];
}

export interface QuestionDto {
    id?: string;
    text: string;
    type: string;
    description?: string;
    options?: QuestionOptionDto[];
    required: boolean;
    numbersOnly?: boolean;
    minDate?: string;
    maxDate?: string;
}

export interface QuestionOptionDto {
    text: string;
}

export interface SurveyResponse {
    id: string;
    name: string;
    title: string;
    description: string;
    questions: QuestionResponse[];
    headerImageUrl?: string | null;
    isActive: boolean;
    date: string;
    author: string;
    sharedWith: string[];
    responses: any[];
}

export interface QuestionResponse {
    id: string;
    text: string;
    type: string;
    description?: string;
    options?: Option[];
    required: boolean;
    numbersOnly?: boolean;
    minDate?: string;
    maxDate?: string;
}

export interface SurveyResponseDto {
    userId: string;
    responsesData: { [key: string]: any };
    submittedAt?: string;
}