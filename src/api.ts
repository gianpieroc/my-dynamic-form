export const fetchItems = async () => {
  try {
    const response = await fetch("http://localhost:3000/data.json", {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    const questionsResponse = await response.json();
    return questionsResponse;
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    }
    console.error(message);
  }
};
