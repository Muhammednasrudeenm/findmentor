import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/gigs' });

export const fetchGigs = () => API.get('/');
export const createGig = (gig) => API.post('/', gig);
export const requestMentorship = (gigId, mentorId) => API.put(`/${gigId}/request`, { mentorId });

export default API;
