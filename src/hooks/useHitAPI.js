const useHITApi = () => { 
    const hitAPI = async (url) => {
        const newUrl = url.replace(/\s/g, '');
        let feedback;
        try {
            const header = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            };

            feedback = await fetch(newUrl, {
                method: 'GET',
                headers: header,
            });

            let response = await feedback.json(); 
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    return hitAPI;
};

export default useHITApi;
