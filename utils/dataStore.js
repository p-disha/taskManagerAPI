// Simple in-memory store (module-scoped). Swap with DB for persistence.
exports.tasks = []; // each task: { id, title, description, completed, priority, createdAt, updatedAt }