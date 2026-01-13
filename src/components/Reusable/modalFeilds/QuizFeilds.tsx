"use client";
import React, { useEffect, useState } from "react";
import { Upload, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const QuizFields = ({ formData, onChange, edit = false }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (formData.quizFile instanceof File) {
      const url = URL.createObjectURL(formData.quizFile);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [formData.quizFile]);

  const isPDF =
    formData.quizFile?.type === "application/pdf" ||
    formData.quizFileName?.endsWith(".pdf");

  const isCSV =
    formData.quizFile?.type === "text/csv" ||
    formData.quizFileName?.endsWith(".csv");

  // Form fields configuration
  const createFields = [
    {
      name: "name",
      label: "Quiz Title",
      type: "text",
      placeholder: "e.g., Contract Law - Chapter 3: Offer and Acceptance",
    },
    {
      name: "educationLevel",
      label: "Education Level",
      type: "select",
      options: [
        { label: "Reception", value: "RECEPTION" },

        { label: "Year 1", value: "Y1" },
        { label: "Year 2", value: "Y2" },
        { label: "Year 3", value: "Y3" },
        { label: "Year 4", value: "Y4" },
        { label: "Year 5", value: "Y5" },
        { label: "Year 6", value: "Y6" },

        { label: "Year 7", value: "Y7" },
        { label: "Year 8", value: "Y8" },
        { label: "Year 9", value: "Y9" },

        { label: "GCSE – Year 10", value: "Y10" },
        { label: "GCSE – Year 11", value: "Y11" },

        { label: "A-Level – Year 12", value: "Y12" },
        { label: "A-Level – Year 13", value: "Y13" },
      ],
      placeholder: "Select education level",
    },
    {
      name: "questions",
      label: "Number of Questions",
      type: "text",
      placeholder: "e.g., 25",
    },
    {
      name: "duration",
      label: "Duration (minutes)",
      type: "text",
      placeholder: "e.g., 60",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
        { label: "Upcoming", value: "Upcoming" },
        { label: "Draft", value: "Draft" },
      ],
      placeholder: "Select status",
    },
  ];

  // Filter out status field if in create mode and not edit
  const fields = edit
    ? createFields
    : createFields.filter((field) => field.name !== "status");

  const renderField = (field) => {
    switch (field.type) {
      case "select":
        return (
          <Select
            value={formData[field.name] || ""}
            onValueChange={(value) => onChange(field.name, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return (
          <Input
            type={field.type}
            id={field.name}
            value={formData[field.name] || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            {renderField(field)}
          </div>
        ))}
      </div>

      {/* Upload Section */}
      <div className="border-t pt-6">
        <Label className="mb-2 block">Upload quiz file</Label>

        <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-yellow-400 transition">
          <Upload className="h-6 w-6 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-400">
            Upload case files, legal documents, or question banks (CSV, PDF) Max.
            5MB
          </p>

          <input
            type="file"
            accept=".csv,.pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              onChange("quizFile", file);
              onChange("quizFileName", file.name);
            }}
          />
        </label>

        {/* File Name */}
        {(formData.quizFileName || formData.quizFile) && (
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <FileText className="h-4 w-4" />
            {formData.quizFileName || formData.quizFile?.name}
          </div>
        )}
      </div>

      {/* 🔍 PREVIEW SECTION */}
      {previewUrl && (
        <div className="border rounded-lg p-3 bg-gray-50">
          <p className="text-xs font-medium text-gray-500 mb-2">
            Legal Document Preview
          </p>

          {/* PDF Preview */}
          {isPDF && (
            <iframe
              src={previewUrl}
              className="w-full h-64 rounded-md border"
              title="Legal Document Preview"
            />
          )}

          {/* CSV Preview */}
          {isCSV && (
            <p className="text-sm text-gray-600">
              Case file uploaded successfully. Preview not supported — document
              will be processed for legal terminology and citations.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizFields;