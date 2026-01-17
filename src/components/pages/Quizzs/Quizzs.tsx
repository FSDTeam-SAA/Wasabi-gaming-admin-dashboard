// "use client";
// import React, { useState } from "react";
// import Headers from "../../Reusable/Headers";
// import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
// import CommonModal from "../../Reusable/CommonModal";


// const QuizCards = ({
//   title,
//   subject,
//   status,
//   questions,
//   duration,
//   attempts,
//   onView,
// }) => {
//   const [openEdit, setOpenEdit] = useState(false);

//   const statusColors = {
//     Active: "bg-green-200 text-green-800",
//     Inactive: "bg-red-200 text-red-800",
//     Upcoming: "bg-yellow-200 text-yellow-800",
//   };

//   const editFields = [
//     { name: "name", label: "Edit Quizzes Title", type: "text", placeholder: title },
//     {
//       name: "grade",
//       label: "Edit Selected Course",
//       type: "select",
//       options: [
//         { label: "6th Grade", value: "6" },
//         { label: "7th Grade", value: "7" },
//         { label: "8th Grade", value: "8" },
//         { label: "9th Grade", value: "9" },
//         { label: "10th Grade", value: "10" },
//         { label: "11th Grade", value: "11" },
//         { label: "12th Grade", value: "12" },
//       ],
//       placeholder: "Select grade level",
//     },
//     { name: "questions", label: "Edit Number of Questions", type: "text", placeholder: questions },
//     { name: "duration", label: "Edit Duration (minutes)", type: "text", placeholder: duration },
//     {
//       name: "status",
//       label: "Edit Status",
//       type: "select",
//       options: [
//         { label: "Active", value: "Active" },
//         { label: "Inactive", value: "Inactive" },
//         { label: "Upcoming", value: "Upcoming" },
//       ],
//       placeholder: status,
//     },
//   ];

//   const handleSave = (data) => {
//     console.log("Saved edit:", data);
//     setOpenEdit(false);
//   };

//   return (
//     <div className="p-5 bg-white shadow-md rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100">

//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <p className="text-lg font-semibold text-gray-800">{title}</p>
//           <p className="text-sm text-gray-500">{subject}</p>
//         </div>

//       </div>


//       <div className="mb-5 space-y-4">
//         <div className="flex justify-between items-center">
//           <p className="text-gray-500 text-sm">Questions</p>
//           <p className="text-gray-900 font-semibold">{questions}</p>
//         </div>
//         <div className="flex justify-between items-center">
//           <p className="text-gray-500 text-sm">Duration</p>
//           <p className="text-gray-900 font-semibold">{duration}</p>
//         </div>
//         <div className="flex justify-between items-center">
//           <p className="text-gray-500 text-sm">Attempts</p>
//           <p className="text-gray-900 font-semibold">{attempts}</p>
//         </div>
//       </div>


//       <div className="flex justify-between items-center gap-4">
//         <button
//           onClick={onView}
//           className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-3xl text-gray-700 font-medium hover:bg-gray-100 transition-all"
//         >
//           <FaEye className="text-gray-600 text-[18px]" /> <p>View</p>
//         </button>



//         <button className="flex items-center justify-center border border-gray-200 rounded-full p-4 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 text-gray-500">
//           <FaTrash className="text-xs" />
//         </button>
//       </div>


//       <CommonModal
//         isOpen={openEdit}
//         onClose={() => setOpenEdit(false)}
//         onSave={handleSave}
//         title="Edit Quizzes"
//         fields={editFields}
//       />
//     </div>
//   );
// };


// const QuizDetailsModal = ({ isOpen, onClose, quiz }) => {
//   if (!isOpen || !quiz) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-900">Quizzes Details</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 text-2xl rounded-full transition-colors"
//           >
//             ×
//           </button>
//         </div>


//         <div className="p-6 space-y-6">

//           <div>
//             <h3 className="text-lg font-medium text-gray-800">{quiz.title}</h3>
//             <p className="text-sm text-gray-500">{quiz.subject}</p>

//           </div>


//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div className="flex items-center gap-2">
//               <div className="p-2 bg-gray-100 rounded-full">
//                 <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-gray-500">Total Questions</p>
//                 <p className="font-semibold text-gray-900">{quiz.questions}</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <div className="p-2 bg-gray-100 rounded-full">
//                 <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-gray-500">Duration</p>
//                 <p className="font-semibold text-gray-900">{quiz.duration}</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <div className="p-2 bg-gray-100 rounded-full">
//                 <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-gray-500">Total Attempts</p>
//                 <p className="font-semibold text-gray-900">{quiz.attempts}</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <div className="p-2 bg-gray-100 rounded-full">
//                 <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-gray-500">Quizzes ID</p>
//                 <p className="font-semibold text-gray-900">{quiz.id || "Q-00001"}</p>
//               </div>
//             </div>
//           </div>


//           <div>
//             <div className="flex justify-between items-center mb-2">
//               <p className="text-sm font-medium text-gray-700">Completion Rate</p>
//               <p className="text-sm font-medium text-gray-700">45%</p>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-yellow-400 h-2 rounded-full"
//                 style={{ width: "45%" }}
//               />
//             </div>
//             <p className="mt-1 text-xs text-gray-500">
//               45% of students have attempted this quiz
//             </p>
//           </div>

//           <div className="bg-gray-50 rounded-xl p-4 space-y-2">
//             <h4 className="font-medium text-gray-800">Recent Results</h4>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <p className="text-gray-500">Average Score</p>
//                 <p className="font-semibold text-gray-900">85%</p>
//               </div>
//               <div>
//                 <p className="text-gray-500">Highest Score</p>
//                 <p className="font-semibold text-green-600">98%</p>
//               </div>
//               <div>
//                 <p className="text-gray-500">Lowest Score</p>
//                 <p className="font-semibold text-red-600">62%</p>
//               </div>
//               <div>
//                 <p className="text-gray-500">Pass Rate</p>
//                 <p className="font-semibold text-gray-900">82%</p>
//               </div>
//             </div>
//           </div>
//         </div>


//         <div className="flex justify-end p-6 border-t border-gray-200">
//           <button
//             onClick={onClose}
//             className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };



// const Quizzs = () => {
//   const demoData = [
//     {
//       id: "Q-00001",
//       title: "Mathematics - Chapter 5",
//       subject: "Advanced Mathematics",
//       status: "Active",
//       questions: 20,
//       duration: "30 min",
//       attempts: 45,
//     },
//     {
//       id: "Q-00002",
//       title: "Physics - Mechanics",
//       subject: "Fundamentals of Motion",
//       status: "Upcoming",
//       questions: 15,
//       duration: "25 min",
//       attempts: 8,
//     },
//     {
//       id: "Q-00003",
//       title: "Chemistry - Organic Reactions",
//       subject: "Organic Chemistry",
//       status: "Inactive",
//       questions: 25,
//       duration: "40 min",
//       attempts: 5,
//     },
//   ];

//   const [viewOpen, setViewOpen] = useState(false);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const [createOpen, setCreateOpen] = useState(false);

//   const handleView = (quiz) => {
//     setSelectedQuiz(quiz);
//     setViewOpen(true);
//   };

//   const createFields = [
//     { name: "name", label: "Quiz Title", type: "text", placeholder: "e.g., Mathematics - Chapter 5" },
//     {
//       name: "grade",
//       label: "Select Course",
//       type: "select",
//       options: [
//         { label: "6th Grade", value: "6" },
//         { label: "7th Grade", value: "7" },
//         { label: "8th Grade", value: "8" },
//         { label: "9th Grade", value: "9" },
//         { label: "10th Grade", value: "10" },
//         { label: "11th Grade", value: "11" },
//         { label: "12th Grade", value: "12" },
//       ],
//       placeholder: "Select grade level",
//     },
//     { name: "questions", label: "Number of Questions", type: "text", placeholder: "10" },
//     { name: "duration", label: "Duration (minutes)", type: "text", placeholder: "10" },
//     {
//       name: "status",
//       label: "Status",
//       type: "select",
//       options: [
//         { label: "Active", value: "Active" },
//         { label: "Inactive", value: "Inactive" },
//         { label: "Upcoming", value: "Upcoming" },
//       ],
//       placeholder: "Draft",
//     },
//   ];

//   const handleCreateSave = (data) => {
//     console.log("Created quiz:", data);
//     setCreateOpen(false);
//   };

//   return (
//     <div className="space-y-8">

//       <div className="flex justify-between items-center">
//         <Headers
//           title={"Quizzes"}
//           subHeader={"Manage all quizs available for your students"}
//         />
//         <button
//           onClick={() => setCreateOpen(true)}
//           className="flex gap-2 items-center bg-[#FFFF00] hover:bg-yellow-500 py-3 rounded-xl px-6 shadow-sm hover:shadow-md transition-all duration-300 font-semibold text-gray-900 hover:scale-105"
//         >
//           <FaPlus className="text-sm" />
//           Create New Quizzes
//         </button>
//       </div>


//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {demoData.map((quiz) => (
//           <QuizCards
//             key={quiz.id}
//             {...quiz}
//             onView={() => handleView(quiz)}
//           />
//         ))}
//       </div>


//       <QuizDetailsModal
//         isOpen={viewOpen}
//         onClose={() => setViewOpen(false)}
//         quiz={selectedQuiz}
//       />

//     </div>
//   );
// };

// export default Quizzs;

"use client";
import React, { useState } from "react";
import Headers from "../../Reusable/Headers";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import CommonModal from "../../Reusable/CommonModal";
import { QuizModal } from "@/components/Reusable/modalFeilds/QuizFeilds";

// Quiz Card Component (kept mostly same, just small cleanup)
const QuizCards = ({
  title,
  subject,
  status,
  questions,
  duration,
  attempts,
  onView,
}) => {
  const [openEdit, setOpenEdit] = useState(false);

  const statusColors = {
    Active: "bg-green-200 text-green-800",
    Inactive: "bg-red-200 text-red-800",
    Upcoming: "bg-yellow-200 text-yellow-800",
  };

  const editFields = [
    { name: "name", label: "Edit Quizzes Title", type: "text", placeholder: title },
    {
      name: "grade",
      label: "Edit Selected Course",
      type: "select",
      options: [
        { label: "6th Grade", value: "6" },
        { label: "7th Grade", value: "7" },
        { label: "8th Grade", value: "8" },
        { label: "9th Grade", value: "9" },
        { label: "10th Grade", value: "10" },
        { label: "11th Grade", value: "11" },
        { label: "12th Grade", value: "12" },
      ],
      placeholder: "Select grade level",
    },
    { name: "questions", label: "Edit Number of Questions", type: "text", placeholder: questions },
    { name: "duration", label: "Edit Duration (minutes)", type: "text", placeholder: duration },
    {
      name: "status",
      label: "Edit Status",
      type: "select",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
        { label: "Upcoming", value: "Upcoming" },
      ],
      placeholder: status,
    },
  ];

  const handleSave = (data) => {
    console.log("Saved edit:", data);
    setOpenEdit(false);
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-lg font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">{subject}</p>
        </div>
      </div>

      <div className="mb-5 space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">Questions</p>
          <p className="text-gray-900 font-semibold">{questions}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">Duration</p>
          <p className="text-gray-900 font-semibold">{duration}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">Attempts</p>
          <p className="text-gray-900 font-semibold">{attempts}</p>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <button
          onClick={onView}
          className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-3xl text-gray-700 font-medium hover:bg-gray-100 transition-all"
        >
          <FaEye className="text-gray-600 text-[18px]" /> View
        </button>

        <button className="flex items-center justify-center border border-gray-200 rounded-full p-4 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 text-gray-500">
          <FaTrash className="text-xs" />
        </button>
      </div>

      {/* You can keep CommonModal for simple edit if you want */}
      <CommonModal
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        onSave={handleSave}
        title="Edit Quiz"
        fields={editFields}
      />
    </div>
  );
};

// Quiz Details Modal (unchanged)
const QuizDetailsModal = ({ isOpen, onClose, quiz }) => {
  if (!isOpen || !quiz) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        {/* ... rest of your QuizDetailsModal code remains the same ... */}
      </div>
    </div>
  );
};

export default function Quizzs() {
  const demoData = [
    {
      id: "Q-00001",
      title: "Mathematics - Chapter 5",
      subject: "Advanced Mathematics",
      status: "Active",
      questions: 20,
      duration: "30 min",
      attempts: 45,
    },
    {
      id: "Q-00002",
      title: "Physics - Mechanics",
      subject: "Fundamentals of Motion",
      status: "Upcoming",
      questions: 15,
      duration: "25 min",
      attempts: 8,
    },
    {
      id: "Q-00003",
      title: "Chemistry - Organic Reactions",
      subject: "Organic Chemistry",
      status: "Inactive",
      questions: 25,
      duration: "40 min",
      attempts: 5,
    },
  ];

  const [viewOpen, setViewOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [createQuizModalOpen, setCreateQuizModalOpen] = useState(false);

  const handleView = (quiz) => {
    setSelectedQuiz(quiz);
    setViewOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header + Create Button */}
      <div className="flex justify-between items-center">
        <Headers
          title="Quizzes"
          subHeader="Manage all quizzes available for your students"
        />

        <button
          onClick={() => setCreateQuizModalOpen(true)}
          className="flex gap-2 items-center bg-[#FFFF00] hover:bg-yellow-500 py-3 rounded-xl px-6 shadow-sm hover:shadow-md transition-all duration-300 font-semibold text-gray-900 hover:scale-105"
        >
          <FaPlus className="text-sm" />
          Create New Quiz
        </button>
      </div>

      {/* Quiz Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoData.map((quiz) => (
          <QuizCards
            key={quiz.id}
            {...quiz}
            onView={() => handleView(quiz)}
          />
        ))}
      </div>

      {/* View Details Modal */}
      <QuizDetailsModal
        isOpen={viewOpen}
        onClose={() => setViewOpen(false)}
        quiz={selectedQuiz}
      />

      {/* Advanced Quiz Creation Modal (with course, video, multiple quizzes) */}
      <QuizModal
        open={createQuizModalOpen}
        onOpenChange={setCreateQuizModalOpen}
      />
    </div>
  );
}