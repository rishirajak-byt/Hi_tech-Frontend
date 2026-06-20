/* ═══════════════════════════════════════════════
   ADMIN MOCK DATA — Phase 1
   ═══════════════════════════════════════════════ */

export interface CollegeStat {
  label: string;
  value: string | number;
  change: string;
  changeType: "up" | "down" | "neutral";
  icon: string;
}

export interface DepartmentStat {
  name: string;
  code: string;
  students: number;
  faculty: number;
  avgCgpa: number;
  avgAttendance: number;
  color: string;
}

export interface RecentActivity {
  id: string;
  type: "admission" | "result" | "fee" | "document" | "complaint" | "notice";
  message: string;
  time: string;
  user?: string;
}

export interface PendingAction {
  id: string;
  type: "document" | "fee" | "leave" | "complaint" | "admission";
  title: string;
  submittedBy: string;
  submittedOn: string;
  priority: "High" | "Medium" | "Low";
}

export interface FacultyMember {
  id: string;
  name: string;
  department: string;
  designation: string;
  email: string;
  courses: number;
  students: number;
  avatar: string;
}

export interface ExamSchedule {
  id: string;
  examType: string;
  department: string;
  subject: string;
  date: string;
  time: string;
  venue: string;
}

/* ─── COLLEGE STATS ─── */
export const collegeStats: CollegeStat[] = [
  { label: "Total Students", value: "5,248", change: "+124 this batch", changeType: "up", icon: "students" },
  { label: "Faculty Members", value: "312", change: "+8 this year", changeType: "up", icon: "faculty" },
  { label: "Departments", value: "14", change: "No change", changeType: "neutral", icon: "departments" },
  { label: "Avg. Attendance", value: "81.4%", change: "-1.2% vs last sem", changeType: "down", icon: "attendance" },
  { label: "Fee Collection", value: "₹4.2 Cr", change: "82% collected", changeType: "up", icon: "fee" },
  { label: "Placements", value: "94.6%", change: "+2.1% vs last year", changeType: "up", icon: "placement" },
];

/* ─── DEPARTMENT STATS ─── */
export const departmentStats: DepartmentStat[] = [
  { name: "Computer Science & Engineering", code: "CSE", students: 960, faculty: 48, avgCgpa: 7.92, avgAttendance: 82.1, color: "#1A3C6E" },
  { name: "Electronics & Communication", code: "ECE", students: 720, faculty: 36, avgCgpa: 7.65, avgAttendance: 79.8, color: "#F4A300" },
  { name: "Mechanical Engineering", code: "ME", students: 600, faculty: 30, avgCgpa: 7.40, avgAttendance: 80.5, color: "#C8102E" },
  { name: "Civil Engineering", code: "CE", students: 480, faculty: 26, avgCgpa: 7.18, avgAttendance: 83.2, color: "#059669" },
  { name: "Artificial Intelligence & DS", code: "AI&DS", students: 480, faculty: 24, avgCgpa: 8.12, avgAttendance: 84.7, color: "#7C3AED" },
  { name: "Information Technology", code: "IT", students: 480, faculty: 26, avgCgpa: 7.78, avgAttendance: 81.9, color: "#0891B2" },
  { name: "Electrical Engineering", code: "EE", students: 360, faculty: 20, avgCgpa: 7.30, avgAttendance: 78.4, color: "#D97706" },
  { name: "Chemical Engineering", code: "CHE", students: 168, faculty: 12, avgCgpa: 7.10, avgAttendance: 77.9, color: "#DC2626" },
];

/* ─── RECENT ACTIVITIES ─── */
export const recentActivities: RecentActivity[] = [
  { id: "A001", type: "document", message: "Bonafide certificate approved for Rahul Kumar Sharma (2023CSE047)", time: "2 min ago", user: "Admin" },
  { id: "A002", type: "admission", message: "New admission enquiry from Delhi — B.Tech CSE 2026 batch", time: "15 min ago" },
  { id: "A003", type: "result", message: "Semester 4 results published for CSE & ECE departments", time: "1 hr ago", user: "Exam Cell" },
  { id: "A004", type: "fee", message: "Bulk fee payment received — ₹12,50,000 for hostel Q2", time: "2 hrs ago", user: "Accounts" },
  { id: "A005", type: "complaint", message: "Grievance #GRV-2026-041 filed — Library book availability", time: "3 hrs ago", user: "Student" },
  { id: "A006", type: "notice", message: "Holiday notice published for Independence Day (15 Aug 2026)", time: "5 hrs ago", user: "Admin" },
  { id: "A007", type: "document", message: "Character certificate request from Priya Sharma (2022ECE022)", time: "6 hrs ago" },
  { id: "A008", type: "fee", message: "Late fee reminder sent to 142 students with pending dues", time: "8 hrs ago", user: "Accounts" },
];

/* ─── PENDING ACTIONS ─── */
export const pendingActions: PendingAction[] = [
  { id: "P001", type: "document", title: "Character Certificate — Priya Sharma", submittedBy: "2022ECE022", submittedOn: "Apr 10, 2026", priority: "Medium" },
  { id: "P002", type: "document", title: "No Objection Certificate — Arjun Mehta", submittedBy: "2023ME015", submittedOn: "Apr 18, 2026", priority: "High" },
  { id: "P003", type: "leave", title: "Medical Leave Application — 5 days", submittedBy: "2023CSE047", submittedOn: "Apr 20, 2026", priority: "Medium" },
  { id: "P004", type: "complaint", title: "Grievance #GRV-2026-041 — Library", submittedBy: "Student Council", submittedOn: "Apr 22, 2026", priority: "Low" },
  { id: "P005", type: "fee", title: "Fee Waiver Request — Ananya Singh", submittedBy: "2024IT031", submittedOn: "Apr 21, 2026", priority: "High" },
  { id: "P006", type: "admission", title: "Transfer Admission — Vikram Patel", submittedBy: "External", submittedOn: "Apr 19, 2026", priority: "Medium" },
];

/* ─── FACULTY DIRECTORY ─── */
export const facultyMembers: FacultyMember[] = [
  { id: "F001", name: "Dr. Sunita Rao", department: "CSE", designation: "Professor & HOD", email: "s.rao@hitech.edu.in", courses: 3, students: 240, avatar: "SR" },
  { id: "F002", name: "Prof. Amit Verma", department: "CSE", designation: "Associate Professor", email: "a.verma@hitech.edu.in", courses: 4, students: 180, avatar: "AV" },
  { id: "F003", name: "Dr. Kavita Nair", department: "ECE", designation: "Professor & HOD", email: "k.nair@hitech.edu.in", courses: 3, students: 200, avatar: "KN" },
  { id: "F004", name: "Prof. Rajesh Kumar", department: "ME", designation: "Professor", email: "r.kumar@hitech.edu.in", courses: 3, students: 160, avatar: "RK" },
  { id: "F005", name: "Dr. Pooja Sharma", department: "AI&DS", designation: "Assistant Professor", email: "p.sharma@hitech.edu.in", courses: 4, students: 120, avatar: "PS" },
  { id: "F006", name: "Prof. Manish Gupta", department: "IT", designation: "Associate Professor", email: "m.gupta@hitech.edu.in", courses: 3, students: 150, avatar: "MG" },
];

/* ─── EXAM SCHEDULE ─── */
export const examSchedule: ExamSchedule[] = [
  { id: "E001", examType: "CIA-I", department: "All", subject: "Computer Networks (CS501)", date: "12 May 2026", time: "09:00 AM", venue: "Block A — Hall 1, 2" },
  { id: "E002", examType: "CIA-I", department: "All", subject: "Software Engineering (CS502)", date: "13 May 2026", time: "09:00 AM", venue: "Block A — Hall 1, 2" },
  { id: "E003", examType: "CIA-I", department: "All", subject: "Design & Analysis of Algorithms (CS503)", date: "14 May 2026", time: "09:00 AM", venue: "Block B — Hall 3" },
  { id: "E004", examType: "CIA-I", department: "All", subject: "Machine Learning (CS504)", date: "15 May 2026", time: "09:00 AM", venue: "Block B — Hall 4" },
  { id: "E005", examType: "CIA-I", department: "All", subject: "Operating Systems Lab (CS505)", date: "16 May 2026", time: "02:00 PM", venue: "Lab Complex — L101" },
];

/* ─── FEE COLLECTION SUMMARY ─── */
export const feeCollectionSummary = {
  totalExpected: 52000000,
  totalCollected: 42640000,
  totalPending: 9360000,
  paidStudents: 4180,
  pendingStudents: 1068,
  partialStudents: 312,
};

/* ─── ADMISSION FUNNEL ─── */
export const admissionFunnel = [
  { stage: "Enquiries Received", count: 12400 },
  { stage: "Applications Submitted", count: 6820 },
  { stage: "Documents Verified", count: 4210 },
  { stage: "Counselling Attended", count: 2890 },
  { stage: "Seats Allotted", count: 1440 },
  { stage: "Admissions Confirmed", count: 1248 },
];
