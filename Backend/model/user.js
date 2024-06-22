import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

//runs before saving a user document to the database because it is necessary
userSchema.pre("save", async function (next) {
  const user = this; // Reference to the current user document

  //Hashthe password only if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the plain password using the generated salt
    const hashedPassword = await bcrypt.hash(user.password, salt);

    //Override the palin password with hashed one
    user.password = hashedPassword;

    next(); // Continue with the save operation
  } catch (err) {
    return next(err); // Handle any errors during the hashing process
  }
});

// Method to compare a provided password with the stored hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    //use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model("User", userSchema);

export default User;
