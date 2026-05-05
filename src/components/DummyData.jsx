
import { MdDashboard} from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { GrCompliance } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { VscChecklist } from "react-icons/vsc";
import { SiSimpleanalytics } from "react-icons/si";
import { IoSchoolSharp,IoChevronForward } from "react-icons/io5";
import { BiSolidHelpCircle } from "react-icons/bi";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';


export const SidebarItemData = [
    {
        id: 1,
        itemName: 'Dashboard',
        icon: <MdDashboard/>,
        link: '/',
    },
    {
        id: 2,
        itemName: 'Incident Report',
        icon: <TbReport/>,
        link: '/incident',
    },
    {
        id: 3,
        itemName: 'Compliance Management',
        icon: <GrCompliance/>,
        link: '/compliance',
    },
    {
        id: 4,
        itemName: 'Monitoring',
        icon: <DragIndicatorIcon/>,
        chevIcon:<IoChevronForward/>,
        subItems:[
            {
                itemName:'Solid waste',
                link:'/solidWast',
            },
            {
                itemName:'Energy efficiency',
                link:'/energyEfficiency',
            },
            {
                itemName:'Water efficiency',
                link:'/waterEfficiency',
            },
            {
                itemName:'Bills',
                link:'/bills',
            }
        ]
    },

    {
        id: 5,
        itemName: 'Inspection Checklist',
        icon: <VscChecklist/>,
        link: '/inspections',
    },
    {
        id: 6,
        itemName: 'Analytics & Report',
        icon: <SiSimpleanalytics/>,
        link: '/analytics',
    },
    {
        id: 7,
        itemName: 'Training Portal',
        icon: <IoSchoolSharp/>,
        chevIcon:<IoChevronForward/>,
        subItems:[
            {
                itemName:'All Courses',
                link: '/training',
            },
            {
                itemName:'Invite Users',
                link:'/incident-report/sub-item-1',
            },
            {
                itemName:'Activity Logs',
                link:'/incident-report/sub-item-1',
            },
            {
                itemName:'Deactivated Users',
                link:'/incident-report/sub-item-1',
            },
            {
                itemName:'Roles and Permissions',
                link:'/incident-report/sub-item-1',
            }
        ]
    },
    {
        id: 8,
        itemName: 'Help & Support',
        icon: <BiSolidHelpCircle/>,
        link: '/helpAndSupport',
    }
]






            
// <Link to="/training">All Courses</Link>
// </li>
// <li>
// <a href="">Enrolled Courses</a>
// </li>
// <li>
// <a href="">Completed Courses</a>
// </li>
// <li>
// <a href="">Upcoming Sessions</a>
// </li>
// <li>
// <a href="">Quizzes</a>
// </li>
// <li>
// <a href="">Feedback</a>
// </li>
// <li>
// <a href="">Certification</a>
// </li>
