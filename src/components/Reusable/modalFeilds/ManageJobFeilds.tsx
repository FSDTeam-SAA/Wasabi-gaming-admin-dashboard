"use client";
import React from 'react';
import { X } from 'lucide-react';
import TextEditor from '../editor/EditSection';

interface ManageJobFeildsProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  edit?: boolean;
  view?: boolean;
  job?: any;
  onClose?: () => void;
}

const ManageJobFeilds: React.FC<ManageJobFeildsProps> = ({
  formData,
  onChange,
  edit = false,
  view = false,
  job,
  onClose,
}) => {
  const handleInputChange = (field: string, value: any) => {
    onChange(field, value);
  };

  if (view) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white w-full max-w-3xl h-[90vh] overflow-y-auto rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
          {/* Header with close button */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {job?.title || "Solicitor apprenticeship (London)"}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-sm text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-medium">
                    Open
                  </span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                    Level 7
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 flex items-center justify-center"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Job Details */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 border p-5 sm:grid-cols-3 gap-6 text-sm text-gray-700">
              <div>
                <p className="popmed text-[15px]">Salary:</p>
                <p className="popreg">£27,000 - £30,700 Yearly</p>
              </div>
              <div>
                <p className="popmed text-[15px]">Start date:</p>
                <p>19/12/2025</p>
              </div>
              <div>
                <p className="popmed text-[15px]">Application deadline:</p>
                <p>19/12/2025</p>
              </div>

              <div>
                <p className="popmed text-[15px]">Job ID:</p>
                <p>13586</p>
              </div>
              <div>
                <p className="popmed text-[15px]">Company</p>
                <p className="text-gray-600">{job?.company || "DWF LLP"}</p>
              </div>
              <div>
                <p className="popmed text-[15px]">Location</p>
                <p className="text-gray-600">{job?.location || "London"}</p>
              </div>

              <div>
                <p className="popmed text-[15px]">Category</p>
                <p className="text-gray-600">{job?.category || "Law"}</p>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="p-6 space-y-6 text-gray-800 leading-relaxed">
            <section>
              <h3 className="text-lg font-semibold mb-3">About The Job</h3>
              <p className="mb-4">
                <strong>Legal Apprentice - Jumpstart Your Career</strong>
              </p>
              <p>
                Are you a sharp, detail-oriented individual looking to dive into
                the world of law? We're seeking enthusiastic Legal Apprentices
                to join our team! You'll be a key player in supporting our
                solicitors, gaining invaluable experience and building a solid
                foundation for your legal career.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-gray-900 mb-2">
                What You'll Do
              </h4>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>
                  Conduct legal research & analysis to help build strong cases.
                </li>
                <li>Draft essential legal documents and correspondence.</li>
                <li>Manage and organize client files with precision.</li>
                <li>
                  Attend client meetings and court proceedings (amazing learning
                  opportunities).
                </li>
                <li>
                  Provide administrative support to keep our team running
                  smoothly.
                </li>
              </ul>
            </section>

            <section>
              <h4 className="font-semibold text-gray-900 mb-2">
                What You'll Gain
              </h4>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Take on more responsibility over time.</li>
                <li>
                  Rotate through diverse departments every 12 months (or 6
                  months in final 2 years) alongside trainee solicitors.
                </li>
                <li>Develop real-world legal skills and knowledge.</li>
                <li>
                  Be part of a supportive and collaborative work environment.
                </li>
              </ul>
            </section>

            <p className="pt-2">
              Ready to launch your legal journey? <strong>Apply now!</strong>
            </p>
          </div>

          {/* Key Responsibilities */}
          <div className="p-6 space-y-3 border-t border-gray-200 text-gray-800">
            <h3 className="text-lg font-semibold">Key Responsibilities</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Assisting solicitors with casework and legal research</li>
              <li>Drafting legal documents and correspondence</li>
              <li>Managing client files and documentation</li>
              <li>Participating in meetings and court proceedings</li>
              <li>Supporting the team with administrative tasks</li>
            </ul>
          </div>

          {/* Skills */}
          <div className="p-6 space-y-3 border-t border-gray-200 text-gray-800">
            <h3 className="text-lg font-semibold">Skills</h3>
            <p>Unknown</p>
          </div>

          {/* BTEC/Levels */}
          <div className="p-6 space-y-3 border-t border-gray-200 text-gray-800">
            <h3 className="text-lg font-semibold">Education Level</h3>
            <p>No, we do not need education level</p>
          </div>
        </div>
      </div>
    );
  }

  // Edit mode form
  if (edit) {
    return (
      <div className="space-y-6 h-[78vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Edit Job</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 flex items-center justify-center"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Job Details Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                value={formData.title || job?.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter job title"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                value={formData.company || job?.company || ""}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter company name"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                value={formData.location || job?.location || ""}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter location"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category || job?.category || ""}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="Law">Law</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Range *
              </label>
              <input
                type="text"
                value={formData.salary || job?.salary || ""}
                onChange={(e) => handleInputChange("salary", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="e.g., £27,000 - £30,700 Yearly"
              />
            </div>

            {/* Job Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Level
              </label>
              <select
                value={formData.level || job?.level || ""}
                onChange={(e) => handleInputChange("level", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Select level</option>
                <option value="Level 3">Level 3</option>
                <option value="Level 4">Level 4</option>
                <option value="Level 5">Level 5</option>
                <option value="Level 6">Level 6</option>
                <option value="Level 7">Level 7</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                value={formData.startDate || job?.startDate || ""}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Application Deadline *
              </label>
              <input
                type="date"
                value={formData.deadline || job?.deadline || ""}
                onChange={(e) => handleInputChange("deadline", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Descriptions
            </label>
            <div className="border ">
              <TextEditor
                data={formData.content || ""}
                onChange={(value) => onChange("content", value)}
              />
            </div>
          </div>

          {/* Key Responsibilities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Responsibilities (one per line)
            </label>
            <textarea
              value={formData.responsibilities || job?.responsibilities || ""}
              onChange={(e) =>
                handleInputChange("responsibilities", e.target.value)
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter key responsibilities, one per line..."
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Required Skills
            </label>
            <textarea
              value={formData.skills || job?.skills || ""}
              onChange={(e) => handleInputChange("skills", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter required skills..."
            />
          </div>

          {/* BTEC/Levels Acceptance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Accept BTEC/Levels
            </label>
            <select
              value={formData.acceptsBtec || job?.acceptsBtec || ""}
              onChange={(e) => handleInputChange("acceptsBtec", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">Select option</option>
              <option value="yes">Yes, we accept BTEC/Levels</option>
              <option value="no">No, we do not accept BTEC/Levels</option>
              <option value="case-by-case">Case by case basis</option>
            </select>
          </div>

          {/* Job Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Status
            </label>
            <select
              value={formData.status || job?.status || "open"}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  // Create mode form (similar to edit but empty)
  return (
    <div className="space-y-6">
      {/* Job Details Form */}
      <div className="space-y-4 h-[78vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title *
            </label>
            <input
              type="text"
              value={formData.title || ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter job title"
              required
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company *
            </label>
            <input
              type="text"
              value={formData.company || ""}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter company name"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <input
              type="text"
              value={formData.location || ""}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter location"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              value={formData.category || ""}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              required
            >
              <option value="">Select category</option>
              <option value="Law">Law</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salary Range *
            </label>
            <input
              type="text"
              value={formData.salary || ""}
              onChange={(e) => handleInputChange("salary", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="e.g., £27,000 - £30,700 Yearly"
              required
            />
          </div>

          {/* Job Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Level
            </label>
            <select
              value={formData.level || ""}
              onChange={(e) => handleInputChange("level", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">Select level</option>
              <option value="Level 3">Level 3</option>
              <option value="Level 4">Level 4</option>
              <option value="Level 5">Level 5</option>
              <option value="Level 6">Level 6</option>
              <option value="Level 7">Level 7</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date *
            </label>
            <input
              type="date"
              value={formData.startDate || ""}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              required
            />
          </div>

          {/* Application Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Application Deadline *
            </label>
            <input
              type="date"
              value={formData.deadline || ""}
              onChange={(e) => handleInputChange("deadline", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Descriptions
          </label>
          <div className="border">
            <TextEditor
              value={formData.content || ""}
              onChange={(value) => onChange("content", value)}
            />
          </div>
        </div>

        {/* Key Responsibilities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Key Responsibilities (one per line)
          </label>
          <textarea
            value={formData.responsibilities || ""}
            onChange={(e) =>
              handleInputChange("responsibilities", e.target.value)
            }
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Enter key responsibilities, one per line..."
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Required Skills
          </label>
          <textarea
            value={formData.skills || ""}
            onChange={(e) => handleInputChange("skills", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Enter required skills..."
          />
        </div>

        {/* BTEC/Levels Acceptance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Accept BTEC/Levels
          </label>
          <select
            value={formData.acceptsBtec || ""}
            onChange={(e) => handleInputChange("acceptsBtec", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="">Select option</option>
            <option value="yes">Yes, we accept BTEC/Levels</option>
            <option value="no">No, we do not accept BTEC/Levels</option>
            <option value="case-by-case">Case by case basis</option>
          </select>
        </div>

        {/* Job Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Status
          </label>
          <select
            value={formData.status || "draft"}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="draft">Draft</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ManageJobFeilds;
