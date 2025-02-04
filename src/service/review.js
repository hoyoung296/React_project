const getSearchList = async (id) => {
    if (id === null || id === undefined) {
        throw new Error("Invalid ID");
    }
    console.log("getSearchList => ",id)
    const res = await fetch("http://localhost:8080/root/review/search/" + id,{ 
        method: 'GET', // GET 메서드 사용
        mode: 'cors'  // CORS 모드 설정
        });
    return await res.json();
}

const getReviewList = async (id,start) => {
    const res = await fetch("http://localhost:8080/root/review/info?id="+id+"&start="+start,{ 
        method: 'GET', // GET 메서드 사용
        mode: 'cors'  // CORS 모드 설정
        });
    return await res.json()
}

export { getSearchList, getReviewList}