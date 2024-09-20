import { Icons } from "../components/icons.js";

export const dashboardConfig = {
    seoSettings: {
        title: "Dashboard",
        description: "Your app's dashboard.",
    },
    mainNav: [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: Icons.home()
        },
        {
            title: "Team",
            href: "/team",
            icon: Icons.users()
        },
        {
            title: "Projects",
            href: "/projects",
            icon: Icons.folder()
        },
        {
            title: "Calendar",
            href: "/calendar",
            icon: Icons.calendar()
        },
        {
            title: "Documents",
            href: "/documents",
            icon: Icons.documents()
        },
        {
            title: "Reports",
            href: "/reports",
            icon: Icons.reports()
        },
    ],
}