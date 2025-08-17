export const getUsers = async (req, res) => {
	try {
		const users = await User.find({}).populate("shifts");
		res.status(200).json({ success: true, data: users });
	} catch (error) {
		console.log("error in fetching users:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createUsers = async (req, res) => {
	const { name, email, password, isAdmin, shifts, availability, daysOff } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ success: false, message: "Please provide name, email, and password" });
	}

	const newUser = new User({
		name,
		email,
		password,
		isAdmin: isAdmin || false,
		shifts: shifts || [],
		availability: availability || {},
		daysOff: daysOff || [],
	});

	try {
		await newUser.save();
		res.status(201).json({ success: true, data: newUser });
	} catch (error) {
		console.error("Error in Create user:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// Update a user
export const updateUsers = async (req, res) => {
	const { id } = req.params;
	const { name, email, password, isAdmin, shifts, availability, daysOff } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid User Id" });
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				name,
				email,
				password,
				isAdmin,
				shifts,
				availability,
				daysOff,
			},
			{ new: true }
		);
		res.status(200).json({ success: true, data: updatedUser });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// Delete a user
export const deleteUsers = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid User Id" });
	}

	try {
		await User.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "User deleted" });
	} catch (error) {
		console.log("error in deleting user:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};