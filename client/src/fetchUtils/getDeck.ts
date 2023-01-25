const getDecks = async (
  setDecks: React.Dispatch<React.SetStateAction<any>>,
  setError: React.Dispatch<React.SetStateAction<any>>,
  id?: string,
  searchTerm?: string
) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}`);
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

export default getDecks;
