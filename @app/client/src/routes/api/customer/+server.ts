import { json, error } from '@sveltejs/kit';
import API from '$lib/utils/Api';
import { isAxiosError } from 'axios';
import type { RequestHandler } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({params, cookies, body}) => {
console.log('🚀 ~ body:', body);

    console.log('checjk');
    const formData = body;
    console.log('🚀 ~ formData:', formData);

    try {
        const response = await API.put(`customer`, formData, cookies);

        console.log('🚀 ~ response:', response);
        if(response.status === 200){
            return json({
                status: response.status,
                body: json({
                    message: 'Event deleted successfully'
                }),
            });
        } else {
            return {
                status: response.status,
                body: json({
                    message: 'Failed to delete event',
                    error: response.message
                }),
            }
        }
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                return {
                    status: err.response.status,
                    headers: err.response.headers,
                    body: json({
                        message: err.response.data.message
                    }),
                }
            } else {
                return error('Internal Server Error');
            }
        } else {
            return error('Internal Server Error');
        }
    }
};
