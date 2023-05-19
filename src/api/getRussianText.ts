export interface IRussianResponse {
  status: number;
  text: string;
}

const getRussianText = async (): Promise<IRussianResponse> => {
  const response: Response = await fetch(
    'https://fish-text.ru/get?type=sentence&number=1&format=json',
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('HTTP error:' + response.status);
  }
};

export default getRussianText;
