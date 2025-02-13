import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Subscription Name is required"],
			trim: true,
			minLength: 2,
			maxLength: 50,
		},
		price: {
			type: Number,
			required: [true, "Subscription Price is required"],
			min: [0, "Price must be greater than 0"],
			//max: 1000000,
		},
		currency: {
			type: String,
			enum: ["USD", "EUR", "GBP", "GHS"],
			default: "USD",
			required: [true, "Subscription Currency is required"],
			/*trim: true,
            minLength: 3,
            maxLength: 3,*/
		},
		frequency: {
			type: String,
			enum: ["daily", "weekly", "monthly", "yearly"],
			default: "monthly",
			/*required: [true, "Subscription Frequency is required"],
            trim: true,
            minLength: 3,
            maxLength: 7,*/
		},
		category: {
			type: String,
			enum: [
				"business",
				"entertainment",
				"fitness",
				"food",
				"health",
				"sports",
				"technology",
				"travel",
				"other",
			],
			//default: "other",
			required: true,
			/*trim: true,
            minLength: 3,
            maxLength: 20,*/
		},
		paymentMethod: {
			type: String,
			//enum: ["cash", "credit card", "mobile money", "paypal", "other"],
			//default: "other",
			required: true,
			trim: true,
			/*minLength: 3,
            maxLength: 20,*/
		},
		status: {
			type: String,
			enum: ["active", "inactive", "canceled", "expired"],
			default: "active",
			/*required: [true, "Subscription Status is required"],
            trim: true,
            minLength: 3,
            maxLength: 8,*/
		},
		startDate: {
			type: Date,
			required: true,
			validate: {
				validator: (value) => value <= new Date(),
				message: "Start Date must be in the past",
			},
		},
		renewalDate: {
			type: Date,
			required: true,
            validate: {
                validator: function (value) {
                    return value > this.startDate;
            },
            message: "Renewal Date must be after Start Date",
			},
			
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
		/*endDate: {
            type: Date,
            required: [true, "Subscription End Date is required"],
        },
        email: {
            type: String,
            required: [true, "Subscription Email is required"],
            trim: true,
            unique: true,
            lowercase: true,
            match: [/.+@.+\..+/, "Please fill a valid email address"],
        },*/
	},
	{ timestamps: true }
);
//? Auto-generate the renewal date based on the frequency
subscriptionSchema.pre("save", function (next) {
	if (!this.renewalDate) {
		const renewalPeriod = {
			daily: 1,
			weekly: 7,
			monthly: 30,
			yearly: 365,
		};
		this.renewalDate = new Date(this.startDate);
		this.renewalDate.setDate(
			this.renewalDate.getDate() + renewalPeriod[this.frequency]
		);
	}
	//? Auto-update the status if the renewal date is in the past
	if (this.renewalDate < new Date()) {
		this.status = "expired";
	}
	next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
