const getEnglishText = async (): Promise<[string]> => {
  const response: Response = await fetch(
    'https://baconipsum.com/api/?type=meat&sentences=1',
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('HTTP error:' + response.status);
  }
};

export default getEnglishText;
