import { json, error } from '@sveltejs/kit';
import API from '$lib/utils/Api';
import { isAxiosError } from 'axios';
import type { RequestHandler } from '@sveltejs/kit';


export const PUT: RequestHandler = async ({cookies, request}): Promise<any> => {
    try {
        const body = await request.json();

        const response = await API.put(`customer`, body, cookies);

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
                    error: response.data.message
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
                return error(500);
            }
        } else {
            return error(500);
        }
    }
};
