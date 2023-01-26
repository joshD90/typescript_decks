const getCards = async (
  setCards: React.Dispatch<React.SetStateAction<any>>,
  setError: React.Dispatch<React.SetStateAction<any>>,
  deckId: string
) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/decks/${deckId}/cards`);
    if (!response) throw Error("Could not find this deck by Id");
    const data = await response.json();
    console.log(data);
    setCards(data);
  } catch (error) {
    if (error instanceof Error) setError(error.message);
  }
};

export default getCards;
