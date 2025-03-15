import axios from 'axios';
import { useEffect } from 'react';
import { JOB_API_END_POINT } from '../utile/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJob } from '../redux/jobSlice';

const useGetAlljobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery}=useSelector(store=>store.jobs)

    useEffect(() => {
        const fetchAllJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJob(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllJob();
    }, [dispatch,searchedQuery]); 
};

export default useGetAlljobs;
