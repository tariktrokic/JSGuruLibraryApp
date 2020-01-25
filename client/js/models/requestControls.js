import axios from 'axios';

export default class RequestControls {
    static async handleRequest(requestId,rejectRequest){
        let result;
        try {
            if (!rejectRequest) {
                // CALL TO SERVER TO ADD BOOK TO USER / CREATE NOTIFICATION / DELETE REQUEST
                result = await axios.get(`/books/borrow/${requestId}`);
                return result;
            } else {
                // DELETE REQUEST
                result = await axios.delete(`/books/requests/${requestId}`);
                return result;
            };
        } catch(e) {
            return e.response;
        };
    };

    static async getRequests() {
        let requests = await axios.get('/books/requests');
        return requests
    };

    static async getRequestCount() {
        let requests = await axios.get('/books/countrequests');
        return requests;
    };
};

