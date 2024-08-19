const mongoose = require('mongoose');
const User = require('./models/UserModel'); // Đảm bảo đường dẫn đúng đến mô hình người dùng

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/toystore', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Tạo tài khoản người dùngnode
const createUser = async (username, email, password, role) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Email already exists. User not created.');
            return;
        }

        const newUser = new User({
            username,
            email,
            password, // Mật khẩu sẽ được hash tự động
            role,
        });

        await newUser.save();
        console.log('User created successfully:', newUser);
    } catch (error) {
        console.error('Error creating user:', error);
    } finally {
        // Đóng kết nối
        mongoose.connection.close();
    }
};

// Dữ liệu mẫu để tạo tài khoản
const sampleUsername = 'testuser';
const sampleEmail = 'testuser@example.com';
const samplePassword = '123456';
const sampleRole = 'user'; // Hoặc 'admin'

// Gọi hàm tạo tài khoản
createUser(sampleUsername, sampleEmail, samplePassword, sampleRole);