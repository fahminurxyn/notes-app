const baseUrl = "https://notes-api.dicoding.dev/v2";

const getNotes = async () => {
  try {
    const response = await fetch(`${baseUrl}/notes`);
    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message || "Gagal Mengambil data catatan");
    }

    return responseJson.data;
  } catch (error) {
    console.error("Error saat mengambil catatan: ", error.message);
    throw error;
  }
};

const getArchivedNotes = async () => {
  try {
    const response = await fetch(`${baseUrl}/notes/archived`);
    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message || "Gagal mengambil catatan arsip");
    }

    return responseJson.data;
  } catch (error) {
    console.error("Error saat mengambil catatan arsip:", error.message);
    throw error;
  }
};


const addNote = async ({ title, body }) => {
  try {
    const response = await fetch(`${baseUrl}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });
    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message || "Gagal menambahkan catatan");
    }

    return responseJson.data;
  } catch (error) {
    console.error("Error saat membuat catatan: ", error.message);
    throw error;
  }
};

const deleteNote = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/notes/${id}`, {
      method: "DELETE",
    });
    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message || "Gagal menghapus catatan");
    }

    return responseJson.message;
  } catch (error) {
    console.error("Error saat menghapus catatan:", error.message);
    throw error;
  }
};

const archiveNote = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/notes/${id}/archive`, {
      method: "POST",
    });
    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message || "Gagal mengarsipkan catatan");
    }

    return responseJson.message;
  } catch (error) {
    console.error("Error saat mengarsipkan catatan:", error.message);
    throw error;
  }
};

const unarchiveNote = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/notes/${id}/unarchive`, {
      method: "POST",
    });
    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message || "Gagal mengembalikan catatan");
    }

    return responseJson.message;
  } catch (error) {
    console.error("Error saat mengembalikan catatan:", error.message);
    throw error;
  }
};

export { getNotes, getArchivedNotes, addNote, deleteNote, archiveNote, unarchiveNote };
