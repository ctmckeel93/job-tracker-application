export type UserData = {
    id: number,
    first_name: string,
    last_name: string,
    email: string
}

export type JobData = {
    id: number,
    company: string,
    position: string,
    user: UserData,
    notes: any[]
}

