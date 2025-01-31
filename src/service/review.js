const getSearchList = async (id) => {
    const res = await fetch("http://localhost:8080/project/review/search/"+id)
    return await res.json()
}

const getReviewList = async (id,start) => {
    const res = await fetch("http://localhost:8080/project/review/info?id="+id+"&start="+start)
    return await res.json()
}

export { getSearchList, getReviewList}