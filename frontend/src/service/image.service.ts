import apiService from "./unsplashSetup";

export interface Image {
  id: number;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  color: string | null;
  user: {
    username: string;
    first_name: string;
    last_name: string;
    profile_image: { small: string; medium: string; large: string };
  };
  likes: number;
  alt_description: string;
}

const fetchImages = async (query: string): Promise<Image[]> => {
  const response = await apiService.get("/search/photos", {
    params: {
      query,
      per_page: 28,
    },
  });

  return response.data.results;
};

export default fetchImages;
