import { VscBook } from "react-icons/vsc";
import { SlBookOpen } from "react-icons/sl";


const employeeNames = ["John Smith", "Jane Doe", "Alice Johnson", "Bob Brown", "Charlie Davis", "Diana Evans", "Frank Green", "Grace Harris", "Henry Jackson"];

function getRandomEmployeeName() {
    return employeeNames[Math.floor(Math.random() * employeeNames.length)];
}

export const ComplianceData = [
    {
        id: 1,
        DocumentName: 'Azam complex',
        role: 'HSQE.CEO',
        status: 'active',
        expireDate: '12-12-2022',
        DocumentOwner: 'John Doe',
        employeeName: getRandomEmployeeName(),
        Approval: 'HSEQ.M',
        view: <SlBookOpen />
    },
    {
        id: 2,
        DocumentName: 'Maunda lmt',
        role: 'HSQE.M',
        status: 'active',
        expireDate: '12-12-2022',
        DocumentOwner: 'John Doe',
        employeeName: getRandomEmployeeName(),
        Approval: 'HSEQ.M',
        view: <SlBookOpen />
    },
    {
        id: 3,
        DocumentName: 'Company Certificate',
        role: 'HSQE Manager',
        status: 'active',
        expireDate: '12-12-2022',
        DocumentOwner: 'John Doe',
        employeeName: getRandomEmployeeName(),
        Approval: 'HSEQ.M',
        view: <SlBookOpen />
    },
    {
        id: 4,
        DocumentName: 'Company Certificate',
        role: 'HSQE Manager',
        status: 'inactive',
        expireDate: '12-12-2022',
        DocumentOwner: 'John Doe',
        employeeName: getRandomEmployeeName(),
        Approval: 'HSEQ.M',
        view: <SlBookOpen />
    },
    {
        id: 5,
        DocumentName: 'Company Certificate',
        role: 'HSQE Manager',
        status: 'active',
        expireDate: '12-12-2022',
        DocumentOwner: 'John Doe',
        employeeName: getRandomEmployeeName(),
        Approval: 'HSEQ.M',
        view: <SlBookOpen />
    },
    {
        id: 6,
        DocumentName: 'Company Certificate',
        role: 'HSQE Manager',
        status: 'pending',
        expireDate: '12-12-2022',
        DocumentOwner: 'John Doe',
        employeeName: getRandomEmployeeName(),
        Approval: 'HSEQ.M',
        view: <SlBookOpen />
    },
    {
        id: 7,
        DocumentName: 'Company Certificate',
        role: 'HSQE Manager',
        status: 'active',
        expireDate: '12-12-2022',
        DocumentOwner: 'John Doe',
        employeeName: getRandomEmployeeName(),
        Approval: 'HSEQ.M',
        view: <SlBookOpen />
    },
    {
        id: 8,
        DocumentName: 'Company Certificate',
        role: 'HSQE Manager',
        status: 'inactive',
        expireDate: '12-12-2022',
        DocumentOwner: 'John Doe',
        employeeName: getRandomEmployeeName(),
        Approval: 'HSEQ.M',
        view: <SlBookOpen />
    },
    {
        id: 9,
        DocumentName: 'Company Certificate',
        role: 'HSQE Manager',
        status: 'active',
        expireDate: '12-12-2022',
        DocumentOwner: 'John Doe',
        employeeName: getRandomEmployeeName(),
        Approval: 'HSEQ.M',
        view: <SlBookOpen />
    }
];

