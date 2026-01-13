"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import StudentForm from "./modalFeilds/StudentForm";
import CourseFields from "./modalFeilds/VideoFields";
import QuizFields from "./modalFeilds/QuizFeilds";
import TaskFields from "./modalFeilds/TaskFeilds";
import ManageSchoolFeilds from "./modalFeilds/ManageSchoolFeilds";
import ManageJobFeilds from "./modalFeilds/ManageJobFeilds";
import CreateLawFeilds from "./modalFeilds/CreateLawFeilds";
import ManageApplicationFeild from "./modalFeilds/ManageApplicationFeild";
import PortfolioFeilds from "./modalFeilds/PortfolioFeilds";
import UpdatePlansFeilds from "./modalFeilds/UpdatePlansFeilds";

interface ReusableModalProps {
  title: string;
  location: string;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
  subTitle?: string;
  submitText?: string;
  edit?: boolean;
  data?: any;
  view?: boolean;
  fields?: any[];
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  title,
  location,
  isOpen,
  onClose,
  onSave = () => { },
  subTitle,
  submitText = "Save",
  edit,
  data,
  view,
}) => {
  const [formData, setFormData] = useState({});

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  const renderFormFields = () => {
    switch (location) {
      case "student":
        return <StudentForm formData={formData} onChange={handleChange} />;
      case "quiz":
        return (
          <QuizFields formData={formData} onChange={handleChange} edit={edit} />
        );
      case "course":
        return (
          <CourseFields
            formData={formData}
            onChange={handleChange}
            edit={edit}
          />
        );
      case "task":
        return (
          <TaskFields formData={formData} onChange={handleChange} edit={edit} />
        );
      case "manageJob":
        return (
          <ManageJobFeilds
            formData={formData}
            onChange={handleChange}
            edit={edit}
            job={data}
            view={view}
            onClose={onClose}
          />
        );
      case "manageSchool":
        return (
          <ManageSchoolFeilds
            formData={formData}
            onChange={handleChange}
            job={data}
            view={view}
            onClose={onClose}
            edit={edit}
          />
        );
      case "createLawFirms":
        return (
          <CreateLawFeilds
            formData={formData}
            onChange={handleChange}
            job={data}
            view={view}
            edit={edit}
            onClose={onClose}
          />
        );
      case "applicationTracker":
        return (
          <ManageApplicationFeild
            formData={formData}
            onChange={handleChange}
            job={data}
            view={view}
            onClose={onClose}
          />
        );
      case "portfolio":
        return (
          <PortfolioFeilds
            formData={formData}
            onChange={handleChange}
            job={data}
            view={view}
            edit={edit}
            onClose={onClose}
          />
        );
      case "plans":
        return (
          <UpdatePlansFeilds
            formData={formData}
            onChange={handleChange}
            job={data}
            view={view}
            edit={edit}
            onClose={onClose}
          />
        );
      default:
        return null;
    }
  };

  // const showButtons = !(location === 'manageJob' && view) || (location === 'manageSchool' && view)
  const showButtons = !(
    view &&
    (location === "manageSchool" ||
      location === "manageJob" ||
      location === "portfolio")
  );

  return (
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-lg   ${view || location === "portfolio"
          ? "w-[60vw] p-8"
          : "max-w-4xl w-full p-6 mx-4"
          }`}
      >
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="text-[#737373] mt-1">{subTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 flex items-center justify-center"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFormFields()}

          {showButtons && (
            <div className="flex gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={onClose}
                className="border hover:bg-gray-400 popmed text-gray-800 py-2 px-4 rounded-[20px] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-[20px] bg-[#FFFF00] popmed text-black py-2 px-4 transition-colors"
              >
                {submitText}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReusableModal;
