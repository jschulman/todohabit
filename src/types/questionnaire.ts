export type QuestionCategory =
    | 'professionalContext'
    | 'workStyle'
    | 'energyPatterns'
    | 'goalOrientation'
    | 'motivationTriggers';

export interface Question {
    id: string;
    category: QuestionCategory;
    text: string;
    type: 'text' | 'select' | 'multiSelect';
    options?: string[];
}

export interface UserResponse {
    questionId: string;
    answer: string | string[];
}

export interface TimeBlock {
    startTime: string;
    endTime: string;
    activity: string;
    category: 'deep-work' | 'shallow-work' | 'meetings' | 'break' | 'exercise' | 'personal';
    description: string;
}

export interface DaySchedule {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    blocks: TimeBlock[];
}

export interface WeeklySchedule {
    schedule: DaySchedule[];
    notes: string[];
}

export interface MethodologyResponse {
    workIntervals: string;
    energyStrategy: string;
    recommendations: string[];
    productivityBlockers: string[];
    suggestedTools: string[];
    weeklySchedule: WeeklySchedule;
    rawResponse: string;
} 