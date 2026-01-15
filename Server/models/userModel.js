import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            require: true,
        },
        lastname: {
            type: String,
        },
        email: {
            type: String,
            require: true,
            unqiue: true,
        },
        password: {
            type: String,
            require: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    { timestamps: true },
);

// Pre hashed the password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    return this.password = await bcrypt.hash(this.password, salt);
})

// compare EnteredPassword with hashedPassword of Db to Login User
userSchema.methods.matchPassword = async function (newPassword) {
   return await bcrypt.compare(newPassword, this.password)
}

const User = mongoose.model('User', userSchema);
export default User;
