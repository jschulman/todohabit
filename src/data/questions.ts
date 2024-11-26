import { Question } from '../types/questionnaire';

export const questions: Question[] = [
    // Professional Context
    {
        id: 'prof_1',
        category: 'professionalContext',
        text: 'What is your primary professional role?',
        type: 'text'
    },
    {
        id: 'prof_2',
        category: 'professionalContext',
        text: 'How would you describe your typical workday structure?',
        type: 'select',
        options: [
            'Highly structured with set schedules',
            'Flexible with core hours',
            'Completely flexible/self-managed',
            'Varies significantly day-to-day'
        ]
    },
    {
        id: 'prof_3',
        category: 'professionalContext',
        text: 'What percentage of your work requires deep focus vs. reactive tasks?',
        type: 'select',
        options: [
            'Mostly deep focus (80/20)',
            'Balanced (50/50)',
            'Mostly reactive (20/80)',
            'Varies significantly'
        ]
    },
    {
        id: 'prof_4',
        category: 'professionalContext',
        text: 'What are your main productivity challenges?',
        type: 'multiSelect',
        options: [
            'Procrastination',
            'Distractions',
            'Time management',
            'Energy management',
            'Task prioritization',
            'Meeting overload',
            'Email management'
        ]
    },

    // Work Style
    {
        id: 'work_1',
        category: 'workStyle',
        text: 'How do you prefer to break down large projects?',
        type: 'select',
        options: [
            'Detailed upfront planning',
            'Incremental planning as I go',
            'Minimal planning, just start',
            'Depends on the project'
        ]
    },
    {
        id: 'work_2',
        category: 'workStyle',
        text: 'What environment helps you focus best?',
        type: 'multiSelect',
        options: [
            'Complete silence',
            'Background noise',
            'Music',
            'Coffee shop atmosphere',
            'Home office',
            'Traditional office',
            'Outdoors'
        ]
    },
    {
        id: 'work_3',
        category: 'workStyle',
        text: 'How do you prefer to track tasks and deadlines?',
        type: 'select',
        options: [
            'Digital task manager',
            'Physical notebook/planner',
            'Calendar blocking',
            'Simple to-do lists',
            'Combination of methods'
        ]
    },

    // Energy Patterns
    {
        id: 'energy_1',
        category: 'energyPatterns',
        text: 'When are you most productive during the day?',
        type: 'select',
        options: [
            'Early morning',
            'Late morning',
            'Early afternoon',
            'Late afternoon',
            'Evening',
            'Late night'
        ]
    },
    {
        id: 'energy_2',
        category: 'energyPatterns',
        text: 'How long can you typically maintain focused work before needing a break?',
        type: 'select',
        options: [
            '25 minutes or less',
            '25-45 minutes',
            '45-90 minutes',
            '90+ minutes',
            'Varies significantly'
        ]
    },
    {
        id: 'energy_3',
        category: 'energyPatterns',
        text: 'What activities help you recharge during the workday?',
        type: 'multiSelect',
        options: [
            'Short walks',
            'Exercise',
            'Meditation',
            'Power naps',
            'Social interaction',
            'Quiet time',
            'Hobby activities'
        ]
    },

    // Goal Orientation
    {
        id: 'goal_1',
        category: 'goalOrientation',
        text: 'How do you prefer to approach goals?',
        type: 'select',
        options: [
            'Big picture to details',
            'Details to big picture',
            'Balanced approach',
            'Flexible/situational'
        ]
    },
    {
        id: 'goal_2',
        category: 'goalOrientation',
        text: 'What motivates you most to complete tasks?',
        type: 'multiSelect',
        options: [
            'Personal achievement',
            'Recognition from others',
            'Meeting deadlines',
            'Learning new things',
            'Financial rewards',
            'Making progress visible',
            'Helping others'
        ]
    },
    {
        id: 'goal_3',
        category: 'goalOrientation',
        text: 'How do you prefer to measure progress?',
        type: 'select',
        options: [
            'Quantitative metrics',
            'Qualitative achievements',
            'Milestone completion',
            'Feedback from others',
            'Personal satisfaction'
        ]
    },

    // Motivation Triggers
    {
        id: 'motiv_1',
        category: 'motivationTriggers',
        text: 'What typically causes you to lose motivation?',
        type: 'multiSelect',
        options: [
            'Unclear objectives',
            'Lack of progress',
            'Too many tasks',
            'Insufficient challenge',
            'Limited resources',
            'Lack of feedback',
            'Repetitive work'
        ]
    },
    {
        id: 'motiv_2',
        category: 'motivationTriggers',
        text: 'What helps you stay accountable?',
        type: 'multiSelect',
        options: [
            'Public commitments',
            'Accountability partner',
            'Regular check-ins',
            'Progress tracking',
            'Deadline pressure',
            'Personal goals',
            'Team expectations'
        ]
    },
    {
        id: 'motiv_3',
        category: 'motivationTriggers',
        text: 'How do you prefer to celebrate achievements?',
        type: 'select',
        options: [
            'Personal rewards',
            'Sharing with others',
            'Taking time off',
            'Reflection and planning',
            'Moving to next challenge'
        ]
    }
]; 