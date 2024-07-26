export async function getSurveys() {
  const response = await fetch("/api/surveys");
  return await response.json();
}

export async function storeSurvey(survey) {
  try {
    const response = await fetch("/api/surveys/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ survey: survey }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Network error:", error);
    throw error;
  }
}


export async function storeResponse(response) {
  try {
    const res = await fetch("/api/surveys/postResponse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`HTTP error! status: ${res.status} - ${errorData.error}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Network error:", error);
    throw error;
  }
}

export async function deleteSurveyById(id) {
  try {
    const response = await fetch(`/api/surveys/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete survey");
    }

    return await response.json(); // Return the response as JSON
  } catch (error) {
    console.error("Error:", error.message);
    throw error; // Rethrow the error for handling in the calling code
  }
}

// export async function getSurveyById(id) {
//   const response = await fetch("/api/surveys/getSurvey?id=" + id);
//   return await response.json();
// }

// export async function getSurveyIDs() {
//   const response = await fetch("/api/users/");
//   return await response.json();
// }

export async function getResults(id) {
  const response = await fetch("/api/surveys/generateResults?id=" + id);
  return await response.json();
}