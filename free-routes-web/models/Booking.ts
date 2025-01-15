import mongoose, { Schema, Document } from 'mongoose';

interface ICustomer {
    name: string;
    email: string;
    phone: string;
}

interface ICompanion {
    name: string;
    email?: string;
}

interface IPayment {
    amountPaid: number;
    isFullPayment: boolean;
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
}

export interface IBooking extends Document {
    tripId: string; // ID del viaje relacionado
    customer: ICustomer; // Información del cliente principal
    companions: ICompanion[]; // Lista de acompañantes
    numCompanions: number; // Número total de acompañantes
    payment: IPayment; // Detalles de pago
    status: 'Active' | 'Cancelled' | 'Completed'; // Estado de la reserva
    notes?: string; // Notas adicionales del cliente
    createdAt: Date;
    updatedAt: Date;
}

const CustomerSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
});

const CompanionSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
});

const PaymentSchema: Schema = new Schema({
    amountPaid: { type: Number, required: true },
    isFullPayment: { type: Boolean, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], required: true },
});

const BookingSchema: Schema = new Schema(
    {
        tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
        customer: { type: CustomerSchema, required: true },
        companions: { type: [CompanionSchema], default: [] },
        numCompanions: { type: Number, required: true, default: 0 },
        payment: { type: PaymentSchema, required: true },
        status: { type: String, enum: ['Active', 'Cancelled', 'Completed'], default: 'Active' },
        notes: { type: String },
    },
    { timestamps: true }
);

const Booking = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
