"use client";
import React, { useState, useEffect } from "react";
import { Camera, MapPin, Users, Calendar, Award, Briefcase } from "lucide-react";
import { FaBuilding, FaGraduationCap } from "react-icons/fa6";
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

interface CreateLawFeildsProps {
    formData: any;
    onChange: (field: string, value: any) => void;
    edit?: boolean;
    view?: boolean;
    job?: any;
    onClose?: () => void;
}

const CreateLawFields: React.FC<CreateLawFeildsProps> = ({
    formData,
    onChange,
    edit = false,
    view = false,
    job: firm,
    onClose,
}) => {
    const disabled = view;
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    useEffect(() => {
        if (formData.logo && formData.logo instanceof File) {
            const objectUrl = URL.createObjectURL(formData.logo);
            setLogoPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        } else if (formData.logo && typeof formData.logo === "string") {
            setLogoPreview(formData.logo);
        } else {
            setLogoPreview(null);
        }
    }, [formData.logo]);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange("logo", file);
        }
    };

    useEffect(() => {
        return () => {
            if (logoPreview && logoPreview.startsWith("blob:")) {
                URL.revokeObjectURL(logoPreview);
            }
        };
    }, []);

    const getFirmSizeLabel = (size: string) => {
        const sizeMap: Record<string, string> = {
            Small: "2-10 lawyers",
            Medium: "11-50 lawyers",
            Large: "51-200 lawyers",
            Enterprise: "200+ lawyers",
        };
        return sizeMap[size] || size;
    };

    if (view) {
        return (
            <div className="space-y-6">
                <div className="pb-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        <div className="flex-shrink-0">
                            <div className="h-24 w-24 rounded-xl bg-white shadow-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                                {firm.logo ? (
                                    <img
                                        src={firm.logo}
                                        alt={`${firm.name} logo`}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <FaBuilding className="text-gray-400" size={40} />
                                )}
                            </div>
                        </div>

                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                {firm.name}
                            </h1>
                            <p className="text-lg text-gray-600 mb-3">
                                {firm.tagline || "Prestigious legal services provider"}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{firm.location || "Multiple locations"}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span>{getFirmSizeLabel(firm.size)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>Est. {firm.yearFounded || "1980"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pb-6 border-b border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Briefcase className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Practice Areas</p>
                                    <p className="font-semibold text-gray-900">
                                        {firm.tags?.length || 8}+
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Users className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Partners</p>
                                    <p className="font-semibold text-gray-900">
                                        {Math.floor(
                                            firm.size === "Large" || firm.size === "Enterprise"
                                                ? 25
                                                : 12
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <FaGraduationCap className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Training Contracts</p>
                                    <p className="font-semibold text-gray-900">
                                        {firm.internships || "Summer & Graduate"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-amber-100 rounded-lg">
                                    <Award className="w-5 h-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Rankings</p>
                                    <p className="font-semibold text-gray-900">Top 100 UK</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                            About the Firm
                        </h3>
                        <div className="prose max-w-none text-gray-700">
                            <p className="mb-4">
                                <strong className="text-gray-900">{firm.name}</strong>{" "}
                                {firm.about ||
                                    "is a leading law firm with a reputation for excellence in legal services. With decades of experience and a team of dedicated professionals, we provide comprehensive legal solutions to clients across various sectors."}
                            </p>
                            <p>
                                {firm.description ||
                                    "Our firm combines traditional legal expertise with innovative approaches to meet the evolving needs of our clients. We pride ourselves on delivering exceptional results while maintaining the highest standards of professionalism and ethical conduct."}
                            </p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-green-600 rounded-full"></span>
                            Areas of Expertise
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {firm.tags?.map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
                                >
                                    {tag}
                                </span>
                            ))}
                            {(!firm.tags || firm.tags.length === 0) && (
                                <>
                                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                                        Corporate Law
                                    </span>
                                    <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-100">
                                        Commercial Litigation
                                    </span>
                                    <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100">
                                        Intellectual Property
                                    </span>
                                    <span className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-100">
                                        Employment Law
                                    </span>
                                    <span className="px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-100">
                                        Real Estate
                                    </span>
                                    <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100">
                                        Mergers & Acquisitions
                                    </span>
                                </>
                            )}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
                            Training & Career Development
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-purple-100 rounded-lg mt-1">
                                    <FaGraduationCap className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-1">
                                        Training Programs
                                    </h4>
                                    <p className="text-gray-600">
                                        {firm.internships ||
                                            "Our firm offers comprehensive training contracts, vacation schemes, and graduate programs designed to develop the next generation of legal professionals."}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg mt-1">
                                    <Users className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-1">Mentorship</h4>
                                    <p className="text-gray-600">
                                        One-on-one mentorship from senior partners and regular
                                        performance reviews to support career progression.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-amber-600 rounded-full"></span>
                            Firm Culture & Values
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-900 mb-2">Excellence</h4>
                                <p className="text-sm text-gray-600">
                                    Commitment to the highest standards of legal practice and
                                    client service.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-900 mb-2">Integrity</h4>
                                <p className="text-sm text-gray-600">
                                    Upholding ethical standards and maintaining client
                                    confidentiality.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-900 mb-2">Collaboration</h4>
                                <p className="text-sm text-gray-600">
                                    Team-oriented approach to complex legal challenges.
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-900 mb-2">Innovation</h4>
                                <p className="text-sm text-gray-600">
                                    Embracing technology and new approaches to legal practice.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Additional Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">
                                    Office Locations
                                </h4>
                                <p className="text-gray-600">
                                    {firm.location || "London (Headquarters), Manchester, Edinburgh"}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">
                                    Recruitment Contact
                                </h4>
                                <p className="text-gray-600">
                                    recruitment@
                                    {firm.name?.toLowerCase().replace(/\s+/g, "") || "firm"}.com
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    // Edit/Create Mode
    return (
        <div className="space-y-6 pr-4">
            <div>
                <h2 className="text-xl font-semibold text-gray-900">
                    {edit ? "Edit Law Firm" : "Create Law Firm"}
                </h2>
                <p className="text-sm text-muted-foreground">
                    {edit ? "Update law firm information" : "Add new law firm details"}
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                        {logoPreview ? (
                            <img
                                src={logoPreview}
                                alt="Logo preview"
                                className="h-full w-full object-cover"
                            />
                        ) : formData.logo && typeof formData.logo === "string" ? (
                            <img
                                src={formData.logo}
                                alt="Logo"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <Camera className="text-blue-600" />
                        )}
                    </div>

                    {!view && (
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleLogoChange}
                            id="logo-upload"
                        />
                    )}
                </div>

                <div>
                    <Label
                        htmlFor="logo-upload"
                        className="text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                    >
                        {logoPreview || formData.logo ? "Change logo" : "Add logo"}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                        Recommended: 200×200px PNG/JPG
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Firm Name</Label>
                    <Input
                        type="text"
                        placeholder="Enter firm name"
                        value={formData.name || ""}
                        disabled={disabled}
                        onChange={(e) => onChange("name", e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Tagline</Label>
                    <Input
                        type="text"
                        placeholder="Brief description or tagline"
                        value={formData.tagline || ""}
                        disabled={disabled}
                        onChange={(e) => onChange("tagline", e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>About the Firm</Label>
                <Textarea
                    rows={3}
                    placeholder="Brief overview of the firm's history, values, and mission"
                    value={formData.about || ""}
                    disabled={disabled}
                    onChange={(e) => onChange("about", e.target.value)}
                    className="resize-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Firm Size</Label>
                    <Select
                        value={formData.size || ""}
                        onValueChange={(value) => onChange("size", value)}
                        disabled={disabled}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select firm size" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Small">Small (2-10 lawyers)</SelectItem>
                            <SelectItem value="Medium">Medium (11-50 lawyers)</SelectItem>
                            <SelectItem value="Large">Large (51-200 lawyers)</SelectItem>
                            <SelectItem value="Enterprise">Enterprise (200+ lawyers)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Year Founded</Label>
                    <Input
                        type="text"
                        placeholder="e.g., 1980"
                        value={formData.yearFounded || ""}
                        disabled={disabled}
                        onChange={(e) => onChange("yearFounded", e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Areas of Expertise (comma-separated)</Label>
                <Input
                    type="text"
                    placeholder="Corporate Law, Commercial Litigation, Intellectual Property"
                    value={formData.expertise || ""}
                    disabled={disabled}
                    onChange={(e) => onChange("expertise", e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                    Separate each practice area with a comma
                </p>
            </div>

            <div className="space-y-2">
                <Label>Training Programs Offered</Label>
                <Input
                    type="text"
                    placeholder="Training contracts, Vacation schemes, Graduate programs"
                    value={formData.internships || ""}
                    disabled={disabled}
                    onChange={(e) => onChange("internships", e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label>Office Locations</Label>
                <Input
                    type="text"
                    placeholder="London, Manchester, Edinburgh"
                    value={formData.location || ""}
                    disabled={disabled}
                    onChange={(e) => onChange("location", e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label>Detailed Description</Label>
                <Textarea
                    rows={5}
                    placeholder="Detailed information about the firm's practice areas, culture, achievements, and values"
                    value={formData.description || ""}
                    disabled={disabled}
                    onChange={(e) => onChange("description", e.target.value)}
                    className="resize-none"
                />
            </div>

            {edit && formData.logo && typeof formData.logo === "string" && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Current logo:</p>
                    <img
                        src={formData.logo}
                        alt="Current logo"
                        className="h-16 w-16 rounded-full object-cover border border-gray-200"
                    />
                </div>
            )}
        </div>
    );
};

export default CreateLawFields;