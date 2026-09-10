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
		_id: { type: Number, required: true },
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
		starting_time: { type: String, required: true },
		ending_time: { type: String, required: true },
		date: { type: Date, required: true },
		numberofstudent: { type: Number, required: true, min: 1 },
		status: {
			type: String,
			enum: ["pending", "approved", "rejected", "cancelled", "completed"],
			default: "pending",
		},
		reason: { type: String, required: true, trim: true },
	},
	{ timestamps: true }
);

const BookingModel =
	mongoose.models.Booking ||
	mongoose.model<BookingDocument>("Booking", BookingSchema);

export default BookingModel;
