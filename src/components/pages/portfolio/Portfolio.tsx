"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Plus, Edit, Eye, Calendar, Trash2 } from "lucide-react";
import { Pagination } from "@/components/common/pagination";
import Headers from "../../Reusable/Headers";
import AddEventModal from "@/components/Reusable/modalFeilds/AddEventForm";
import EditEventModal from "@/components/Reusable/modalFeilds/EditEventForm";

const PAGE_SIZE = 6;

interface Event {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  content: string;
  attendees: number;
}

const EventCard = React.memo<{
  event: Event;
  onEdit: (event: Event) => void;
  onView: (event: Event) => void;
  onDelete: (id: number) => void;
}>(({ event, onEdit, onView, onDelete }) => (
  <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow overflow-hidden">
    <div className="relative h-48 overflow-hidden">
      <Image src={event.image} alt={event.title} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute top-4 left-4 flex gap-2">
        <button
          onClick={() => onEdit(event)}
          className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full shadow-lg"
          title="Edit Event"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onView(event)}
          className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-lg"
          title="View Event"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(event.id)}
          className="bg-red-500 hover:bg-red-600 p-2 rounded-full shadow-lg"
          title="Delete Event"
        >
          <Trash2 className="w-4 h-4 text-white" />
        </button>
      </div>
      <div className="absolute bottom-4 left-4 text-white text-sm font-medium">
        <span className="font-semibold">{event.attendees}</span> attendees
      </div>
    </div>

    <div className="p-5 space-y-3">
      <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{event.title}</h3>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Calendar className="w-4 h-4 text-yellow-500" />
        {event.subtitle}
      </div>
      <p className="text-sm text-gray-600 line-clamp-3">{event.content}</p>
    </div>
  </div>
));

EventCard.displayName = "EventCard";

const ManageEvents = () => {
  const [events, setEvents] = useState<Event[]>([
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
      content: "Explore career paths outside the traditional university route.",
      attendees: 89,
    },
    // add more dummy events if needed
  ]);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(PAGE_SIZE);

  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return events.slice(start, start + itemsPerPage);
  }, [events, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const openCreate = () => {
    setSelectedEvent(null);
    setModalMode("create");
  };

  const openEdit = (event: Event) => {
    setSelectedEvent(event);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedEvent(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <Headers
          title="Manage Events"
          subHeader="Create, edit, and monitor all upcoming events"
        />
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-xl font-semibold"
        >
          <Plus className="w-4 h-4" /> Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={openEdit}
            onView={() => { }}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No events found. Create your first event!
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={events.length}
            startIndex={(currentPage - 1) * itemsPerPage}
            endIndex={(currentPage - 1) * itemsPerPage + paginatedEvents.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={() => { }}
          />
        </div>
      )}

      {/* MODALS */}
      {modalMode === "create" && <AddEventModal open={true} setOpen={closeModal} />}
      {modalMode === "edit" && selectedEvent && (
        <EditEventModal open={true} setOpen={closeModal}  />
      )}
    </div>
  );
};

export default ManageEvents;
