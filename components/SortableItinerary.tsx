import { Location } from "@/lib/generated/prisma";
import { LocationMapsProps } from "./Maps";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { useId, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import updateItinerary from "@/lib/actions/update-itinerary";

interface SortableItineraryProps extends LocationMapsProps {
  tripId: string;
}

function SortableItem({ item }: { item: Location }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="p-4 border rounded-md flex justify-between items-center hover:shadow-md transition-shadow 
      cursor-grab active:cursor-grabbing"
    >
      <div className="w-full">
        <h2 className="font-semibold text-lg truncate">{item.name}</h2>
        <p className="text-sm text-muted-foreground mt-1 truncate max-w-md">
          {" "}
          <span>Latitute: {item.latitude}</span>,{" "}
          <span>Longitute: {item.longitude}</span>
        </p>
        <p className="text-md text-gray-600 mt-4 line-clamp-3">
          {item.description || "No description provided"}
        </p>
      </div>
      <div className="text-sm text-muted-foreground self-start shrink-0 hidden xl:block">
        Day {item.order}
      </div>
    </div>
  );
}

export default function SortableItinerary({
  locations,
  tripId,
}: SortableItineraryProps) {
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = locations.findIndex((loc) => loc.id === active.id);
      const newIndex = locations.findIndex((loc) => loc.id === over?.id);

      const newLocations = arrayMove(locations, oldIndex, newIndex).map(
        (item, i) => ({ ...item, order: i })
      );
      setLocalLocations(newLocations);

      await updateItinerary(
        tripId,
        newLocations.map((item) => item.id)
      );
    }
  };
  const id = useId();
  const [localLocations, setLocalLocations] = useState(locations);

  return (
    <DndContext
      id={id}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={localLocations.map((loc) => loc.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {localLocations.map((loc) => (
            <SortableItem key={loc.id} item={loc} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
