'use client';

import React, { useState } from "react";
import Headers from "../../Reusable/Headers";
import {
    Building,
    ChevronRight,
    Edit,
    Eye,
    Plus,
    Trash2,
    MapPin,
    Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Swal from "sweetalert2";
import ReusableModal from "../../Reusable/ReusableModal";

const firmsData = [
    {
        id: 1,
        name: "Freshfields",
        tagline: "Elite International Firm",
        location: "London, Global",
        size: "2800+ Members",
        tags: ["Antitrust", "Tax", "M&A", "Corporate"],
        gradient: "from-blue-100 to-blue-100",
        featured: true,
    },
    {
        id: 2,
        name: "Broadfields Law",
        tagline: "Excellence in Corporate Law",
        location: "London, UK",
        size: "250+ Members",
        tags: ["Corporate Law", "M&A", "Tax"],
        gradient: "from-green-100 to-green-100",
        featured: false,
    },
    {
        id: 3,
        name: "Lexbridge Associates",
        tagline: "Trusted Legal Experts",
        location: "New York, USA",
        size: "120+ Members",
        tags: ["Litigation", "Tax", "Real Estate"],
        gradient: "from-yellow-100 to-yellow-100",
        featured: true,
    },
    {
        id: 4,
        name: "Silverstone Legal",
        tagline: "Leading Law Solutions",
        location: "Sydney, AU",
        size: "500+ Members",
        tags: ["Finance", "M&A", "Corporate"],
        gradient: "from-purple-100 to-purple-100",
        featured: false,
    },
];

const LawFirmCard = ({ firm, isSelected, onSelect, onViewProfile, onEdit }) => {
    const visibleTags = firm.tags.slice(0, 2);
    const extraCount = firm.tags.length - visibleTags.length;

    const handleCardClick = () => {
        onSelect(firm.id);
    };

    const handleViewProfileClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onViewProfile(firm);
    };

    return (
        <Card
            className={`rounded-3xl overflow-hidden border-2 transition-all duration-300 w-full max-w-full mx-auto hover:shadow-lg cursor-pointer ${isSelected
                ? 'border-yellow-400 shadow-lg'
                : 'border-gray-200 shadow-sm'
                }`}
            onClick={handleCardClick}
        >
            <div
                className={`bg-gradient-to-r ${firm.gradient} p-4 md:p-6 flex justify-center items-center relative h-24 md:h-32`}
            >
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center p-2 md:p-4 bg-opacity-90">
                    <div className="w-full h-full bg-green-300 rounded-xl flex items-center justify-center">
                        <Building size={60} className="text-gray-700" />
                    </div>
                </div>

                {firm.featured && (
                    <Badge
                        variant="warning"
                        className="absolute top-2 right-2 md:top-4 md:right-4 rounded-full font-medium text-xs md:text-sm border-0 bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
                    >
                        Featured
                    </Badge>
                )}
            </div>

            <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">{firm.name}</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">{firm.tagline}</p>

                <div className="mt-3 md:mt-4 flex flex-col gap-2">
                    <div className="flex items-center">
                        <MapPin className="text-gray-500 w-4 h-4 md:w-5 md:h-5" />
                        <span className="ml-2 text-xs md:text-sm text-gray-600">{firm.location}</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="text-gray-500 w-4 h-4 md:w-5 md:h-5" />
                        <span className="ml-2 text-xs md:text-sm text-gray-600">{firm.size}</span>
                    </div>
                </div>

                <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
                    {visibleTags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="rounded-full border-gray-300 text-gray-700 text-xs font-normal">
                            {tag}
                        </Badge>
                    ))}
                    {extraCount > 0 && (
                        <Badge variant="secondary" className="rounded-full border-gray-300 text-gray-700 text-xs font-normal">
                            +{extraCount} more
                        </Badge>
                    )}
                </div>

                <div className="flex items-center justify-between mt-8 gap-3">
                    <button
                        onClick={handleViewProfileClick}
                        className="flex items-center justify-center gap-2 flex-1 border border-gray-300 py-[7px] rounded-3xl text-gray-700 font-medium hover:bg-gray-100 transition-all text-sm"
                    >
                        <Eye size={16} className="text-gray-600" /> View
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(firm); }}
                        className="flex items-center justify-center gap-2 flex-1 border border-gray-300 py-[7px] rounded-3xl text-gray-700 font-medium hover:bg-gray-100 transition-all text-sm"
                    >
                        <Edit size={16} className="text-gray-600" /> Edit
                    </button>

                    <button
                        className="flex items-center justify-center border border-gray-200 rounded-full p-3 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 text-gray-500"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </Card>
    );
};

const ManageLawFirms = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFirms, setSelectedFirms] = useState(new Set());
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedFirm, setSelectedFirm] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const handelEdit = (value) => {
        setSelectedFirm(value);
        setIsEdit(true);
    };

    const handleSelectFirm = (firmId) => {
        setSelectedFirms(prev => {
            const newSelected = new Set(prev);
            if (newSelected.has(firmId)) {
                newSelected.delete(firmId);
            } else {
                newSelected.add(firmId);
            }
            return newSelected;
        });
    };

    const handleViewProfile = (firm) => {
        setSelectedFirm(firm);
        setIsViewModalOpen(true);
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedFirm(null);
    };

    const handleSave = (data) => {
        console.log("Saved data:", data);
        closeModal();
    };

    const handleApproveSelected = () => {
        if (selectedFirms.size === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No Selection',
                text: 'Please select at least one law firm to approve.',
            });
            return;
        }

        Swal.fire({
            title: 'Congratulations!',
            text: `Approved ${selectedFirms.size} law firm(s) successfully!`,
            icon: 'success',
            confirmButtonColor: '#ffff00',
            confirmButtonText: 'Continue',
            customClass: {
                confirmButton: 'text-gray-900 font-semibold'
            }
        }).then(() => {
            console.log("Approving firms:", Array.from(selectedFirms));
            setSelectedFirms(new Set());
        });
    };

    return (
        <div className="w-full flex flex-col gap-8 ">
            <div className="flex justify-between items-center">
                <Headers
                    title="Manage Law Firm Profiles"
                    subHeader="Approve or manage all law firm profiles"
                />
                <button
                    onClick={openModal}
                    className="flex gap-2 items-center bg-[#FFFF00] hover:bg-yellow-500 py-3 rounded-xl px-6 shadow-sm hover:shadow-md transition-all duration-300 font-semibold text-gray-900 hover:scale-105"
                >
                    <Plus className="w-4 h-4" />
                    Create New
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {firmsData.map((firm) => (
                    <LawFirmCard
                        key={firm.id}
                        firm={firm}
                        isSelected={selectedFirms.has(firm.id)}
                        onSelect={handleSelectFirm}
                        onViewProfile={handleViewProfile}
                        onEdit={handelEdit}
                    />
                ))}
            </div>

            {selectedFirms.size > 0 && (
                <div className="fixed bottom-10 right-10">
                    <Button
                        onClick={handleApproveSelected}
                        className="bg-[#FFFF00] text-black hover:bg-yellow-500 font-semibold shadow-lg px-6 py-6 rounded-full"
                    >
                        Approve Selected ({selectedFirms.size})
                    </Button>
                </div>
            )}

            <ReusableModal
                title="Create New Law Firm"
                isOpen={modalVisible}
                onClose={closeModal}
                onSave={handleSave}
                location={'manageSchool'}
            />
            <ReusableModal
                title="View Law Firm Profile"
                isOpen={isViewModalOpen}
                onClose={handleCloseViewModal}
                data={selectedFirm}
                view={true}
                location={'manageSchool'}
            />
            <ReusableModal
                title="Edit Law Firm Profile"
                isOpen={isEdit}
                onClose={() => setIsEdit(false)}
                data={selectedFirm}
                onSave={handleSave}
                edit={true}
                location={'manageSchool'}
            />
        </div>
    );
};

export default ManageLawFirms;