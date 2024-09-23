import { Icons } from "../views/components/icons.js";

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
            href: "/dashboard/team",
            icon: Icons.users()
        },
        {
            title: "Projects",
            href: "/dashboard/projects",
            icon: Icons.folder()
        },
        {
            title: "Calendar",
            href: "/dashboard/calendar",
            icon: Icons.calendar()
        },
        {
            title: "Documents",
            href: "/dashboard/documents",
            icon: Icons.documents()
        },
        {
            title: "Reports",
            href: "/dashboard/reports",
            icon: Icons.reports()
        },
    ],
}