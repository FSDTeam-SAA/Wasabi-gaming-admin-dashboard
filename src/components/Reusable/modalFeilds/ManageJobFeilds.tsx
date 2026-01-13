"use client";
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      <div className="space-y-6">
        {/* Job Header Info - was previously in the modal header */}
        <div className="pb-6 border-b border-gray-200">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-gray-900">
              {job?.title || "Solicitor apprenticeship (London)"}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-medium">
                Open
              </span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                Level 7
              </span>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="pb-6 border-b border-gray-200">
          <div className="grid grid-cols-1 border p-5 sm:grid-cols-3 gap-6 text-sm text-gray-700 rounded-md">
            <div>
              <p className="popmed text-[15px] font-medium">Salary:</p>
              <p className="popreg">£27,000 - £30,700 Yearly</p>
            </div>
            <div>
              <p className="popmed text-[15px] font-medium">Start date:</p>
              <p>19/12/2025</p>
            </div>
            <div>
              <p className="popmed text-[15px] font-medium">Application deadline:</p>
              <p>19/12/2025</p>
            </div>

            <div>
              <p className="popmed text-[15px] font-medium">Job ID:</p>
              <p>13586</p>
            </div>
            <div>
              <p className="popmed text-[15px] font-medium">Company</p>
              <p className="text-gray-600">{job?.company || "DWF LLP"}</p>
            </div>
            <div>
              <p className="popmed text-[15px] font-medium">Location</p>
              <p className="text-gray-600">{job?.location || "London"}</p>
            </div>

            <div>
              <p className="popmed text-[15px] font-medium">Category</p>
              <p className="text-gray-600">{job?.category || "Law"}</p>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-6 text-gray-800 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: job?.content || "" }} />
          {/* Fallback structured content if no HTML content matches the original hardcoded blocks */}
          {!job?.content && (
            <>
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
              {/* ... other sections omitted for brevity in view mode fallback, assuming real data has content ... */}
            </>
          )}
        </div>

        {/* Key Responsibilities */}
        <div className="space-y-3 border-t border-gray-200 pt-6 text-gray-800">
          <h3 className="text-lg font-semibold">Key Responsibilities</h3>
          <p className="whitespace-pre-line text-gray-700">{job?.responsibilities || "Assisting solicitors..."}</p>
        </div>

        {/* Skills */}
        <div className="space-y-3 border-t border-gray-200 pt-6 text-gray-800">
          <h3 className="text-lg font-semibold">Skills</h3>
          <p>{job?.skills || "Unknown"}</p>
        </div>

        {/* BTEC/Levels */}
        <div className="space-y-3 border-t border-gray-200 pt-6 text-gray-800">
          <h3 className="text-lg font-semibold">Education Level</h3>
          <p>{job?.acceptsBtec ? "BTEC Accepted" : "No, we do not need education level"}</p>
        </div>
      </div>
    );
  }

  // Edit/Create mode (Unified structure)
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Job Title */}
        <div className="space-y-2">
          <Label>Job Title *</Label>
          <Input
            type="text"
            value={formData.title || (edit ? job?.title : "") || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter job title"
          />
        </div>

        {/* Company */}
        <div className="space-y-2">
          <Label>Company *</Label>
          <Input
            type="text"
            value={formData.company || (edit ? job?.company : "") || ""}
            onChange={(e) => handleInputChange("company", e.target.value)}
            placeholder="Enter company name"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label>Location *</Label>
          <Input
            type="text"
            value={formData.location || (edit ? job?.location : "") || ""}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="Enter location"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category *</Label>
          <Select
            value={formData.category || (edit ? job?.category : "") || ""}
            onValueChange={(value) => handleInputChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Law">Law</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range */}
        <div className="space-y-2">
          <Label>Salary Range *</Label>
          <Input
            type="text"
            value={formData.salary || (edit ? job?.salary : "") || ""}
            onChange={(e) => handleInputChange("salary", e.target.value)}
            placeholder="e.g., £27,000 - £30,700 Yearly"
          />
        </div>

        {/* Job Level */}
        <div className="space-y-2">
          <Label>Job Level</Label>
          <Select
            value={formData.level || (edit ? job?.level : "") || ""}
            onValueChange={(value) => handleInputChange("level", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Level 3">Level 3</SelectItem>
              <SelectItem value="Level 4">Level 4</SelectItem>
              <SelectItem value="Level 5">Level 5</SelectItem>
              <SelectItem value="Level 6">Level 6</SelectItem>
              <SelectItem value="Level 7">Level 7</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <Label>Start Date *</Label>
          <Input
            type="date"
            value={formData.startDate || (edit ? job?.startDate : "") || ""}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
          />
        </div>

        {/* Application Deadline */}
        <div className="space-y-2">
          <Label>Application Deadline *</Label>
          <Input
            type="date"
            value={formData.deadline || (edit ? job?.deadline : "") || ""}
            onChange={(e) => handleInputChange("deadline", e.target.value)}
          />
        </div>
      </div>

      {/* Job Description */}
      <div className="space-y-2">
        <Label>Job Descriptions</Label>
        <div className="border rounded-md">
          <TextEditor
            data={formData.content || (edit ? job?.content : "") || ""}
            onChange={(value) => onChange("content", value)}
          />
        </div>
      </div>

      {/* Key Responsibilities */}
      <div className="space-y-2">
        <Label>Key Responsibilities (one per line)</Label>
        <Textarea
          value={formData.responsibilities || (edit ? job?.responsibilities : "") || ""}
          onChange={(e) => handleInputChange("responsibilities", e.target.value)}
          rows={4}
          placeholder="Enter key responsibilities, one per line..."
        />
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <Label>Required Skills</Label>
        <Textarea
          value={formData.skills || (edit ? job?.skills : "") || ""}
          onChange={(e) => handleInputChange("skills", e.target.value)}
          rows={3}
          placeholder="Enter required skills..."
        />
      </div>

      {/* BTEC/Levels Acceptance */}
      <div className="space-y-2">
        <Label>Accept BTEC/Levels</Label>
        <Select
          value={formData.acceptsBtec || (edit ? job?.acceptsBtec : "") || ""}
          onValueChange={(value) => handleInputChange("acceptsBtec", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes, we accept BTEC/Levels</SelectItem>
            <SelectItem value="no">No, we do not accept BTEC/Levels</SelectItem>
            <SelectItem value="case-by-case">Case by case basis</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Status */}
      <div className="space-y-2">
        <Label>Job Status</Label>
        <Select
          value={formData.status || (edit ? job?.status : "draft") || "draft"}
          onValueChange={(value) => handleInputChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ManageJobFeilds;
