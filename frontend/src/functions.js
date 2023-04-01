// GLOBAL CONST
// export const backendDir = 'http://127.0.0.1:8000'
export const backendDir = 'http://aplusedu-django-deploy.herokuapp.com/'

// // FOR DEVELOPMENT
// const parentToken = "Token b1bdeda32b6c9514b2b81623fb5362a7aab22646"
// const tutorToken = "Token 2553ca17566263e55681ee82da318ee0eb71e51b"
// const tutorTokenJohn = "Token 06c0896f0f30736f21862c880722b2bbe52df02d"
// const currentToken = parentToken
// // function to fetch from API, GET
// export const fetchAPI = async (endpoint) => {
//     const res = await fetch(`${backendDir}/api/${endpoint}`, {
//         method: "GET",
//         headers: {
//             "Authorization": currentToken
//         }
//     })
//     const data = await res.json()
//     return(data)
// }

// // function to fetch from API, DEL
// export const fetchDeleteAPI = async (endpoint, toDel) => {
//   const res = await fetch(`${backendDir}/api/${endpoint}`, {
//       method: "DELETE",
//       headers: {
//           'Content-type': 'application/json',
//           "Authorization": currentToken
//       },
//       body: JSON.stringify(toDel)
//   })
//   const data = await res.json()
//   return(data)
// }

// // function to fetch API POST, posting toPost
// export const fetchPostAPI = async(endpoint, toPost) => {
//     console.log(JSON.stringify(toPost))
//     const res = await fetch(`${backendDir}/api/${endpoint}`, {
//         method:'POST',
//         headers: {
//           'Content-type': 'application/json',
//           "Authorization": currentToken
//         },
//         body: JSON.stringify(toPost)
//       })
//     const data = await res.json()
//     return data
// }


// // function to fetch API PUT, posting toPost
// export const fetchPutAPI = async(endpoint, toPost, file_transfer=false) => {
//     console.log(JSON.stringify(toPost))
//     const res = await fetch(`${backendDir}/api/${endpoint}`, {
//         method:'PUT',
//         headers: file_transfer?
//         {
//           "Authorization": currentToken
//         }:
//         {
//           'Content-type': 'application/json',
//           "Authorization": currentToken
//         },
//         body: file_transfer?toPost:JSON.stringify(toPost)
//       })
//     const data = await res.json()
//     return data
// }



// PRODUCTION TEST

// function to fetch from API, GET
export const fetchAPI = async (endpoint) => {
  const res = await fetch(`${backendDir}/api/${endpoint}`, {
      method: "GET",
  })
  const data = await res.json()
  return(data)
}

// function to fetch from API, DEL
export const fetchDeleteAPI = async (endpoint, toDel) => {
  // Get the CSRF token from the cookie
  const csrftoken = getCookie('csrftoken');
  
  // Send the DELETE request with the CSRF token in the headers
  const res = await fetch(`${backendDir}/api/${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    body: JSON.stringify(toDel)
  });

  const data = await res.json();
  return data;
};

// function to fetch API POST, posting toPost
export const fetchPostAPI = async(endpoint, toPost) => {
  // Get the CSRF token from the cookie
  const csrftoken = getCookie('csrftoken');

  // Send the POST request with the CSRF token in the headers
  const res = await fetch(`${backendDir}/api/${endpoint}`, {
      method:'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(toPost)
    });

  const data = await res.json();
  return data;
};


// function to fetch API PUT, posting toPost
export const fetchPutAPI = async(endpoint, toPost, file_transfer=false) => {
  // Get the CSRF token from the cookie
  const csrftoken = getCookie('csrftoken');
  console.log(JSON.stringify(toPost))
  const res = await fetch(`${backendDir}/api/${endpoint}`, {
      method:'PUT',
      headers: file_transfer?
      {
        'X-CSRFToken': csrftoken
      }:
      {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: file_transfer?toPost:JSON.stringify(toPost)
    })
  const data = await res.json()
  return data
}

// Function to get the value of a cookie by name
export const getCookie = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
};







// Change time format
export const formatTime = (time) => {
  let hours = parseInt(time.split(':')[0])
  let minutes = parseInt(time.split(':')[1])
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  let formattedTime = hours + ':' + minutes + ' ' + ampm;
  return formattedTime;
}

// Make an arbituary Date() with Day and Time
export const getDateFromDayAndTime = (day, time) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeekIndex = daysOfWeek.indexOf(day);
  if (dayOfWeekIndex < 0) {
    throw new Error('Invalid day of week: ' + day);
  }
  const date = new Date();
  const daysUntilNextDayOfWeek = (dayOfWeekIndex + 7 - date.getDay()) % 7;
  const timeParts = time.split(':');
  // date.setDate(date.getDate() + daysUntilNextDayOfWeek -7);
  dayOfWeekIndex < date.getDay() ? date.setDate(date.getDate() + daysUntilNextDayOfWeek - 7) : date.setDate(date.getDate() + daysUntilNextDayOfWeek)
  date.setHours(Number(timeParts[0]));
  date.setMinutes(Number(timeParts[1]));
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}