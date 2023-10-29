import axios from 'axios';

const githubService = axios.create({
  baseURL: 'https://api.github.com',
});


githubService.defaults.headers.common['Authorization'] = `Bearer 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`;

export const searchUsers = async (query, pageNum) => {
  try {
    const response = await githubService.get(`/search/users?q=${query}+in:fullname&per_page=10&sort=followers&order=desc&page=${pageNum}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export async function fetchFollowersCount(username) {
    try {
      const response = await githubService.get(`/users/${username}`);
      return response.data.followers;
    } catch (error) {
      console.error(error);
      return 0; // Handle the case where the user has no followers or an error occurs
    }
  }

export default githubService;
