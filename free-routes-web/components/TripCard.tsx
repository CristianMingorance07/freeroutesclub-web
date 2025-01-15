import { ITrip as Trip } from '@/models/Trip';

export default function TripCard({ trip }: { trip: Trip }) {
    return (
        <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white h-[420px] w-full flex flex-col">
            <img
                src={trip.imageUrl}
                alt={trip.title}
                className="w-full h-2/5 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col justify-between flex-grow p-4">
                <h2 className="text-xl font-bold text-[#08338F] mb-2">{trip.title}</h2>
                <p className="text-sm text-gray-600 flex-grow">{trip.description}</p>
                <div className="mt-4">
                    <p className="text-sm text-gray-700">
                        <strong>Duración:</strong> {trip.duration}
                    </p>
                    <p className="text-lg font-bold text-[#ED0874]">€{trip.price}</p>
                </div>
            </div>
        </div>
    );
}
