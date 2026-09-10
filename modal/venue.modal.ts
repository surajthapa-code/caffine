import mongoose, { Schema } from "mongoose";

export interface VenueDocument {
	_id: number;
	capablity: number;
	name: string;
	building: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const VenueSchema = new Schema<VenueDocument>(
	{
		_id: { type: Number, required: true },
		capablity: { type: Number, required: true, min: 1 },
		name: { type: String, required: true, trim: true },
		building: { type: String, required: true, trim: true },
		isActive: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

const VenueModel =
	mongoose.models.Venue || mongoose.model<VenueDocument>("Venue", VenueSchema);

export default VenueModel;
