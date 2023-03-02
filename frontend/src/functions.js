// function to fetch from API, GET
export const fetchAPI = async (endpoint) => {
    const res = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
        method: "GET",
        headers: {
            "Authorization": "Token b1bdeda32b6c9514b2b81623fb5362a7aab22646"
        }
    })
    const data = await res.json()
    return(data)
}


// function to fetch API POST, posting toPost
export const fetchPostAPI = async(endpoint, toPost) => {
    console.log(JSON.stringify(toPost))
    const res = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
        method:'POST',
        headers: {
          'Content-type': 'application/json',
          "Authorization": "Token b1bdeda32b6c9514b2b81623fb5362a7aab22646"
        },
        body: JSON.stringify(toPost)
      })
    const data = await res.json()
    return data
}


// function to fetch API PUT, posting toPost
export const fetchPutAPI = async(endpoint, toPost) => {
    console.log(JSON.stringify(toPost))
    const res = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
        method:'PUT',
        headers: {
          'Content-type': 'application/json',
          "Authorization": "Token b1bdeda32b6c9514b2b81623fb5362a7aab22646"
        },
        body: JSON.stringify(toPost)
      })
    const data = await res.json()
    return data
}


