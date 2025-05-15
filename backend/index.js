const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectToDb = require("./config/db");

const authRoutes = require('./routes/authRoutes')
const profileRoutes =require('./routes/profileRoutes')
const teamRoutes = require('./routes/teamRoutes')
const ticketRoutes = require('./routes/ticketRoutes')
const messageRoutes = require('./routes/messageRoutes')
const settingsRoutes = require('./routes/settingsRoutes')
const analyticsRoutes = require('./routes/analyticsRoutes')
const app = express();
const port = process.env.PORT || 8004;

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes)
app.use('/api/profile',profileRoutes)
app.use('/api/teams',teamRoutes)
app.use('/api/tickets',ticketRoutes)
app.use("/api/messages", messageRoutes)
app.use('/api/settings',settingsRoutes)
app.use('/api/analytics',analyticsRoutes)

//connect to db and start server
connectToDb();
// Add this just before app.listen()
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
}
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
