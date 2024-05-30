export const API_URL = "http://localhost:3000/api/"

interface Category {
    id: number,
    label: string,
    color: string
}

export const CATEGORIES: Record<string, Category> = {
    details: {
        id: 1,
        label: "Job Details",
        color: "#4ade80"
    },
    description: {
        id: 2,
        label: "Job Description",
        color:"#fb923c"
    },
    research: {
        id: 3,
        label: "Company Research",
        color:"#818cf8"
    },
    application: {
        id: 4,
        label: "Application Process",
        color: "#22d3ee"
    },
    interview: {
        id: 5,
        label: "Interview Prep",
        color: "#f87171"
    },
    networking: {
        id: 6,
        label: "Networking",
        color: "#60a5fa"
    },
    feedback: {
        id: 7,
        label: "Feedback",
        color: "#c084fc"
    }
}