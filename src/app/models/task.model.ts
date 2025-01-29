export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export enum TaskCategory {
    HOUSEHOLD = 'HOUSEHOLD',
    SHOPPING = 'SHOPPING',
    GARDENING = 'GARDENING',
    OTHER = 'OTHER'
}

export interface Task {
    id: number;
    title: string;
    description: string;
    category: TaskCategory;
    status: TaskStatus;
    deadline: string;
    assignedTo: string;
    points: number;
}