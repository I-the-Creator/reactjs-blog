import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    // cancel the request if we unmount the component
                    // and set the 'cancelToken' with 'request'
                    cancelToken: source.token
                });
                // set the data
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }

            } catch (error) {

                console.log(error.message);
                if (isMounted) {
                    setFetchError(error.message);
                    setData([]);
                    
                }
            } finally {
                /* // testing
                isMounted && setTimeout(() => setIsLoading(false), 2000) */
                isMounted && setIsLoading(false);
            }
        }

        fetchData(dataUrl);

        const cleanUp = () => {
            // console.log('Clean up function');
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl]);

    return { data, fetchError, isLoading };
}

export default useAxiosFetch;