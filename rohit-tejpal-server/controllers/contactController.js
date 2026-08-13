import ContactMessage from "../models/ContactMessage.js";

// @desc    Submit a new contact message
// @route   POST /api/contact
// @access  Public
export const submitMessage = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const newMessage = await ContactMessage.create({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message submitted successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error submitting message:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
export const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Mark a message as read/unread or delete it
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const message = await ContactMessage.findById(req.params.id);

    if (message) {
      message.status = status || message.status;
      const updatedMessage = await message.save();
      res.json(updatedMessage);
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete a message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (message) {
      res.json({ message: "Message removed" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
