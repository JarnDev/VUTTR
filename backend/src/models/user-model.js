const { model, Schema } = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        login: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: String
    }, {
    timestamps: true,
}
);

userSchema.pre('save', async function hashPassword(next) {
    try {
        const passwordHash = await bcrypt.hash(this.password, 7);
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
}
);

userSchema.methods.checkPassword = async function checkPassword(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};


module.exports = model('user', userSchema)

