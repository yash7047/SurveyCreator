export async function getSurveys() {
  const response = await fetch("/api/surveys");
  return await response.json();
}

export async function storeSurvey(survey) {
  const response = await fetch("/api/surveys/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ survey: survey }),
  });

  return await response.json();
}

export async function storeResponse(response) {
  return await fetch("/api/surveys/postResponse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  });
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