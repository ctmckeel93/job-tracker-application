export const API_URL = process.env.NODE_ENV === "development" ? "http:localhost:3000/api" : "https://noted-two.vercel.app/api"

interface Category {
    id: number,
    label: string,
    color: string,
    isShowing: boolean
}

export const CATEGORIES: Record<string, Category> = {
    details: {
        id: 1,
        label: "Job Details",
        color: "#4ade80",
        isShowing: true
    },
    description: {
        id: 2,
        label: "Job Description",
        color:"#fb923c",
        isShowing: true
    },
    research: {
        id: 3,
        label: "Company Research",
        color:"#818cf8",
        isShowing: true
    },
    application: {
        id: 4,
        label: "Application Process",
        color: "#22d3ee",
        isShowing: true
    },
    interview: {
        id: 5,
        label: "Interview Prep",
        color: "#f87171",
        isShowing: true
    },
    networking: {
        id: 6,
        label: "Networking",
        color: "#60a5fa",
        isShowing: true
    },
    feedback: {
        id: 7,
        label: "Feedback",
        color: "#c084fc",
        isShowing: true
    }
}