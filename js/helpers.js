async function getJson (url) {
  const response = await fetch(url, {
    credentials: 'same-origin'
  })
  const data = await response.json()
  return data
}

async function postJson (url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify(body)
  })
  const data = await response.json()
  return data
}
