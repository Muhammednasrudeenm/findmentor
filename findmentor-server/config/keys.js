const keys = require('./config/keys');

// Connect to MongoDB
mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Use JWT secret for signing tokens
const token = jwt.sign({ id: user._id }, keys.JWT_SECRET);
