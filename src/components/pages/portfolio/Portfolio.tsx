"use client";
import React, { useState, useMemo, useCallback } from "react";
import { Plus, Edit, Eye, Calendar, User } from "lucide-react";
import { Pagination } from "@/components/common/pagination";
import Headers from "../../Reusable/Headers";
import ReusableModal from "../../Reusable/ReusableModal";

const PAGE_SIZE = 6;

interface EventCardProps {
  event: any;
  onEdit: (event: any) => void;
  onView: (event: any) => void;
}

const EventCard = React.memo<EventCardProps>(({ event, onEdit, onView }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2">
          <button
            onClick={() => onEdit(event)}
            className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full shadow-lg"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onView(event)}
            className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-lg"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 text-white text-sm">
          <span className="font-semibold">{event.attendees}</span> attendees
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
          {event.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-yellow-500" />
          {event.subtitle}
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">
          {event.content}
        </p>
      </div>
    </div>
  );
});

const ManageEvents = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
      title: "Get Ready to Ask an Apprentice!",
      subtitle: "Tuesday, June 24 • 6:00 PM UTC",
      content:
        "Learn what apprenticeships really are, how they work, and why they're a powerful alternative.",
      attendees: 156,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
      title: "Careers Beyond University",
      subtitle: "Thursday, July 10 • 5:30 PM UTC",
      content:
        "Explore career paths outside the traditional university route.",
      attendees: 89,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      title: "Write a Standout Personal Statement",
      subtitle: "Monday, July 18 • 4:00 PM UTC",
      content:
        "Learn how to showcase your skills and experiences effectively.",
      attendees: 203,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
      title: "Apprenticeships vs University",
      subtitle: "Friday, July 25 • 6:30 PM UTC",
      content:
        "Breaking down myths and facts to help you decide your future.",
      attendees: 342,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      title: "Digital Skills Bootcamp",
      subtitle: "Wednesday, August 5 • 10:00 AM UTC",
      content:
        "Intensive digital training covering development and marketing.",
      attendees: 45,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
      title: "Industry Networking Mixer",
      subtitle: "Saturday, August 15 • 7:00 PM UTC",
      content:
        "Connect with industry leaders and fellow apprentices.",
      attendees: 120,
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(PAGE_SIZE);
  const [modalMode, setModalMode] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return events.slice(start, start + itemsPerPage);
  }, [events, currentPage, itemsPerPage]);

  const openCreate = () => setModalMode("create");

  const openEdit = useCallback((event) => {
    setSelectedEvent(event);
    setModalMode("edit");
  }, []);

  const openView = useCallback((event) => {
    setSelectedEvent(event);
    setModalMode("view");
  }, []);

  const closeModal = () => {
    setModalMode(null);
    setSelectedEvent(null);
  };

  const handleSave = useCallback((data) => {
    console.log("Saved:", data);
    closeModal();
  }, []);

  const totalItems = events.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <Headers
          title="Manage Portfolio"
          subHeader="Create, edit, and monitor all upcoming events"
        />
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#FFFF00] hover:bg-yellow-500 px-6 py-3 rounded-xl font-semibold"
        >
          <Plus className="w-4 h-4" /> Create Portfolio
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={openEdit}
            onView={openView}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          startIndex={startIndex}
          endIndex={endIndex}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(val) => {
            setItemsPerPage(val);
            setCurrentPage(1);
          }}
        />
      </div>

      {modalMode && (
        <ReusableModal
          isOpen
          onClose={closeModal}
          onSave={handleSave}
          location="portfolio"
          edit={modalMode === "edit"}
          view={modalMode === "view"}
          data={selectedEvent}
          title={
            modalMode === "view"
              ? "View Portfolio"
              : modalMode === "edit"
                ? "Edit Portfolio"
                : "Create Portfolio"
          }
          submitText={modalMode === "edit" ? "Update" : "Create"}
        />
      )}
    </div>
  );
};

export default ManageEvents;