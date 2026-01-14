"use client";
import React, { useCallback, useMemo } from 'react';
import { debounce } from 'lodash'; // Make sure lodash is installed: npm install lodash
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

  // IMPORTANT FIX: Debounce TextEditor onChange to prevent infinite re-render loop
  // This is the ONLY change - everything else is exactly the same
  const debouncedContentChange = useMemo(
    () => debounce((value: string) => {
      onChange("content", value);
    }, 500), // Wait 500ms after typing stops before updating state
    [onChange]
  );

  if (view) {
    const j = job || {}; // fallback if job is undefined

    return (
      <div className="space-y-6">
        {/* Job Header Info - was previously in the modal header */}
        <div className="pb-6 border-b border-gray-200">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-gray-900">
              {j.title || "No title available"}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-sm px-2 py-0.5 rounded-full font-medium ${
                  j.jobStatus === "Open"
                    ? "text-green-700 bg-green-100"
                    : "text-gray-700 bg-gray-100"
                }`}
              >
                {j.jobStatus || "—"}
              </span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                {j.level || "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="pb-6 border-b border-gray-200">
          <div className="grid grid-cols-1 border p-5 sm:grid-cols-3 gap-6 text-sm text-gray-700 rounded-md">
            <div>
              <p className="popmed text-[15px] font-medium">Salary:</p>
              <p className="popreg">{j.salaryRange || "—"}</p>
            </div>
            <div>
              <p className="popmed text-[15px] font-medium">Start date:</p>
              <p>
                {j.startDate
                  ? new Date(j.startDate).toLocaleDateString("en-GB")
                  : "—"}
              </p>
            </div>
            <div>
              <p className="popmed text-[15px] font-medium">Application deadline:</p>
              <p>
                {j.applicationDeadline
                  ? new Date(j.applicationDeadline).toLocaleDateString("en-GB")
                  : "—"}
              </p>
            </div>

            <div>
              <p className="popmed text-[15px] font-medium">Job ID:</p>
              <p>{j.jobId || "—"}</p>
            </div>
            <div>
              <p className="popmed text-[15px] font-medium">Company</p>
              <p className="text-gray-600">{j.companyName || "—"}</p>
            </div>
            <div>
              <p className="popmed text-[15px] font-medium">Location</p>
              <p className="text-gray-600">{j.location || "—"}</p>
            </div>

            <div>
              <p className="popmed text-[15px] font-medium">Posted By</p>
              <p className="text-gray-600">{j.postedBy || "—"}</p>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-6 text-gray-800 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: j.description || "" }} />
          {!j.description && (
            <p className="text-gray-500 italic">No description provided.</p>
          )}
        </div>

        {/* Key Responsibilities */}
        {Array.isArray(j.responsibilities) && j.responsibilities.length > 0 && (
          <div className="space-y-3 border-t border-gray-200 pt-6 text-gray-800">
            <h3 className="text-lg font-semibold">Key Responsibilities</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {j.responsibilities.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Additional Information */}
        {j.additionalInfo && (
          <div className="space-y-3 border-t border-gray-200 pt-6 text-gray-800">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <p className="text-gray-700 whitespace-pre-line">{j.additionalInfo}</p>
          </div>
        )}
      </div>
    );
  }

  // Edit/Create mode (only TextEditor onChange is fixed - everything else unchanged)
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
            value={formData.company || (edit ? job?.companyName : "") || ""}
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
            value={formData.salary || (edit ? job?.salaryRange : "") || ""}
            onChange={(e) => handleInputChange("salary", e.target.value)}
            placeholder="e.g., ৳30,000 - ৳45,000 per month"
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
              <SelectItem value="Junior">Junior</SelectItem>
              <SelectItem value="Mid-level">Mid-level</SelectItem>
              <SelectItem value="Senior">Senior</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <Label>Start Date *</Label>
          <Input
            type="date"
            value={formData.startDate || (edit ? job?.startDate?.split('T')[0] : "") || ""}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
          />
        </div>

        {/* Application Deadline */}
        <div className="space-y-2">
          <Label>Application Deadline *</Label>
          <Input
            type="date"
            value={formData.deadline || (edit ? job?.applicationDeadline?.split('T')[0] : "") || ""}
            onChange={(e) => handleInputChange("deadline", e.target.value)}
          />
        </div>
      </div>

      {/* Job Description - FIXED with debounce */}
      <div className="space-y-2">
        <Label>Job Descriptions</Label>
        <div className="border rounded-md">
          <TextEditor
            data={formData.content || (edit ? job?.description : "") || ""}
            onChange={debouncedContentChange} // ← Now debounced - no more loop!
          />
        </div>
      </div>

      {/* Key Responsibilities */}
      <div className="space-y-2">
        <Label>Key Responsibilities (one per line)</Label>
        <Textarea
          value={
            formData.responsibilities ||
            (edit && Array.isArray(job?.responsibilities)
              ? job.responsibilities.join("\n")
              : "") ||
            ""
          }
          onChange={(e) => handleInputChange("responsibilities", e.target.value)}
          rows={4}
          placeholder="Enter key responsibilities, one per line..."
        />
      </div>

      {/* Additional Info */}
      <div className="space-y-2">
        <Label>Additional Information</Label>
        <Textarea
          value={formData.additionalInfo || (edit ? job?.additionalInfo : "") || ""}
          onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
          rows={3}
          placeholder="Portfolio required, on-site, remote, etc..."
        />
      </div>

      {/* Job Status */}
      <div className="space-y-2">
        <Label>Job Status</Label>
        <Select
          value={formData.status || (edit ? job?.jobStatus : "Open") || "Open"}
          onValueChange={(value) => handleInputChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ManageJobFeilds;