interface FakeDataFromAPI {
  name: string;
  description?: string;
  category?: string | null;
  members?: string[] | null;
  royalties?: number | null;
  comment: string | null;
}

export const useGetDataFromAPI = () => {
  // ...API call, async, etc

  const fakeDataFromAPI: FakeDataFromAPI = {
    name: "The name",
    category: "1",
    members: [],
    royalties: 2324,
    comment: null,
  };

  return { data: JSON.stringify(fakeDataFromAPI) };
};
