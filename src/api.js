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

export { getNotes, addNote, deleteNote };
