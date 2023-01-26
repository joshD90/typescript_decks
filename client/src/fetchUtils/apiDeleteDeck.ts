import { DecksResponse } from "../components/Home";

const apiDeleteDeck = async (
  deck: DecksResponse,
  setDecks: React.Dispatch<React.SetStateAction<any>>,
  setError: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/decks/${deck._id}`,
      {
        method: "DELETE",
      }
    );
    //optimistic updating - delete without fetching again assuming all went well
    setDecks((prev: DecksResponse[]) =>
      prev.filter((item) => item._id !== deck._id)
    );
    return response;
  } catch (error) {
    if (error instanceof Error) setError(error.message);
  }
};

export default apiDeleteDeck;
