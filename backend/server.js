import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 MALLBITE Server running on port ${PORT}`);
  console.log(`   - Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`   - Local URL:   http://localhost:${PORT}`);
});
