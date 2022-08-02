// export const baseUrl = process.env.REACT_APP_BACKEND_URL;
// if (!baseUrl) throw new Error('baseUrl not found');

export const baseUrl = 'http://localhost:3001';

export async function myFetch(url, method = 'GET', body = null) {
  // console.log('url ===', url);
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    options.method = method === 'POST' ? 'POST' : 'GET';
    options.body = body ? JSON.stringify(body) : null;

    const resp = await fetch(url, options);
    // console.log('resp ===', resp);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('MyFetch error ===', error);
  }
}

export async function myFetchAuth(url, token, method = 'GET', body = null) {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    // options.method = method === 'POST' ? 'POST' : 'GET';
    // options.method = method === 'PATCH' ? 'PATCH' : 'GET';
    // options.method = method === 'DELETE' ? 'DELETE' : 'GET';

    options.method =
      method === 'POST'
        ? 'POST'
        : method === 'PATCH'
        ? 'PATCH'
        : method === 'DELETE'
        ? 'DELETE'
        : 'GET';

    options.body = body ? JSON.stringify(body) : null;

    const resp = await fetch(url, options);
    // console.log('resp ===', resp);
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('MyFetchAuth error ===', error);
  }
}

export async function getQuestions(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    // console.log('data', data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
