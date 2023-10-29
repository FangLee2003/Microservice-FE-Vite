import {bookApi} from "src/services/api/bookApi"

const useBookApi = () => {
    return bookApi.endpoints;
};

export default useBookApi;