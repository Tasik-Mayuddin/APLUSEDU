// FOR DEVELOPMENT
const parentToken = "Token b1bdeda32b6c9514b2b81623fb5362a7aab22646"
const tutorToken = "Token 2553ca17566263e55681ee82da318ee0eb71e51b"
const tutorTokenJohn = "Token 06c0896f0f30736f21862c880722b2bbe52df02d"
const currentToken = tutorToken

// function to fetch from API, GET
export const fetchAPI = async (endpoint) => {
    const res = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
        method: "GET",
        headers: {
            "Authorization": currentToken
        }
    })
    const data = await res.json()
    return(data)
}

// function to fetch from API, GET
export const fetchDeleteAPI = async (endpoint, toDel) => {
  const res = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
      method: "DELETE",
      headers: {
          'Content-type': 'application/json',
          "Authorization": currentToken
      },
      body: JSON.stringify(toDel)
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
          "Authorization": currentToken
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
          "Authorization": currentToken
        },
        body: JSON.stringify(toPost)
      })
    const data = await res.json()
    return data
}


