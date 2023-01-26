const getDecks = async (
  setDecks: React.Dispatch<React.SetStateAction<any>>,
  setError: React.Dispatch<React.SetStateAction<any>>,
  id?: string,
  searchTerm?: string
) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/decks/`);
    if (!response.ok) throw Error(response.statusText);
    const data = await response.json();
    //make sure that response is of type array before pluggin into set state
    if (Array.isArray(data)) {
      setDecks(data);
    }
  } catch (error) {
    //make sure that error is of type error so that will gaurantee that error.message is a string
    if (error instanceof Error) {
      console.log(error.message);
      setError(error.message);
    }
  }
};
//get a single deck by Id
export const getSingleDeck = async (
  id: string,
  setDeck: React.Dispatch<React.SetStateAction<any>>,
  setError: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/decks/${id}`
    );
    if (!response.ok) throw Error("There was no document by that id");
    const data = await response.json();
    console.log(data);

    setDeck(data);
  } catch (error) {
    if (error instanceof Error) setError(error.message);
  }
};

export default getDecks;
