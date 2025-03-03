import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
	const { email, password, name } = req.body;

	try {
		if (!email || !password || !name) {
			throw new Error("All fields are required");
		}

		const userAlreadyExists = await User.findOne({ email });
		console.log("userAlreadyExists", userAlreadyExists);

		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		const user = new User({
			email,
			password: hashedPassword,
			name,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
		});

		await user.save();

		// jwt
		generateTokenAndSetCookie(res, user._id);

	//	await sendVerificationEmail(user.email, verificationToken);

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};


export const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ success: false, message: "User not found"});
        }

		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if(!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid Password"});
		}
        generateTokenAndSetCookie(res, user._id);
        
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in Successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch(error){
        console.log("Error in Login ", error);
        res.status(500).json({ success: false, message: error.message});
    }
};

export const logout = async(req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully"});
};