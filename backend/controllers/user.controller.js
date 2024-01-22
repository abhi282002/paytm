const signUp = async (req, res) => {
  const { fullName, lastName, password, username } = req.body;
  if (
    [fullName, lastName, password, username].some(
      (field) => field?.trim() === ""
    )
  ) {
    res.status(403).json({ message: "All fields are required" });
  }
};
