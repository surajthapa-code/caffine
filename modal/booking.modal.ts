import mongoose, { Schema } from "mongoose";

export type BookingStatus =
	| "pending"
	| "approved"
	| "rejected"
	| "cancelled"
	| "completed";

export interface BookingDocument {
	_id: number;
	venue_id: number;
	user_id: mongoose.Types.ObjectId;
	starting_time: string;
	ending_time: string;
	date: Date;
	numberofstudent: number;
	status: BookingStatus;
	reason: string;
}

const BookingSchema = new Schema<BookingDocument>(
	{
		venue_id: { 
			type: Number,
			required: true,
			ref: "Venue",
		},
		user_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		starting_time: { type: String, required: true,  enum: [ "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]},
		ending_time: { type: String, required: true , enum: [ "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]},
		date: { type: Date, required: true },
		status: {
			type: String,
			enum: ["pending", "approved", "rejected", "cancelled", "completed"], // approved by admin, rejected by admin, cancelled by user, completed after the booking is done
			default: "pending", // pending by default, will be approved or rejected by admin
		},
		reason: { type: String, required: true, trim: true }, // reason for booking the venue, will be shown to admin while approving or rejecting the booking
	},
	{ timestamps: true }
);

const BookingModel =
	mongoose.models.Booking ||
	mongoose.model<BookingDocument>("Booking", BookingSchema);

export default BookingModel;
