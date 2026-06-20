/* ═══════════════════════════════════════════════
   STUDENT MOCK DATA — Phase 1
   All data is static; maps to the logged-in user.
   ═══════════════════════════════════════════════ */

export interface StudentProfile {
  name: string;
  rollNumber: string;
  email: string;
  department: string;
  departmentCode: string;
  batch: string;
  currentSemester: number;
  semesterLabel: string;
  cgpa: number;
  overallAttendance: number;
  feeStatus: "Paid" | "Pending" | "Partial";
  feePending: number;
  feeDueDate: string;
  avatar: string;
}

export interface AttendanceRecord {
  subject: string;
  code: string;
  totalClasses: number;
  present: number;
  absent: number;
  percentage: number;
  status: "Safe" | "Warning" | "Short";
}

export interface SemesterResult {
  semester: number;
  sgpa: number;
  cumulativeCgpa: number;
  creditsEarned: number;
  result: "PASS" | "FAIL";
}

export interface SubjectMark {
  subject: string;
  cia1: number | null;
  cia2: number | null;
  assignment: number | null;
  ese: number;
  total: number;
  grade: string;
  gradePoint: number;
  credits: number;
}

export interface Notification {
  id: string;
  type: "fee" | "result" | "attendance" | "notice" | "exam" | "document";
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface UpcomingEvent {
  title: string;
  date: string;
  type: "exam" | "event" | "deadline";
}

/* ─── STUDENT PROFILE ─── */
export const studentProfile: StudentProfile = {
  name: "Rahul Kumar Sharma",
  rollNumber: "2023CSE047",
  email: "2023cse047@hitech.edu.in",
  department: "Computer Science & Engineering",
  departmentCode: "CSE",
  batch: "2023–2027",
  currentSemester: 5,
  semesterLabel: "Semester 5 (2025–26, Odd Semester)",
  cgpa: 7.84,
  overallAttendance: 78,
  feeStatus: "Partial",
  feePending: 25000,
  feeDueDate: "15 Aug 2026",
  avatar: "RK",
};

/* ─── ATTENDANCE DATA (Current Semester) ─── */
export const attendanceData: AttendanceRecord[] = [
  { subject: "Computer Networks", code: "CS501", totalClasses: 42, present: 35, absent: 7, percentage: 83.3, status: "Safe" },
  { subject: "Software Engineering", code: "CS502", totalClasses: 44, present: 38, absent: 6, percentage: 86.4, status: "Safe" },
  { subject: "Design & Analysis of Algorithms", code: "CS503", totalClasses: 46, present: 32, absent: 14, percentage: 69.6, status: "Warning" },
  { subject: "Elective-I: Machine Learning", code: "CS504", totalClasses: 40, present: 34, absent: 6, percentage: 85.0, status: "Safe" },
  { subject: "Operating Systems Lab", code: "CS505", totalClasses: 24, present: 22, absent: 2, percentage: 91.7, status: "Safe" },
  { subject: "CN Lab", code: "CS506", totalClasses: 24, present: 16, absent: 8, percentage: 66.7, status: "Warning" },
];

/* ─── CGPA PROGRESSION ─── */
export const cgpaProgression: SemesterResult[] = [
  { semester: 1, sgpa: 7.20, cumulativeCgpa: 7.20, creditsEarned: 20, result: "PASS" },
  { semester: 2, sgpa: 7.50, cumulativeCgpa: 7.35, creditsEarned: 22, result: "PASS" },
  { semester: 3, sgpa: 8.10, cumulativeCgpa: 7.60, creditsEarned: 21, result: "PASS" },
  { semester: 4, sgpa: 7.95, cumulativeCgpa: 7.84, creditsEarned: 21, result: "PASS" },
];

/* ─── SEMESTER 4 MARKS ─── */
export const semester4Marks: SubjectMark[] = [
  { subject: "DBMS", cia1: 13, cia2: 12, assignment: 9, ese: 52, total: 86, grade: "A+", gradePoint: 9, credits: 4 },
  { subject: "Operating Systems", cia1: 11, cia2: 10, assignment: 8, ese: 44, total: 73, grade: "A", gradePoint: 8, credits: 4 },
  { subject: "Microprocessors", cia1: 10, cia2: 11, assignment: 7, ese: 40, total: 68, grade: "B+", gradePoint: 7, credits: 3 },
  { subject: "TOC", cia1: 9, cia2: 10, assignment: 8, ese: 38, total: 65, grade: "B+", gradePoint: 7, credits: 3 },
  { subject: "Software Engg.", cia1: 12, cia2: 13, assignment: 9, ese: 50, total: 84, grade: "A+", gradePoint: 9, credits: 3 },
  { subject: "DBMS Lab", cia1: null, cia2: null, assignment: null, ese: 38, total: 38, grade: "A", gradePoint: 8, credits: 2 },
  { subject: "OS Lab", cia1: null, cia2: null, assignment: null, ese: 35, total: 35, grade: "B+", gradePoint: 7, credits: 2 },
];

/* ─── NOTIFICATIONS ─── */
export const notifications: Notification[] = [
  {
    id: "1",
    type: "fee",
    title: "Hostel Fee Reminder",
    message: "Your hostel fee of ₹25,000 for Semester 5 is due on 15 Aug 2026. Please pay to avoid late charges.",
    date: "April 22, 2026",
    read: false,
  },
  {
    id: "2",
    type: "result",
    title: "Semester 4 Results Published",
    message: "Semester 4 results have been published. Log in to view your marksheet and SGPA.",
    date: "April 18, 2026",
    read: false,
  },
  {
    id: "3",
    type: "attendance",
    title: "Low Attendance Alert",
    message: "Your attendance in Design & Analysis of Algorithms is 69.6%. Minimum 75% required for exam eligibility.",
    date: "April 15, 2026",
    read: false,
  },
  {
    id: "4",
    type: "exam",
    title: "CIA-I Exam Schedule Released",
    message: "CIA-I examinations are scheduled from 12 May – 16 May 2026. Download the timetable from notices.",
    date: "April 12, 2026",
    read: true,
  },
  {
    id: "5",
    type: "notice",
    title: "Independence Day Holiday",
    message: "College will remain closed on 15 August 2026 on account of Independence Day.",
    date: "April 10, 2026",
    read: true,
  },
  {
    id: "6",
    type: "document",
    title: "Bonafide Certificate Ready",
    message: "Your bonafide certificate request has been approved. Download from the Documents section.",
    date: "April 5, 2026",
    read: true,
  },
];

/* ─── UPCOMING EVENTS / EXAMS ─── */
export const upcomingEvents: UpcomingEvent[] = [
  { title: "CIA-I Examinations Begin", date: "12 May 2026", type: "exam" },
  { title: "Annual Tech Fest — INNOVA 2026", date: "20 May 2026", type: "event" },
  { title: "Last Date: Library Book Return", date: "25 May 2026", type: "deadline" },
];

/* ─── SEMESTER PROGRESS ─── */
export const semesterProgress = {
  totalWeeks: 18,
  completedWeeks: 8,
  startDate: "1 Jul 2025",
  endDate: "30 Nov 2025",
};

/* ─── SEMESTER 1 MARKS ─── */
export const semester1Marks: SubjectMark[] = [
  { subject: "Engineering Mathematics I", cia1: 12, cia2: 11, assignment: 8, ese: 46, total: 77, grade: "A", gradePoint: 8, credits: 4 },
  { subject: "Engineering Physics", cia1: 10, cia2: 11, assignment: 7, ese: 38, total: 66, grade: "B+", gradePoint: 7, credits: 4 },
  { subject: "Programming in C", cia1: 13, cia2: 12, assignment: 9, ese: 50, total: 84, grade: "A+", gradePoint: 9, credits: 4 },
  { subject: "Engineering Chemistry", cia1: 9, cia2: 10, assignment: 7, ese: 36, total: 62, grade: "B", gradePoint: 6, credits: 3 },
  { subject: "Engineering Graphics", cia1: null, cia2: null, assignment: null, ese: 36, total: 36, grade: "B+", gradePoint: 7, credits: 2 },
  { subject: "C Programming Lab", cia1: null, cia2: null, assignment: null, ese: 38, total: 38, grade: "A", gradePoint: 8, credits: 2 },
];

/* ─── SEMESTER 2 MARKS ─── */
export const semester2Marks: SubjectMark[] = [
  { subject: "Engineering Mathematics II", cia1: 11, cia2: 12, assignment: 8, ese: 44, total: 75, grade: "A", gradePoint: 8, credits: 4 },
  { subject: "Data Structures", cia1: 13, cia2: 13, assignment: 9, ese: 52, total: 87, grade: "A+", gradePoint: 9, credits: 4 },
  { subject: "Digital Electronics", cia1: 10, cia2: 9, assignment: 7, ese: 42, total: 68, grade: "B+", gradePoint: 7, credits: 4 },
  { subject: "OOP with Java", cia1: 12, cia2: 13, assignment: 8, ese: 48, total: 81, grade: "A+", gradePoint: 9, credits: 3 },
  { subject: "DS Lab", cia1: null, cia2: null, assignment: null, ese: 40, total: 40, grade: "A+", gradePoint: 9, credits: 2 },
  { subject: "Java Lab", cia1: null, cia2: null, assignment: null, ese: 36, total: 36, grade: "A", gradePoint: 8, credits: 2 },
];

/* ─── SEMESTER 3 MARKS ─── */
export const semester3Marks: SubjectMark[] = [
  { subject: "Discrete Mathematics", cia1: 11, cia2: 10, assignment: 8, ese: 46, total: 75, grade: "A", gradePoint: 8, credits: 4 },
  { subject: "Computer Organization & Architecture", cia1: 12, cia2: 11, assignment: 8, ese: 50, total: 81, grade: "A+", gradePoint: 9, credits: 4 },
  { subject: "Database Management Systems", cia1: 13, cia2: 12, assignment: 9, ese: 54, total: 88, grade: "O", gradePoint: 10, credits: 4 },
  { subject: "Python Programming", cia1: 13, cia2: 14, assignment: 9, ese: 52, total: 88, grade: "O", gradePoint: 10, credits: 3 },
  { subject: "Computer Networks Lab", cia1: null, cia2: null, assignment: null, ese: 38, total: 38, grade: "A", gradePoint: 8, credits: 2 },
  { subject: "Python Lab", cia1: null, cia2: null, assignment: null, ese: 42, total: 42, grade: "A+", gradePoint: 9, credits: 2 },
];

/* ─── ALL SEMESTERS MAP ─── */
export const allSemesterMarks: Record<number, SubjectMark[]> = {
  1: semester1Marks,
  2: semester2Marks,
  3: semester3Marks,
  4: semester4Marks,
};

/* ─── DOCUMENT REQUESTS ─── */
export interface DocumentRequest {
  id: string;
  type: string;
  purpose: string;
  requestedOn: string;
  status: "Ready" | "Processing" | "Pending" | "Rejected";
  downloadable: boolean;
  remarks?: string;
}

export const documentRequests: DocumentRequest[] = [
  { id: "D001", type: "Bonafide Certificate", purpose: "Bank Loan Application", requestedOn: "Apr 3, 2026", status: "Ready", downloadable: true },
  { id: "D002", type: "Character Certificate", purpose: "Job Application – Infosys", requestedOn: "Apr 10, 2026", status: "Processing", downloadable: false, remarks: "Under review by Dean's office" },
];

export const availableDocuments = [
  { id: "DOC01", name: "Bonafide Certificate", desc: "Proof of enrollment as a bonafide student", icon: "🎓", availability: "On Request", turnaround: "2–3 working days" },
  { id: "DOC02", name: "Fee Receipt", desc: "Official receipt for fee paid this semester", icon: "🧾", availability: "Instant", turnaround: "Instant download" },
  { id: "DOC03", name: "Transcript / Marksheet", desc: "Official semester-wise mark statement", icon: "📋", availability: "After results", turnaround: "1–2 working days" },
  { id: "DOC04", name: "Transfer Certificate", desc: "Required for admission to another institution", icon: "📤", availability: "On Request", turnaround: "5–7 working days" },
  { id: "DOC05", name: "Migration Certificate", desc: "For migration between universities/boards", icon: "🏛️", availability: "On Request", turnaround: "7–10 working days" },
  { id: "DOC06", name: "Character Certificate", desc: "Certifying good conduct and character", icon: "⭐", availability: "On Request", turnaround: "2–3 working days" },
  { id: "DOC07", name: "Attendance Report", desc: "Subject-wise attendance report for the semester", icon: "📅", availability: "Instant", turnaround: "Instant download" },
  { id: "DOC08", name: "No Objection Certificate", desc: "NOC for higher studies / passport / internship", icon: "✅", availability: "On Request", turnaround: "2–3 working days" },
];
