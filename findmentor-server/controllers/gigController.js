const Gig = require('../models/Gig'); // Import your Gig model

// Create a new gig
const createGig = async (req, res) => {
  const { title, description, qualification, availableTime, modeOfCommunication, mentorshipDuration } = req.body;

  // Check if all required fields are received
  if (!title || !description || !qualification || !availableTime || !modeOfCommunication || !mentorshipDuration) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create the new Gig with the values from the request
  const newGig = new Gig({
    title,  // Use the values from req.body
    description,
    qualification,
    availableTime,
    modeOfCommunication,
    mentorshipDuration,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    // Log the full error with details
    console.error("Error creating gig:", err.message, err.stack); 
    res.status(500).json({ message: 'Error creating gig', error: err.message });
  }
};

// Get all gigs
const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find();
    res.status(200).json(gigs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching gigs', error: err });
  }
};

// Update gig request
const updateGigRequest = async (req, res) => {
  const gigId = req.params.id;
  const mentorId = req.body.mentorId;

  try {
    // Assuming you want to add a mentor request to the gig
    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    // Add logic to handle the request
    // For example, you might want to push the mentorId into an array of requests
    gig.requests.push(mentorId);
    await gig.save();

    res.status(200).json({ message: 'Request sent successfully', gig });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const SendRequest = async (req, res) => {
  const { mentorId, mentorName } = req.body;
  const gigId = req.params.id; // Ensure you're accessing the correct parameter

  try {
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    
    gig.requests.push({ mentorId, mentorName }); // Add request details
    await gig.save();
    
    res.status(200).json({ message: 'Request sent successfully' });
  } catch (err) {
    console.error(err); // Log error details
    res.status(500).json({ message: 'Error sending request', error: err.message });
  }
};



module.exports = {
  createGig,
  getAllGigs,
  updateGigRequest,
  SendRequest
};
