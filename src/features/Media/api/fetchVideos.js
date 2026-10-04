import client from "../../../api/client";
export const fetchVideosPage = async() => {
    const response = await client.get(`/video-page`);
    return response.data;
};
export const fetchVideoCategory = async() => {
    const response = await client.get(`/video/category`);
    return response.data;
};
export const fetchVideos = async() => {
    const response = await client.get(`/videos`);
    return response.data;
};